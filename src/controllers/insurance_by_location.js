const Insurances = require("../models/insurances_by_location");

let controller = {};

controller.getInsurances = async (req, res) => {
  try {
    lat = req.query.lat;
    long = req.query.long;
    doctor_id = req.query.doctor_id;
    distance = req.query.distance;
    const pipeline = [
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(long), parseFloat(lat)],
          },
          distanceField: "distance",
          maxDistance: distance * 1609.34,
          spherical: true,
          limit: 50000,
        },
      },
      {
        $match: {
          DOCTOR_ID: doctor_id ? parseInt(doctor_id) : { $exists: true },
        },
      },
        {
            $group: {
                _id: "$INSURANCE_ID",
                INSURANCE_ID: { $first: "$INSURANCE_ID" },
                insurance_name: { $first: "$insurance_name" },
                insurance_uuid: { $first: "$insurance_uuid" },  
                PLAN_ID: { $first: "$PLAN_ID" },
                distance: { $first: "$distance" },
            }

        },
        {
            $sort: {
                insurance_name: 1
            }
            
        
        }

    ];

    
    try {
      const insurances = await Insurances.aggregate(pipeline);
      return insurances;
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = controller;
