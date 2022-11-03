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

    LOCATION_ID:{
        required: false,
        type: Number
    },
    DOCTOR_ID: {
        required: false,
        type: Number
    }, 
    group_id: {
        required: false,
        type: String
    },
    NAME: {
        required: false,
        type: String
    },
    ADDRESS_LINE_1: {
        required: false,
        type: String
    },
    ADDRESS_LINE_2: {
        required: false,
        type: String
    },
    CITY: {
        required: false,
        type: String
    },
    STATE: {
        required: false,
        type: String
    },
    ZIP_CODE: {
        required: false,
        type: String
    },
    PHONE_NUMBER: {
        required: false,
        type: String
    },
    FAX_NUMBER: {
        required: false,
        type: String
    },
    enabled: {
        required: false,
        type: Boolean
    },
    calendarable: {
        required: false,
        type: Boolean
    },
    displayable: {
        required: false,
        type: Boolean
    },
    doctor_location_uuid: {
        required: false,
        type: String
    },
    TELEMEDICINE: {
        required: false,
        type: String
    },
    lat: {
        required: false,
        type: String
    },
    lon: {
        required: false,
        type: String
    },
    locationPoint: {
        required: false,
        type: String
    },
    locationPoint: {
        type: pointSchema,
        index: '2dsphere'
    }

}, {collection: 'doctor_locations'}, {timestamps: true}, {strict: false},{dataSchema: true});

module.exports = mongoose.model('data', dataSchema)
