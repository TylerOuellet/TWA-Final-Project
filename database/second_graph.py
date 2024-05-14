import pandas as pd
import matplotlib.pyplot as plt
import sys
from pymongo import MongoClient

# mongodb connection setup
cluster_uri = "mongodb+srv://tylerouellet93:YmataxFAcXo3GqlW@cluster0.9xoenc5.mongodb.net/"
client = MongoClient("mongodb://localhost:27017")
db = client['project']
collection = db['data']

def pie_charts(year, *countries):
    fig, axs = plt.subplots(2, 2, figsize=(10, 10))
    
    file_name = "second_graph.png"
    
    axs = axs.flatten()

    explode = [.03, .03, .03, .03]
    
    for ax, country in zip(axs.flatten(), countries):
        
        query = {"country": country, "year": year}
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
            # print(f"Data for {country}: {data}")
            ax.pie(data, autopct='%1.1f%%', explode=explode)
            ax.set_title(f"{country}")
        else:
            print(f"no data for {country}")
    if len(countries) < 4:
        for j in range(1, 4):
            axs[j].axis('off')
    if cursor:
        legend_labels = ["Biofuel", "Hydro", "Solar", "Wind"]
        fig.legend(legend_labels, title="Energy Types", loc="upper right")
        
    fig.suptitle(f"Sustainable Energy Consumption Distribution by Country ({year})", fontsize=15,)
    plt.tight_layout()
    # plt.show()
    plt.savefig(f"../server/output/{file_name}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("python script.py year country1 country2")
        sys.exit(1)

    year = int(sys.argv[1])
    countries = sys.argv[2:]
    pie_charts(year, *countries)