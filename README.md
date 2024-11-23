# Food Recommendation System

This **Food Recommendation System** generates personalized food recommendations by analyzing co-preferences for dishes. It creates a food network graph where dishes are nodes, and edges represent connections based on shared user preferences.

## Features

- **Food Network Graph**: Builds a graph where nodes represent food items, and edges represent co-preferences derived from input data.
- **Interactive Recommendations**: Provides suggestions based on the dish entered by the user.
- **Customizable Data**: Easily integrates new user preference data or menu updates.

## How It Works

1. **Graph Construction (main.js)**:
   - Reads user preference data from `input_data.csv`.
   - Maps dish names to unique IDs using `dhaba_menu.json`.
   - Creates a weighted network graph (`network_graph.csv`) where edges represent the strength of co-preferences.

2. **Interactive Recommendation (recommend.js)**:
   - Loads the generated graph and menu data.
   - Accepts a dish name from the user.
   - Finds and suggests the most connected dish based on shared preferences.

## File Structure

food-recommendation-system/ ├── inputs/ │ ├── input_data.csv # User preference data (CSV format) │ ├── dhaba_menu.json # Menu data with dish names and IDs ├── outputs/ │ ├── network_graph.csv # Generated graph (edges with weights) ├── main.js # Graph construction script ├── recommend.js # Interactive recommendation system ├── README.md # Project documentation


## Setup and Usage

### Prerequisites

Ensure you have Node.js installed on your system.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/netviral/food_recommendation.git
   cd food_recommendation
2. Install the required dependencies:
    npm install prompt-sync csv-parser chalk
Running the Application
Step 1: Generate the Food Network Graph
Add your input files:

Place user preference data in inputs/input_data.csv.
Update the menu in inputs/dhaba_menu.json (format: { "dish_name": { "id": <unique_id>, "item": <full_name> } }).
Run the graph construction script:

bash
Copy code
node main.js
This generates outputs/network_graph.csv.
Step 2: Interactive Recommendations
Start the recommendation system:

bash
Copy code
node recommend.js
Follow the interactive prompts:

Enter the name of a dish to get a recommendation.
Type exit to quit.
Input File Formats
input_data.csv
A CSV file where each row represents a user's food preferences:

csv
Copy code
S.No,Dish 1,Dish 2,Dish 3,...
1,Pizza,Burger,Pasta
2,Biryani,Curry,Naan
dhaba_menu.json
A JSON file mapping dish names to unique IDs and their full names:

json
Copy code
{
  "pizza": { "id": 1, "item": "Pizza" },
  "burger": { "id": 2, "item": "Burger" },
  "pasta": { "id": 3, "item": "Pasta" }
}
network_graph.csv
Generated CSV file containing the edges and weights:

csv
Copy code
source,target,weight
1,2,5
2,3,3
Future Enhancements
Real-Time Updates: Integrate with a live database for dynamic menu and user data.
Advanced Algorithms: Incorporate machine learning to improve recommendation accuracy.
Visualizations: Build a graphical interface to visualize the food network.
