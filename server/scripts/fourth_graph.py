# imports
import pandas as pd
import matplotlib.pyplot as plt
import sys
from pymongo import MongoClient

cluster_uri = "mongodb+srv://tylerouellet93:YmataxFAcXo3GqlW@cluster0.9xoenc5.mongodb.net/"
client = MongoClient(cluster_uri)
db = client['project']
collection = db['data']

def compare_oil_consumption(country1, country2, year):
    query = {"year": year, "country": {"$in": [country1, country2]}}
    
    projection = {
        "country": 1,
        "oil_production": 1,
    }
    
    file_name = "fourth_graph.png"
    
    cursor = collection.find(query, projection)

    df = pd.DataFrame(list(cursor))
    
    plt.figure(figsize=(10, 6))
    plt.bar(df['country'], df['oil_production'], color=['blue', 'green'])
    plt.title(f'Comparison of Oil Production between {country1} and {country2} in {year}')
    plt.xlabel('Country')
    plt.ylabel('Oil Production')
    plt.grid(True)
    plt.tight_layout()
    # plt.show()
    plt.savefig(f"../server/output/{file_name}")

if len(sys.argv) != 4:
    print("python script.py <year> <country1> <country2>")
    sys.exit(1)

country1 = sys.argv[1]
country2 = sys.argv[2]
year = int(sys.argv[3])

compare_oil_consumption(country1, country2, year)