import os
import re

# Configuration
EXCLUDE_PATTERNS = [
    r"\.pyc$",  # Exclude Python bytecode files
    r"__pycache__",  # Exclude Python cache directories 
    r"\.git",  # Exclude Git directory
    r"\.txt$",  # Exclude text files
    "gen_prompt.py",  # Replace with the name of this script
    "README.md",
    "./apikey.txt"
]

# Function to generate a Markdown link for a file
def create_markdown_link(filepath, filename):
    relative_path = filepath.replace("\\", "/")  # Normalize path separators
    return f"[{filename}]({relative_path})"

# Function to process a single file
def process_file(filepath):
    with open(filepath, "r") as f:
        content = f.read()
        if "api" in filepath: 
            return ''
    return f"### {filepath}\n`\n{content}\n`\n"

# Main function
def generate_markdown():
    markdown_content = "# Project Sitemap\n\n"

    for root, dirs, files in os.walk("."):
        # Skip excluded directories and files
        dirs[:] = [d for d in dirs if not any(re.match(p, d) for p in EXCLUDE_PATTERNS)]
        files[:] = [f for f in files if not any(re.match(p, f) for p in EXCLUDE_PATTERNS)]

        if files:
            markdown_content += f"## {root}\n\n"
            for filename in files:
                filepath = os.path.join(root, filename)
                markdown_content += create_markdown_link(filepath, filename) + "\n"
                markdown_content += process_file(filepath)
    #Check if the file exists
    if os.path.exists("code_documentation.md"):
        os.remove("code_documentation.md")

    with open("code_documentation.md", "w") as f:
        f.write(markdown_content)

if __name__ == "__main__":
    generate_markdown()
