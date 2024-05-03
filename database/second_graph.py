# imports
import pandas as pd
import matplotlib.pyplot as plt
import sys
from pymongo import MongoClient

# mongodb connection setup
client = MongoClient("mongodb://localhost:27017")
db = client['project']
collection = db['test2']

def second_graph(country):
    query = {"country": country}
    
    projection = {
        "year": 1,
        "hydro_consumption": 1,
        "solar_consmuption": 1,
        "biofuel_consumption": 1,
        "wind_consumption": 1
        # "_id": 0
    }
    
    cursor = collection.find(query, projection)

    df = pd.DataFrame(list(cursor))
    print(df["hydro_consumption"])

    plt.figure(1)
    plt.pie(df["solar_consmuption"])

    plt.title(f'Sustainable Energy Distribution by country')
    plt.grid(True)
    plt.legend()
    plt.tight_layout()
    plt.show()



country = sys.argv[1]
# year = sys.argv[2]

second_graph(country)