# imports
import pandas as pd
import sys
from pymongo import MongoClient

# mongodb connection setup
client = MongoClient("mongodb://localhost:27017")
db = client['project']
collection = db['test3']

def import_data(country_filename, data_filename):
    # reading countries.csv
    country_df = pd.read_csv(country_filename)
    # reading owid-energy-data_A_S.csv
    main_data_df = pd.read_csv(data_filename)
    # filering data 
    filtered_data = main_data_df[main_data_df['country'].isin(country_df['country'])]
    # filtered data into dict
    data_dict = filtered_data.to_dict(orient='records')

    # inserting into mongodb
    collection.insert_many(data_dict)
    print("Data imported successfully")

# checking for error
if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("usage is : python file_name.py <countries_filename> <data_filename>")
        sys.exit(1)

    # arguments
    country_filename_arg = sys.argv[1]
    data_filename_arg = sys.argv[2]
    
    # calling function using arguments
    import_data(country_filename_arg, data_filename_arg)
