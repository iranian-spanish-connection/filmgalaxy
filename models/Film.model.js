const { Schema, model } = require("mongoose");


const filmSchema = new Schema({

    title: {
        type: String,
        required: true,
    },
    country: String,
    completionDate: Date,
    runtime: Number,
    director: String,
    synopsis: String,
    projectlength: {
        type: String,
        enum: [ "Long", "middle-length", "short"]
    },
    projectType: {
        type: String,
        enum: [ "Feature", "Documentary", "Experimental"]
    },
    image: {
        type: String,
        URL
    },
    language: {
        type: String,
        enum: []
    },
    genre: String,
    submittedInFestivals: [{
        type: Schema.Types.ObjectId,
        ref: "FilmFestival"
    }]
})


module.exports = Film;
