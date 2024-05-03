# TWA Final Project Server Prototype

## Summary 
The server will implement 4 routes, one fro reach of the graph types. each route will accept the required parameters in the form of query parameters. The server will feature a health check route to view the server status. The server also features several test routes that are purely for prototyping and will be discontinued in the final release.

## Route 1: Fossil Fuel energy consumption line graph
### Method:
    "GET"
### Route:
    "/lineEnergyConsumption"
### Example:
    "/lineEnergyConsumption?country=COUNTRYNAME"
This route is used to call the python script to generate a line graph that is used to compare the fossil fuel consumption of a selected country country 
This route will accept the country name as a query parameter "country"
## Route 2: renewable energy consumption pie charts
### Method:
    "GET"
### Route:
    "/sustainablePieCharts"
### Example:
    "/sustainablePieCharts?year=YEAR&countries=COUNTRY1,COUNTRY2,COUNTRY3,COUNTRY,4"

This route is used to call the python script to generate a pie chart that is used to compare the renewable energy consumption of selected countries.

This route will accept 2 query parameters one will accept the year as a query parameter "year". The other query parameter will be for countries defined as "countries". The countries are expected to be separated by commas and will be split and counted in the server logic.
## Route 3: Comparisons
### Method:
    "GET"
### Route:
    "/barCountryComparison"
### Example:
    "/barCountryComparison?comparison=gdp"
This route is used to call the python script to generate a bar graph that is used to compare countries statistics.

This route will accept one query parameter "comparison" to define what will be compared on the graph. The only values that are accepted are:  greenhouse_gas_emissions, population or gdp, this will be validated in the server logic.
## Route 4: Custom Graph
### Method:
    "GET"
### Route:
        "/customGraph"
This route will be used to display a custom graph, it accepts no parameters.
## Route 5: health route
### Method:
    "GET"
purely for checking the health of the server, accepts no parameters

# Testing routes
## Will be removed or archived in final release

## Python Testing Route:
### Method:
    "GET"
### Route:
    "/pythonTest"
This route is to showcases the server's ability to run a python script as a child process. This route accepts no parameters

## Image Testing Route
### Method:
    "GET"
### Route:
    "/imageTest"
This route showcases the server's ability to send images as response bodies. This route accepts no parameters