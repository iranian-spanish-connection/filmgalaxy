const { Schema, model } = require("mongoose");


const festivalSchema = new Schema({

    title: {
       type: String,
       required: true
    },
    country: String,
    location: String,
    timeZone: String,
    format: {
        type: String,
        enum: ["Onsite", "Online", "Onsite & Online"]
    },
    eventStartDate: Date,
    eventEndDate: Date,
    submissionDeadline: Date,
    image: String,
    entryFee: Number,
    contactEmail: String,
    website: String,
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
