// pdfHandler.js

import { appState } from './state.js';

let canvas, ctx;

export const initializePdfLib = () => {
  if (pdfjsLib && pdfjsLib.getDocument) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js';
  }
  
  // Initialize canvas
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  document.getElementById('pdfContent').appendChild(canvas);
};

export const loadPdf = () => {
  const fileInput = document.getElementById('pdfUploader');
  const file = fileInput.files[0];
  if (file && file.type === "application/pdf") {
    const fileReader = new FileReader();
    fileReader.onload = handleFileLoad;
    fileReader.readAsArrayBuffer(file);
  } else {
    alert("Please select a valid PDF file before loading.");
  }
};

const handleFileLoad = async (event) => {
  const typedarray = new Uint8Array(event.target.result);
  try {
    const loadedPdfDoc = await pdfjsLib.getDocument({ data: typedarray }).promise;
    initializePdfDoc(loadedPdfDoc);
  } catch (error) {
    console.error('Error loading PDF:', error);
    alert('Failed to load PDF. Please try again.');
  }
};

const initializePdfDoc = async (pdfDoc) => {
  appState.setState({ pdfDoc });
  updatePageInfo(1);
  resetGlobalPdfText();
  try {
    const extractedText = await extractTextFromAllPages(pdfDoc);
    updateGlobalPdfText(extractedText);
    await renderPage(1); // Start with the first page
  } catch (error) {
    console.error('Error initializing PDF:', error);
    alert('Failed to initialize PDF. Please try again.');
  }
};

export const updatePageInfo = (num) => {
  const { pdfDoc } = appState.getState();
  document.getElementById('pageInfo').textContent = `Page ${num} of ${pdfDoc.numPages}`;
};

const resetGlobalPdfText = () => {
  appState.setState({ globalPdfText: "" });
};

const updateGlobalPdfText = (text) => {
  appState.setState({ globalPdfText: text });
};

export const renderPage = async (num) => {
  const { pdfDoc } = appState.getState();
  if (!pdfDoc) return;

  appState.setState({ pageRendering: true, pageNum: num });

  try {
    const page = await pdfDoc.getPage(num);
    const containerWidth = document.getElementById('pdfContent').clientWidth;
    const originalViewport = page.getViewport({ scale: 1 });
    
    // Calculate scale to fit the page width to the container
    const scale = containerWidth / originalViewport.width;
    const viewport = page.getViewport({ scale });

    // Set canvas dimensions to match the scaled viewport
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Ensure the canvas doesn't exceed the container width
    canvas.style.width = '100%';
    canvas.style.height = 'auto';

    const renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };

    await page.render(renderContext).promise;
    appState.setState({ pageRendering: false });

    // Handle pending page
    const { pageNumPending } = appState.getState();
    if (pageNumPending !== null) {
      renderPage(pageNumPending);
      appState.setState({ pageNumPending: null });
    }
  } catch (error) {
    console.error('Error rendering page:', error);
    appState.setState({ pageRendering: false });
  }

  updatePageInfo(num);
};

export const extractTextFromAllPages = async (pdf) => {
  const pagePromises = Array.from(
    { length: pdf.numPages },
    (_, i) => pdf.getPage(i + 1)
      .then(page => page.getTextContent())
      .then(content => content.items.map(item => item.str).join(' '))
  );

  try {
    const pageTexts = await Promise.all(pagePromises);
    return pageTexts.join('\n\n');
  } catch (error) {
    console.error('Error extracting text from PDF:', error);
    throw error;
  }
};

export const goToPrevPage = () => {
  const { pageNum } = appState.getState();
  if (pageNum <= 1) return;
  renderPage(pageNum - 1);
};

export const goToNextPage = () => {
  const { pdfDoc, pageNum } = appState.getState();
  if (pageNum >= pdfDoc.numPages) return;
  renderPage(pageNum + 1);
};