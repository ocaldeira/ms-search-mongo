const DoctorLocations = require("../models/doctor_locations");

let controller = {};

controller.getDoctorLocations = async (req, res) => {
    try {
          
        lat = req.query.lat;
        long = req.query.long;
        distance = req.query.distance;
  const pipeline = [
    {
        $geoNear: {
            near: { type: "Point", coordinates: [parseFloat(long), parseFloat(lat)] },
            distanceField: "distance",
            maxDistance: distance * 1609.34,
            spherical: true,
            limit: 10000
        }
    },
      {
        $project: {
            _id: 0,
            DOCTOR_ID: 1,
            NAME: 1,
            ADDRESS_LINE_1: 1,
            ADDRESS_LINE_2: 1,
            CITY: 1,
            STATE: 1,
            ZIP_CODE: 1,
            PHONE_NUMBER: 1,
            FAX_NUMBER: 1,
            distance: 1
                   
      }
    }
  ]; 

  try {
    const locations = await DoctorLocations.aggregate(pipeline);
    return locations;
  } catch (error) {
    return error;
  } 

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    }

module.exports = controller;    

 