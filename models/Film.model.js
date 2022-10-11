const { Schema, model } = require("mongoose");

const filmSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  country: {
    type: String,
  },
  language: {
    type: String,
  },
  genre: {
    type: String,
  },
  completionDate: Date,
  runtime: Number,
  director: String,
  writer: String,
  cast: [String],
  producer: String,
  synopsis: String,
  projectlength: {
    type: String,
  },
  projectType: {
    type: String,
  },
  poster: {
    type: String,
    URL,
  },
  still: [
    {
      type: String,
      URL,
    },
  ],
  trailer: {
    type: String,
    URL,
  },
  preview: {
    type: String,
    URL,
  },
  submitter: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  submittedInFestivals: [
    {
      type: Schema.Types.ObjectId,
      ref: "FilmFestival",
    },
  ],
});

module.exports = model("Film", filmSchema);
