const mongoose = require('mongoose'); 

const pointSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  });

const dataSchema = new mongoose.Schema({
    DOCTOR_INSURANCE_ID:{
        required: false,
        type: String
    } ,
    DOCTOR_ID: {
        required: false,
        type: Number
    },
    INSURANCE_ID: {
        required: false,
        type: Number
    },
    insurance_name: {
        required: false,
        type: String
    },
    PLAN_ID: {
        required: false,
        type: Number
    },
    lat: {
        required: false,
        type: Number
    },
    long: {
        required: false,
        type: Number
    },
    end_date: {
        required: false,
        type: Date
    },
    insurance_uuid: {
        required: false,
        type: String
    },
    coordinates: {
        type: pointSchema,
        index: '2dsphere' 
    }

 
}, {collection: 'insurances_by_location'}, {timestamps: true}, {strict: false},{dataSchema: true});

module.exports = mongoose.model('data_insurances', dataSchema)