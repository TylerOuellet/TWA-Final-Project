# imports
import pandas as pd
import matplotlib.pyplot as plt
import sys
from pymongo import MongoClient

# mongodb connection setup
cluster_uri = "mongodb+srv://tylerouellet93:YmataxFAcXo3GqlW@cluster0.9xoenc5.mongodb.net/"
client = MongoClient("mongodb://localhost:27017")
db = client['project']
collection = db['data']

def graph_according_to_country(country):
    query = {"country": country}
    
    projection = {
        "year": 1,
        "oil_consumption": 1,
        "gas_consumption": 1,
        "coal_consumption": 1,
        # "_id": 0
    }
    
    cursor = collection.find(query, projection)

    df = pd.DataFrame(list(cursor))
    
    file_name = "first_graph.png"

    plt.figure(figsize=(10, 6))
    plt.plot(df['year'], df['oil_consumption'], label='Oil', linestyle='-', color='orange')
    plt.plot(df['year'], df['gas_consumption'], label='Gas', linestyle='-', color='green')
    plt.plot(df['year'], df['coal_consumption'], label='Coal', linestyle='-', color='blue')
    plt.title(f'Fossil Fuel Consumption in {country}')
    plt.xlabel('Year')
    plt.ylabel('Primary Energy Consumption (terawatt-hours)')
    plt.grid(True)
    plt.legend()
    plt.tight_layout()
    # plt.show()
    plt.savefig(f"../server/output/{file_name}")

# checking for arg error
if len(sys.argv) != 2:
    print("Usage: python script.py <country>")
    sys.exit(1)

country = sys.argv[1]
graph_according_to_country(country)