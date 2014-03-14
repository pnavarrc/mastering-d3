
# Variables
# ---------
DATAURL = 'http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_admin_0_countries.zip'
POPULATED_PLACES_URL = 'http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/10m/cultural/ne_10m_populated_places.zip'


# Targets
# -------

# Download the file from Natural Earth
ne_10m_admin_0_countries.zip:
	curl -LO $(DATAURL)

# Uncompress the shapefiles
ne_10m_admin_0_countries.shp: ne_10m_admin_0_countries.zip
	unzip ne_10m_admin_0_countries.zip

# Generate a GeoJSON file for Greenland
greenland: ne_10m_admin_0_countries.shp
	ogr2ogr -f GeoJSON greenland.json -where "ADMIN='Greenland'" ne_10m_admin_0_countries.shp

ne_10m_populated_places.zip:
	curl -LO $(POPULATED_PLACES_URL)

ne_10m_populated_places.shp: ne_10m_populated_places.zip
	unzip ne_10m_populated_places.zip

places.json: ne_10m_populated_places.shp
	ogr2ogr -f GeoJSON places.json -where "ADM0NAME = 'Greenland'" ne_10m_populated_places.shp

greenland.topojson: places.json greenland.json
	topojson -o greenland.topojson -p NAMEASCII -p POP_MAX -- greenland.json places.json

