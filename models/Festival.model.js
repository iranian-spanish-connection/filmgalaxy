const { Schema, model } = require("mongoose");


const festivalSchema = new Schema({

    title: {
       type: String,
       required: true
    },
    description: String,
    country: String,
    location: String,
    format: {
        type: String,
    },
    eventStartDate: Date,
    eventEndDate: Date,
    submissionDeadline: Date,
    entryFee: Number,
    acceptedCategories: [String],
    acceptedLength: [String],
    contactPerson: String,
    contactEmail: String,
    website: String,
    poster: String,
    logo: String,
    submitter: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    submittedFilms: [{
        type: Schema.Types.ObjectId,
        ref: "Film"
    }]
})




module.exports = model("Festival", festivalSchema);
