"""
Uses the wbgapi library to get data from the World Bank API, saves it as JSON that
can be transferred to the frontend when the endpoint is called.
"""
import wbgapi as wb
import pandas as pd
import numpy as np
from pathlib import Path
import json

data_dir = Path("wb_data")
country_json = "country_codes.json"
country_name_to_code = json.load(open(country_json))


def create_indicator_jsons():
	# Create data_dir if it does not exist
	if not data_dir.exists():
		data_dir.mkdir()
	# Indicators to use: gdp, gdp per capita, population, life expectancy, fertility rate, gdp (ppp), gdp per capita (ppp), central government debt, inflation consumer prices,
	# urban population percentage of population, energy imports net, co2 emissions per capita, unemployment rate, gdp growth
	to_use = ["NY.GDP.MKTP.CD", "NY.GDP.PCAP.CD", "SP.POP.TOTL", "SP.DYN.LE00.IN", "SP.DYN.TFRT.IN", "NY.GDP.MKTP.PP.CD", "NY.GDP.PCAP.PP.CD", "FP.CPI.TOTL.ZG", "SP.URB.TOTL.IN.ZS", "NE.IMP.GNFS.ZS", "EN.ATM.CO2E.PC", "SL.UEM.TOTL.ZS", "NY.GDP.MKTP.KD.ZG"]
	# Indicator to name dictionary
	indicator_dict = {
		"NY.GDP.MKTP.CD": "GDP (nominal)",
		"NY.GDP.PCAP.CD": "GDP per capita (nominal)",
		"SP.POP.TOTL": "Population",
		"SP.DYN.LE00.IN": "Life expectancy",
		"SP.DYN.TFRT.IN": "Fertility rate",
		"NY.GDP.MKTP.PP.CD": "GDP (PPP)",
		"NY.GDP.PCAP.PP.CD": "GDP per capita (PPP)",
		"FP.CPI.TOTL.ZG": "Inflation (consumer prices)",
		"SP.URB.TOTL.IN.ZS": "Urban population (percentage of total)",
		"NE.IMP.GNFS.ZS": "Energy imports (percentage of total)",
		"EN.ATM.CO2E.PC": "CO2 emissions per capita",
		"SL.UEM.TOTL.ZS": "Unemployment rate",
		"NY.GDP.MKTP.KD.ZG": "GDP growth"
	}

	indicators = wb.series.list()
	for indicator in indicators:
		if indicator["id"] in to_use: # and indicator_dict[indicator['id']].replace(' ', '_') + ".csv" not in [file.name for file in data_dir.iterdir()]:
			indicator_dataframe = wb.data.DataFrame(indicator["id"])
			# Change column name from "YRXXXX" to "XXXX"
			indicator_dataframe.columns = [int(col[2:]) for col in indicator_dataframe.columns]
			indicator_dataframe.to_csv(f"{data_dir}/{indicator_dict[indicator['id']].replace(' ', '_')}.csv")

def get_countries_indicators(countries):
	countries = [country_name_to_code[country] for country in countries]
	res = {}
	# Go through csv files and get the data for the countries
	for file in data_dir.iterdir():
		if file.suffix == ".csv":
			indicator_data = pd.read_csv(file, index_col=0)
			indicator_data = indicator_data.loc[countries]
			# Convert NaN entries to None, since JSON does not support NaN
			indicator_data = indicator_data.replace(np.nan, None)
			indicator_data = indicator_data.to_dict()
			indicator_name = file.stem
			res[indicator_name] = indicator_data
	return res


if __name__ == "__main__":
	create_indicator_jsons()
