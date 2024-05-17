import pandas as pd
import matplotlib.pyplot as plt
import sys
from pymongo import MongoClient
from matplotlib.cm import get_cmap

# MongoDB connection setup
cluster_uri = "mongodb+srv://tylerouellet93:YmataxFAcXo3GqlW@cluster0.9xoenc5.mongodb.net/"
client = MongoClient(cluster_uri)
db = client['project']
collection = db['test']

def get_country_name(iso_code):
    country_info = collection.find_one({"iso_code": iso_code}, {"country": 1, "_id": 0})
    return country_info["country"] if country_info else iso_code

def generate_bar_graph(choice):
    query = {"year": {"$gte": 2011, "$lte": 2020}}
    projection = {"iso_code": 1, choice: 1, "_id": 0, "year": 1}
    cursor = collection.find(query, projection)
    
    file_name = "third_graph.png"

    df = pd.DataFrame(list(cursor))

    df = df[df['year'] >= 2011]

    top_countries = df.groupby('year').apply(lambda x: x.nlargest(5, choice)).reset_index(drop=True)

    canada_data = df[df['iso_code'] == 'CAN']
    top_countries = pd.concat([top_countries, canada_data], ignore_index=True)

    plt.figure(figsize=(12, 6))

    cmap = get_cmap('tab10')
    colors = [cmap(i) for i in range(len(top_countries['iso_code'].unique()))]

    for i, iso_code in enumerate(top_countries['iso_code'].unique()):
        country_name = get_country_name(iso_code)
        country_data = top_countries[top_countries['iso_code'] == iso_code]
        plt.bar(country_data['year'] + i * 0.1, country_data[choice], width=0.1, color=colors[i], label=country_name)

    plt.title(f'Top 5 Countries + Canada - {choice} (2011-2020)')
    plt.xlabel('Year')
    plt.ylabel(choice)
    plt.grid()
    plt.xticks(range(2011, 2021))
    plt.legend(loc='upper left', bbox_to_anchor=(.01,1.01))
    plt.tight_layout()
    plt.savefig(f"../server/output/{file_name}")

if len(sys.argv) != 2:
    print("Usage: python script.py <choice>")
    sys.exit(1)

choice = sys.argv[1]

# Validate choice
if choice not in ['greenhouse_gas_emissions', 'population', 'gdp']:
    print("Invalid choice")
    sys.exit(1)

generate_bar_graph(choice)
