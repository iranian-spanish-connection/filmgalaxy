const { Schema, model } = require("mongoose");


const festivalSchema = new Schema({

    title: String,
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
    submittedFilms: [{
        type: Schema.Types.ObjectId,
        ref: "Film"
    }]
})




module.exports = model("Festival", festivalSchema);
