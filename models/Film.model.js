const { Schema, model } = require("mongoose");

const filmSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  genre: [
    {
      type: String,
      required: true,
    },
  ],
  completionDate: {
    type: Date,
    required: true,
  },
  runtime: {
    type: Number,
    required: true,
  },
  director: {
    type: String,
    required: true
  },
  writer: {
    type: String,
    required: true
  },
  cast: [String],
  producer: {
    type: String,
    required: true
  },
  synopsis: {
    type: String,
    required: true
  },
  projectlength: {
    type: String,
    required: true
  },
  projectType: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    default: "/images/default-movie.jpg",
  },
  photos: [
    {
      type: String,
      default: "/images/default-movie.jpg",
    },
  ],
  trailer: {
    type: String,
    default: "No trailer available.",
    URL,
  },
  preview: {
    type: String,
    required: true,
    URL,
  },
  submitter: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  submittedInFestivals: [
    {
      type: Schema.Types.ObjectId,
      ref: "FilmFestival",
      default: "Not submitted in any Festival"
    },
  ],
});

module.exports = model("Film", filmSchema);
