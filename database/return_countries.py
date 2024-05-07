# imports
import pandas as pd
import matplotlib.pyplot as plt
import sys
from pymongo import MongoClient


# mongodb connection setup
# cluster_uri = "mongodb+srv://tylerouellet93:YmataxFAcXo3GqlW@cluster0.9xoenc5.mongodb.net/"
client = MongoClient("mongodb://localhost:27017")
db = client['project']
collection = db['test2']

def return_countries():
    countries_cursor = collection.distinct("country")
    countries_list = list(countries_cursor)
    print('countries_list: ', countries_list)
    df = pd.DataFrame(countries_list, columns=["country"])
    print('df: ', df)
    return df
