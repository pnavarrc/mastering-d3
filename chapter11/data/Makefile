
LAND_URL = http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/50m/physical/ne_50m_land.zip
RASTER_URL = http://eoimages.gsfc.nasa.gov/images/imagerecords/73000/73909/world.topo.bathy.200412.3x5400x2700.jpg
STARS_URL = https://github.com/astronexus/HYG-Database/raw/master/hygfull.csv

ne_50m_land.zip:
	curl -LO $(LAND_URL)

ne_50m_land.shp: ne_50m_land.zip
	unzip ne_50m_land.zip
	touch ne_50m_land.shp

land.json: ne_50m_land.shp
	topojson -o land.json ne_50m_land.shp

# Raster Image
world.topo.bathy.200412.3x5400x2700.jpg:
	curl -LO $(RASTER_URL)

world.jpg: world.topo.bathy.200412.3x5400x2700.jpg
	mv world.topo.bathy.200412.3x5400x2700.jpg world.jpg

# Cellestial Sphere
hygfull.csv:
	curl -LO $(STARS_URL)

hyg.json: hygfull.csv
	python parse-catalog.py

clean:
	rm ne_50m_land*
	rm land.json
	rm world.topo.bathy.200412.3x5400x2700.jpg
	rm world.jpg
	rm hygfull.csv
	rm hygxyz.csv