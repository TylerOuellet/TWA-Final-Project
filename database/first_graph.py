import pandas as pd
import matplotlib.pyplot as plt
import sys
from pymongo import MongoClient
import os
from dotenv import load_dotenv
# MongoDB connection setup
load_dotenv()
cluster_uri = os.getenv("DB_CONNECTION")

try:
    client = MongoClient(cluster_uri)
    db = client['project']
    collection = db['test']
except ConnectionError as err:
    #Error given to server
    print(f"Error connecting to MongoDB: {err}", file=sys.stderr)
    sys.exit(1)

def graph_according_to_iso_code(iso_code):
    country_info = collection.find_one({"iso_code": iso_code}, {"country": 1, "_id": 0})

    if not country_info:
        print(f"No country found for ISO code {iso_code}.")
        return
    country_name = country_info["country"]

    query = {"iso_code": iso_code}
    
    projection = {
        "year": 1,
        "oil_consumption": 1,
        "gas_consumption": 1,
        "coal_consumption": 1,
        "_id": 0
    }
    
    cursor = collection.find(query, projection)

    df = pd.DataFrame(list(cursor))

    if df.empty:
        print(f"No data found for {iso_code}.")
        return

    if df[['oil_consumption', 'gas_consumption', 'coal_consumption']].isna().any().any():
        print(f"Some consumption data is missing for {iso_code}.")
        
    plt.figure(figsize=(10, 6))
    plt.plot(df['year'], df['oil_consumption'], label='Oil', linestyle='-', color='orange')
    plt.plot(df['year'], df['gas_consumption'], label='Gas', linestyle='-', color='green')
    plt.plot(df['year'], df['coal_consumption'], label='Coal', linestyle='-', color='blue')
    plt.title(f'Fossil Fuel Consumption for {country_name}')
    plt.xlabel('Year')
    plt.ylabel('Primary Energy Consumption (terawatt-hours)')
    plt.grid(True)
    plt.legend()
    plt.tight_layout()
    plt.show()
    #plt.savefig(f"../server/output/first_graph.png")

if len(sys.argv) < 2:
    print("Usage: python script.py <iso_code>")
    sys.exit(1)

iso_code = sys.argv[1]
graph_according_to_iso_code(iso_code)
