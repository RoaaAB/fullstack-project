from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import json
import base64
from io import BytesIO
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import logging
import numpy as np
import google.generativeai as genai
import sqlite3
import os
from pathlib import Path
import pandas as pd
from textwrap import dedent
from dotenv import load_dotenv  # Import to load environment variables from .env file

# Load environment variables from .env file
load_dotenv()

# Configure logging
logging.basicConfig(filename="api.log", level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

# Configure Google Generative AI API
try:
    api_key = os.getenv("GOOGLE_API_KEY")  # Read API key from environment variable
    if not api_key:
        raise ValueError("GOOGLE_API_KEY environment variable is not set.")
    genai.configure(api_key=api_key)
except Exception as e:
    logging.error(f"Error configuring the API: {e}")
    print("Failed to configure the API. Check the logs for more details.")
    exit(1)

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all routes, allowing requests from http://localhost:3000
CORS(app, origins=os.getenv("FRONTEND_URL", "fullstack-project-drab.vercel.app"))

# Directory for data files
directory = "./data"

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
        # Generate embedding for the query
        query_embedding = genai.embed_content(
            model="models/embedding-001", content=query, task_type="retrieval_query"
        )

        # Compute dot products
        dot_products = np.dot(
            np.stack(dataframe["embedding"]), query_embedding["embedding"]
        )

        # Sort and get top_n passages
        top_indices = np.argsort(dot_products)[::-1][:top_n]

        # Return the top passages and their similarity scores
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
        # Combine relevant passages into a single message
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
    Generate a comparison chart for tools and return it as a base64-encoded image.
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

        # Adjust layout to prevent overlap
        plt.tight_layout()

        # Save the plot to a BytesIO object
        buf = BytesIO()
        fig.savefig(buf, format='png', bbox_inches='tight')
        buf.seek(0)

        # Convert to base64 string
        img_base64 = base64.b64encode(buf.read()).decode('utf-8')
        plt.close(fig)  # Close the figure to free memory

        return img_base64

    except Exception as e:
        logging.error(f"Error generating comparison chart: {e}")
        return None

@app.route("/get_recommendations", methods=["POST"])
def get_recommendations():
    """
    Handle the recommendation request and return results along with a comparison chart.
    """
    try:
        # Get the user query from the request
        data = request.get_json()
        if not data or "query" not in data:
            return jsonify({"error": "Missing 'query' in request body"}), 400

        query = data.get("query", "")
        top_n_results = data.get("top_n", 3)

        # Log the request
        logging.info(f"Received request for query: {query}")

        # Create DataFrame
        df = create_df()
        if df.empty:
            logging.error("No valid data found in DataFrame.")
            return jsonify({"error": "No valid data found"}), 400

        # Find the best passages
        best_passages_df, similarity_scores = find_best_passages(query, df, top_n=top_n_results)
        if best_passages_df is None or best_passages_df.empty:
            logging.error("No relevant passages found for the query.")
            return jsonify({"error": "No relevant passages found"}), 400

        # Extract the relevant passages
        best_passages = best_passages_df["text"].tolist()

        # Generate a prompt for the model
        prompt = make_prompt(query, best_passages)
        if not prompt:
            logging.error("Failed to generate prompt.")
            return jsonify({"error": "Failed to generate prompt"}), 400

        # Extract tool names and ratings dynamically
        tool_names = extract_tool_names(best_passages)
        tools = extract_tool_ratings(best_passages)

        # Generate the tool comparison chart image
        comparison_img = plot_tool_comparison(tools, tool_names)
        if not comparison_img:
            logging.error("Failed to generate comparison chart.")
            return jsonify({"error": "Failed to generate comparison chart"}), 500

        # Return the results along with the comparison image and feedback functionality
        return jsonify({
            "prompt": prompt,
            "best_passages": best_passages,
            "comparison_image": comparison_img,
            "feedback_message": "Please provide your feedback."
        })

    except Exception as e:
        logging.error(f"Error in get_recommendations: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/collect_feedback", methods=["POST"])
def collect_user_feedback():
    """
    Handle user feedback submission and save it to the database.
    """
    try:
        data = request.get_json()
        if not data or "rating" not in data:
            return jsonify({"error": "Missing 'rating' in request body"}), 400

        rating = data.get("rating")
        comments = data.get("comments", "")

        if not isinstance(rating, int) or rating < 1 or rating > 5:
            return jsonify({"error": "Invalid rating. Please provide a rating between 1 and 5."}), 400

        # Log the feedback
        logging.info(f"Received feedback - Rating: {rating}, Comments: {comments}")

        # Save feedback to database
        conn = sqlite3.connect('user_feedback.db')
        cursor = conn.cursor()

        cursor.execute('''
            INSERT INTO feedback (rating, comments) 
            VALUES (?, ?)
        ''', (rating, comments))

        conn.commit()
        conn.close()

        return jsonify({"message": "Feedback collected successfully."}), 200

    except Exception as e:
        logging.error(f"Error in collect_user_feedback: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    # Create feedback database and table
    create_feedback_db()

    # Start the Flask app with Render's assigned port
    app.run(
        debug=os.getenv("DEBUG", "False").lower() == "true", 
        port=int(os.getenv("PORT", 8000)),  # You can keep this for local, but Render will override it
        host="0.0.0.0",  # Ensure your app is accessible outside of localhost
        threaded=True
    )
