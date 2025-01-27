import json
import os
from pathlib import Path
import logging
import google.generativeai as genai
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from textwrap import dedent
import sqlite3

# إعداد تسجيل الأخطاء
logging.basicConfig(filename="error.log", level=logging.ERROR, format="%(asctime)s - %(levelname)s - %(message)s")

# تكوين API
try:
    genai.configure(api_key="AIzaSyDundOTfXdfNfa2rbH6Wy-FKFsfa-TQpo4")
except Exception as e:
    logging.error(f"Error configuring the API: {e}")
    print("Failed to configure the API. Check the logs for more details.")
    exit(1)

directory = "./data"


def create_df():
    """
    Create a DataFrame from the data directory and embeddings.
    """
    items = []

    try:
        with os.scandir(directory) as entries:
            for entry in entries:
                filename = os.path.basename(entry.path)
                filename = os.path.splitext(filename)[0]
                path = Path("embeddings", f"{filename}.json")

                # Check if embedding file exists
                if not os.path.exists(path):
                    logging.error(f"Embedding file {path} does not exist.")
                    continue

                try:
                    with open(entry.path, "r", encoding="utf-8") as content_file:
                        title = content_file.readline().strip()  # Read the title
                        content_file.seek(0)
                        text = content_file.read()

                    with open(path, "r") as embedding_file:
                        embedding = json.loads(embedding_file.read())
                        if "embedding" not in embedding:
                            logging.error(f"Invalid embedding in {path}, 'embedding' key is missing.")
                            continue

                        items.append(
                            {
                                "title": title,
                                "text": text.strip(),
                                "embedding": embedding["embedding"],
                            }
                        )
                except Exception as e:
                    logging.error(f"Error processing file {entry.path}: {e}")
                    continue

        # If no items were processed, log it and return an empty DataFrame
        if not items:
            logging.error("No valid items found during DataFrame creation.")
            return pd.DataFrame()

        df = pd.DataFrame(items)
        df.columns = ["title", "text", "embedding"]
        return df

    except Exception as e:
        logging.error(f"Error creating the DataFrame: {e}")
        print("Failed to create the DataFrame. Check the logs for more details.")
        return pd.DataFrame()


def find_best_passages(query, dataframe, top_n=3):
    """
    Compute the distances between the query and each document in the dataframe
    using the dot product, and return the top_n passages with the highest similarity.
    """
    try:
        # حساب التضمين للاستعلام
        query_embedding = genai.embed_content(
            model="models/embedding-001", content=query, task_type="retrieval_query"
        )

        # حساب حاصل الضرب النقطي لكل نص مع الاستعلام
        dot_products = np.dot(
            np.stack(dataframe["embedding"]), query_embedding["embedding"]
        )

        # Sort and get top_n passages
        top_indices = np.argsort(dot_products)[::-1][:top_n]

        # إعادة النصوص ذات التشابه الأعلى
        return dataframe.iloc[top_indices], dot_products[top_indices]
    except Exception as e:
        logging.error(f"Error finding the best passages: {e}")
        print("Failed to find the best passages. Check the logs for more details.")
        return None, None


def make_prompt(query, relevant_passages):
    """
    Create a prompt to query the generative AI model.
    """
    try:
        # دمج النصوص ذات الصلة في رسالة واحدة
        escaped = "\n".join(relevant_passages).replace("'", "").replace('"', "").replace("\n", " ")
        prompt = dedent(
            f"""
            You are a recommender system that helps researchers find tools
            for the following user query and search results. Provide the three most relevant results based on the search.
            
            Query: '{query}'
            SEARCH RESULTS: 
            1. {relevant_passages[0]}
            2. {relevant_passages[1]}
            3. {relevant_passages[2]}
            
            Answer:
            """
        )
        return prompt
    except Exception as e:
        logging.error(f"Error creating the prompt: {e}")
        print("Failed to create the prompt. Check the logs for more details.")
        return None


def extract_tool_ratings(best_passages):
    """
    Extract tool ratings dynamically from the best passages.
    For simplicity, this function assigns random ratings. Adjust to parse actual data.
    """
    tools = {}
    for i, passage in enumerate(best_passages):
        # Extract tool name and ratings (example: replace with actual parsing logic)
        tool_name = f"Tool {i+1}"  # Replace with actual tool names if available
        ratings = {
            "ease_of_use": np.random.randint(1, 6),  # Replace with extracted values
            "scalability": np.random.randint(1, 6),  # Replace with extracted values
            "performance": np.random.randint(1, 6),  # Replace with extracted values
        }
        tools[tool_name] = ratings
    return tools


def extract_tool_names(best_passages):
    """
    Extract tool names from the best passages dynamically.
    Assuming the tool names are mentioned in the passage text.
    """
    tool_names = []
    for passage in best_passages:
        # Assume the tool name is mentioned at the beginning of the passage (e.g., the first word or sentence).
        # Adjust this logic as needed.
        tool_name = passage.split()[0]  # This assumes the first word is the tool name. Adjust accordingly.
        tool_names.append(tool_name)
    return tool_names


def plot_tool_comparison(tools, tool_names):
    """
    Create a bar chart for each tool comparing Ease of Use, Scalability, and Performance.
    Also, add explanations for each rating (1-5) in a text box below the chart.
    """
    try:
        # Create subplots (one for each tool)
        num_tools = len(tools)
        fig, axes = plt.subplots(num_tools, 1, figsize=(10, 6 * num_tools))

        if num_tools == 1:
            axes = [axes]  # Make axes iterable for a single tool

        # Define the categories for comparison (without 'Cost')
        categories = ["Ease of Use", "Scalability", "Performance"]
        colors = ['skyblue', 'lightgreen', 'lightcoral']  # Different color for each category

        # Iterate through each tool and plot its comparison
        for ax, (tool_name, ratings), tool_actual_name in zip(axes, tools.items(), tool_names):
            # Values for the categories
            values = [ratings["ease_of_use"], ratings["scalability"], ratings["performance"]]

            ax.barh(categories, values, color=colors)
            ax.set_xlim(0, 5)  # Rating scale from 0 to 5
            ax.set_title(f'{tool_actual_name} Comparison', fontsize=14)  # Use actual tool name
            ax.set_xlabel('Rating (0-5)', fontsize=12)
            ax.set_ylabel('Category', fontsize=12)

            # Annotate with rating values on top of each bar
            for i, v in enumerate(values):
                ax.text(v + 0.1, i, str(v), va='center', fontsize=12)

            # Add a text box with explanation for ratings (1-5)
            rating_explanation = (
                "\nRating scale:\n"
                "1 - Poor\n"
                "2 - Fair\n"
                "3 - Good\n"
                "4 - Very Good\n"
                "5 - Excellent"
            )
            ax.text(1.05, 0.5, rating_explanation, transform=ax.transAxes, fontsize=10,
                    verticalalignment='center', horizontalalignment='left', bbox=dict(facecolor='white', alpha=0.7))

        plt.tight_layout()
        plt.show()

    except Exception as e:
        logging.error(f"Error generating tool comparison charts: {e}")
        print("Failed to generate tool comparison charts. Check the logs for more details.")


def create_feedback_db():
    """
    Create a SQLite database and table to store user feedback.
    """
    try:
        conn = sqlite3.connect('user_feedback.db')
        cursor = conn.cursor()

        cursor.execute('''
            CREATE TABLE IF NOT EXISTS feedback (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                rating INTEGER NOT NULL,
                comments TEXT
            )
        ''')

        conn.commit()
        conn.close()

    except Exception as e:
        logging.error(f"Error creating database or table: {e}")
        print("Failed to create the database or table. Check the logs for more details.")


def collect_feedback():
    """
    Collect feedback from the user and save it to the database.
    """
    try:
        print("Please rate the relevance and usefulness of the recommended tool(s) based on your query:")

        # Display rating options
        print("⭐ (1) - Poor")
        print("⭐⭐ (2) - Fair")
        print("⭐⭐⭐ (3) - Good")
        print("⭐⭐⭐⭐ (4) - Very Good")
        print("⭐⭐⭐⭐⭐ (5) - Excellent")

        # Get feedback input from the user
        rating = input("Enter a number between 1 and 5: ")
        while not rating.isdigit() or int(rating) < 1 or int(rating) > 5:
            print("Invalid input. Please enter a number between 1 and 5.")
            rating = input("Enter a number between 1 and 5: ")

        rating = int(rating)

        # Collect additional comments if any
        comments = input("Do you have any additional comments or suggestions? (Optional): ")

        # Save feedback to database
        conn = sqlite3.connect('user_feedback.db')
        cursor = conn.cursor()

        cursor.execute('''
            INSERT INTO feedback (rating, comments) 
            VALUES (?, ?)
        ''', (rating, comments))

        conn.commit()
        conn.close()

        print("Thank you for your feedback!")

    except Exception as e:
        logging.error(f"Error collecting feedback: {e}")
        print("Failed to collect feedback. Check the logs for more details.")


if __name__ == "__main__":
    # Create feedback database table
    create_feedback_db()

    query = "give me the best data analysis tool"
    top_n_results = 3  # Number of results to retrieve

    # Create DataFrame
    df = create_df()
    if df.empty:
        print("DataFrame is empty. Exiting...")
        exit(1)

    # Find the best passages
    best_passages_df, similarity_scores = find_best_passages(query, df, top_n=top_n_results)
    if best_passages_df is None or best_passages_df.empty:
        print("No passages found. Exiting...")
        exit(1)

    # Extract the relevant passages
    best_passages = best_passages_df["text"].tolist()

    # Generate a prompt for the model
    prompt = make_prompt(query, best_passages)
    if prompt:
        try:
            model = genai.GenerativeModel("gemini-1.5-pro-latest")
            answer = model.generate_content(prompt)
            if answer and hasattr(answer, "text"):
                print("Generated Answer:")
                print(answer.text)  # Display the textual answer
            else:
                print("No valid response received from the model.")
        except Exception as e:
            logging.error(f"Error generating content: {e}")
            print("Failed to generate content. Check the logs for more details.")

    # Extract tool names from passages
    tool_names = extract_tool_names(best_passages)

    # Extract tool ratings dynamically from the best passages
    tools = extract_tool_ratings(best_passages)

    # Generate the visual comparison chart for tools
    plot_tool_comparison(tools, tool_names)

    # Collect user feedback
    collect_feedback()