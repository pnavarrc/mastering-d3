# Download and Generate GeoJSON and TopoJSON files
# ================================================

ADMIN0_URL = http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/50m/cultural/ne_50m_admin_0_countries.zip

# Targets
# -------

# Download the Compressed Shapefiles
ne_50m_admin_0_countries.zip:
	curl -LO $(ADMIN0_URL)

# Uncompress the Shapefiles
ne_50m_admin_0_countries.shp: ne_50m_admin_0_countries.zip
	unzip ne_50m_admin_0_countries.zip
	touch $@

# Convert the shapefiles to GeoJSON
countries.geojson: ne_50m_admin_0_countries.shp
	ogr2ogr -f GeoJSON $@ ne_50m_admin_0_countries.shp

countries.topojson: countries.geojson
	topojson -o $@ -p admin -p continent countries.geojson
