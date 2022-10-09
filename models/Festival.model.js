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
    eventDate: String,
    submissionDeadline: Date,
    submittedFilms: {
        type: Schema.Types.ObjectId,
        ref: "Film"
    }
})




module.exports = Festival;
