import pandas as pd
import matplotlib.pyplot as plt
import sys
from pymongo import MongoClient
from matplotlib.cm import get_cmap
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

def get_country_name(iso_code):
    country_info = collection.find_one({"iso_code": iso_code}, {"country": 1, "_id": 0})
    return country_info["country"] if country_info else iso_code

def fetch_data(choice):
    query = {"year": {"$gte": 2011, "$lte": 2020}}
    projection = {"iso_code": 1, choice: 1, "_id": 0, "year": 1}
    return list(collection.find(query, projection))

def prepare_data(cursor, choice):
    df = pd.DataFrame(cursor)
    df = df[df['year'] >= 2011]

    df_excluding_canada_germany = df[(df['iso_code'] != 'CAN') & (df['iso_code'] != 'DEU')]
    canada_data = df[df['iso_code'] == 'CAN']

    result = []
    for year in range(2011, 2021):
        yearly_data = df_excluding_canada_germany[df_excluding_canada_germany['year'] == year]
        top_yearly_countries = yearly_data.nlargest(5, choice)
        
        canada_yearly_data = canada_data[canada_data['year'] == year]
        if not canada_yearly_data.empty:
            top_yearly_countries = pd.concat([top_yearly_countries, canada_yearly_data])
        
        result.append(top_yearly_countries)

    return pd.concat(result)

def plot_data(final_df, choice):
    plt.figure(figsize=(12, 6))

    cmap = get_cmap('tab10')
    unique_iso_codes = final_df['iso_code'].unique()
    colors = {iso_code: cmap(i) for i, iso_code in enumerate(unique_iso_codes)}

    for i, iso_code in enumerate(unique_iso_codes):
        country_name = get_country_name(iso_code)
        country_data = final_df[final_df['iso_code'] == iso_code]
        plt.bar(country_data['year'] + i * 0.1, country_data[choice], width=0.1, color=colors[iso_code], label=country_name)

    plt.title(f'Top 5 Countries + Canada - {choice} (2011-2020)')
    plt.xlabel('Year')
    plt.ylabel(choice)
    plt.grid()
    plt.xticks(range(2011, 2021))
    plt.legend(loc='upper left', bbox_to_anchor=(.01,1.01))
    plt.tight_layout()
    plt.show()

def main(choice):
    cursor = fetch_data(choice)
    final_df = prepare_data(cursor, choice)
    plot_data(final_df, choice)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python script.py <choice>")
        sys.exit(1)

    choice = sys.argv[1]

    # validate choice
    if choice not in ['greenhouse_gas_emissions', 'population', 'gdp']:
        print("Invalid choice")
        sys.exit(1)

    main(choice)
