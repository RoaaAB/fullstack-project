import os
import time
from pathlib import Path
import pandas as pd
import google.generativeai as genai

# Configure the API
genai.configure(api_key="AIzaSyDundOTfXdfNfa2rbH6Wy-FKFsfa-TQpo4")

# Initialize the model
flash = genai.GenerativeModel(
    "gemini-1.5-flash",
    system_instruction=(
        "You are a helper that generates detailed descriptions about tools"
        " that assist researchers. Your output will be embedded for similarity search."
        " Explain everything comprehensively, and do not leave out any information."
        " Generate a descriptive title for each tool."
        " Do not use markdown to format your output."
    ),
)

# Load the Excel file
df = pd.read_excel("slrdatafinal.xlsx", sheet_name="Sheet1")
pd.set_option("display.max_rows", None)

# List of relevant columns
columns = [
    "Stage",
    "ToolName",
    "Description",
    "Reference",
    "functions",
    "Pros",
    "Cons",
    "ease of use",
    "performance",
    "cost",
    "integration",
    "compatibility",
    "scalability",
    "Ai Powered Tool",
]

# Handle missing values
df.fillna("N/A", inplace=True)

# Ensure output directory exists
output_dir = Path("data")
output_dir.mkdir(exist_ok=True)

# Process each row in the DataFrame
for i, row in df.iterrows():
    # Combine data into a single text block
    text = "\n".join(f"{col}:\n{row[col]}" for col in columns if col in df.columns)

    # Create a safe file name
    tool_name = row["ToolName"]
    safe_filename = "".join(c for c in tool_name if c.isalnum() or c in " .-_").strip()
    file_path = output_dir / f"{i}. {safe_filename}.txt"

    # Skip already existing files
    if file_path.exists():
        print(f"File {file_path} already exists. Skipping...")
        continue

    # Truncate text to avoid exceeding token limits
    max_tokens = 2000  # Adjust based on the model's token limit
    truncated_text = text[:max_tokens]

    try:
        # Generate response using the API
        response = flash.generate_content(
            f"Here is detailed information about the tool:\n{truncated_text}"
        )

        # Save the response to a text file
        with open(file_path, "w", encoding="utf-8") as file:
            file.write(response.text)
            print(f"File {file_path} written successfully.")
    except Exception as e:
        print(f"Error processing row {i} ({tool_name}): {e}")
        continue

    # Wait to respect API rate limits
    time.sleep(10)
