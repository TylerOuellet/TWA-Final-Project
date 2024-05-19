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
    collection = db['data']
except ConnectionError as err:
    #Error given to server
    print(f"Error connecting to MongoDB: {err}", file=sys.stderr)
    sys.exit(1)
def compare_oil_consumption(iso_code1, iso_code2, year):
    # Retrieve the country names using the ISO codes
    country_info1 = collection.find_one({"iso_code": iso_code1}, {"country": 1, "_id": 0})
    country_info2 = collection.find_one({"iso_code": iso_code2}, {"country": 1, "_id": 0})

    if not country_info1 or not country_info2:
        print(f"No country found for ISO code {iso_code1 if not country_info1 else iso_code2}.")
        return

    country_name1 = country_info1["country"]
    country_name2 = country_info2["country"]

    query = {"year": year, "iso_code": {"$in": [iso_code1, iso_code2]}}
    
    projection = {
        "iso_code": 1,
        "oil_production": 1,
        "_id": 0
    }
    
    cursor = collection.find(query, projection)
    df = pd.DataFrame(list(cursor))

    if df.empty or 'oil_production' not in df.columns or df['oil_production'].isnull().any():
        print(f"Some or all oil production data is missing for {country_name1} or {country_name2} in {year}.")
        return
    file_name = "fourth_graph"
    plt.figure(figsize=(10, 6))
    plt.bar(df['iso_code'], df['oil_production'], color=['blue', 'green'])
    plt.title(f'Comparison of Oil Production between {country_name1} and {country_name2} in {year}')
    plt.xlabel('Country')
    plt.ylabel('Oil Production')
    plt.grid(True)
    plt.tight_layout()
    plt.savefig(f"./output/{file_name}")

if len(sys.argv) != 4:
    print("Usage: python script.py <iso_code1> <iso_code2> <year>")
    sys.exit(1)

iso_code1 = sys.argv[1]
iso_code2 = sys.argv[2]
year = int(sys.argv[3])

compare_oil_consumption(iso_code1, iso_code2, year)
