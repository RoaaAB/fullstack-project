import json
import os
from pathlib import Path
import google.generativeai as genai

# Configure the API key for Google Generative AI
genai.configure(api_key="AIzaSyDundOTfXdfNfa2rbH6Wy-FKFsfa-TQpo4")

# Define the directory containing the text files
directory = "./data"

# Iterate through all files in the directory
with os.scandir(directory) as entries:
    for entry in entries:
        # Extract the filename without extension
        filename = os.path.basename(entry.path)
        filename = os.path.splitext(filename)[0]
        
        # Define the path where embeddings will be saved
        path = Path("embeddings", f"{filename}.json")
        
        # Skip if embeddings file already exists
        if os.path.exists(path):
            continue
        
        # Open the text file and read its contents
        with open(entry.path, "r", encoding="utf-8") as content_file:
            # Read the title (first line)
            title = content_file.readline().strip()  # Strip any extra newline/space characters
            
            # Read the remaining content of the file
            content_file.seek(0)
            text = content_file.read()

            # Generate embeddings for the file content
            embedding = genai.embed_content(
                model="models/embedding-001",
                content=text,
                task_type="retrieval_document",
                title=title,
            )

            # Save the embeddings to a JSON file
            with open(path, "w") as embedding_file:
                embedding_file.write(json.dumps(embedding))

        print(f"{path} done.")
