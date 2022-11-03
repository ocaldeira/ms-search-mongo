import mysql.connector  
import pymongo
from typing import Optional, Tuple
import shapely.geometry
import time
import json

start = time.time()
def valid_lonlat(lon: float, lat: float) -> Optional[Tuple[float, float]]:
        lon %= 360
        if lon >= 180:
            lon -= 360
        lon_lat_point = shapely.geometry.Point(lon, lat)
        lon_lat_bounds = shapely.geometry.Polygon.from_bounds(
            xmin=-180.0, ymin=-90.0, xmax=180.0, ymax=90.0
        )

        if lon_lat_bounds.intersects(lon_lat_point):
            return 1
        else:
            return 0

sql = 'select di.DOCTOR_INSURANCE_ID,di.DOCTOR_ID,di.INSURANCE_ID,di.PLAN_ID,ST_X(dlp.pt) as lat, ST_Y(dlp.pt) as lon , i.name as insurance_name, i.end_date, i.insurance_uuid, st_asgeojson(dlp.pt) as locationPoint  from doctor_insurance di'
sql += ' join doctor_location dl on dl.DOCTOR_ID = di.DOCTOR_ID'
sql += ' join insurance i on i.INSURANCE_ID = di.INSURANCE_ID'
sql += ' join doctor_location_point dlp on dlp.location_id = dl.LOCATION_ID'
#sql += ' limit 1000000'

delete_existing_documents = True
mysql_host="localhost"
mysql_database="development"
mysql_user="root"
mysql_password="root"

mongodb_host = "mongodb://localhost:27017/"
mongodb_dbname = "referwell"

mysqldb = mysql.connector.connect(
    host=mysql_host,
    database=mysql_database,
    user=mysql_user,
    password=mysql_password
)

mycursor = mysqldb.cursor(dictionary=True)
mycursor.execute(sql)
myresult = mycursor.fetchall()

myclient = pymongo.MongoClient(mongodb_host)
mydb = myclient[mongodb_dbname]
mycol = mydb["insurances_by_location"]
x = mycol.delete_many({})


finalResult = []
if len(myresult) > 0:
        print("Total records: ", len(myresult))
        for row in myresult:
            rowResult = {}
            for col in row:
                rowResult[col] = row[col]
            if row["lat"] is None or row["lat"] is None:
                rowResult["coordinates"] = None
            elif valid_lonlat(float(row["lon"]), float(row["lon"])) == 1:

                jsonTxt = '{ "type": "Point", "coordinates": [ '+str(row["lon"])+', '+str(row["lat"])+' ] }'

                rowResult["coordinates"]=json.loads(jsonTxt)
            else:
                rowResult["coordinates"] = None

               
            finalResult.append(rowResult)

        
        x = mycol.insert_many(finalResult) #myresult comes from mysql cursor
      
        print(len(x.inserted_ids))

print("Time taken: ", time.time() - start)



        