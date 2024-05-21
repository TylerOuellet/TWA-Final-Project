# imports
import sys
from pymongo import MongoClient
import os
from dotenv import load_dotenv
import numpy as np

#Get environment var
load_dotenv()
cluster_uri = os.getenv("DB_CONNECTION")
# mongodb connection setup
try:
    client = MongoClient(cluster_uri)
    db = client['project']
    collection = db['data']
except ConnectionError as err:
    #Error given to server
    print(f"Error connecting to MongoDB: {err}", file=sys.stderr)
    sys.exit(1)

# Returns the iso codes for available countries 
def return_countries():
    countries_cursor = collection.distinct("iso_code")
    countries_list = [country for country in countries_cursor if not isinstance(country, float) or not np.isnan(country)]
    print(countries_list)
return_countries()