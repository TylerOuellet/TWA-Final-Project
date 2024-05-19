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
def pie_charts(year, *iso_codes):
    fig, axs = plt.subplots(2, 2, figsize=(10, 10))
    
    file_name = "second_graph.png"
    
    axs = axs.flatten()

    explode = [.03, .03, .03, .03]
    
    for ax, iso_code in zip(axs, iso_codes):
        country_info = collection.find_one({"iso_code": iso_code}, {"country": 1, "_id": 0})
        
        if not country_info:
            print(f"No country found for ISO code {iso_code}.")
            continue
        
        country_name = country_info["country"]

        query = {"iso_code": iso_code, "year": year}
        projection = {
            "hydro_consumption": 1,
            "solar_consumption": 1,
            "biofuel_consumption": 1,
            "wind_consumption": 1,
            "_id": 0
        }
        cursor = collection.find_one(query, projection)
        
        if cursor:
            data = list(cursor.values())

            if any(pd.isna(data)):
                print(f"Some consumption data is missing for {country_name} ({iso_code})")
                continue
            
            ax.pie(data, autopct='%1.1f%%', explode=explode)
            ax.set_title(f"{country_name}")
        else:
            print(f"No data for {country_name} ({iso_code})")
    
    # If fewer than 4 countries, hide the remaining subplots
    if len(iso_codes) < 4:
        for j in range(len(iso_codes), 4):
            axs[j].axis('off')

    # Adding a legend
    legend_labels = ["Biofuel", "Hydro", "Solar", "Wind"]
    fig.legend(legend_labels, title="Energy Types", loc="upper right")
    
    fig.suptitle(f"Sustainable Energy Consumption Distribution by Country ({year})", fontsize=15)
    plt.tight_layout()
    plt.savefig(f"./output/{file_name}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python script.py year iso_code1 [iso_code2 ...]")
        sys.exit(1)

    year = int(sys.argv[1])
    iso_codes = sys.argv[2:]
    pie_charts(year, *iso_codes)
