const { Schema, model } = require("mongoose");
const formatList = require("../utils/lists/festival-specs");
const {
  projectTypeList,
  lengthCategoryList,
} = require("../utils/lists/project-specs");

const festivalSchema = new Schema({
  title: {
    type: String,
    required: false,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  country: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
    trim: true,
  },
  format: { type: String, required: false, enum: formatList },
  eventStartDate: { type: Date, required: false },
  eventEndDate: { type: Date, required: false },
  submissionDeadline: { type: Date, required: false },
  entryFee: { type: Number, required: false },
  acceptedCategories: [{ type: String, required: false, enum: projectTypeList }],
  acceptedLength: [{ type: String, required: false, enum: lengthCategoryList }],
  contactPerson: { type: String, required: false },
  contactEmail: {
    type: String,
    required: false,
    unique: true,
    match: [
      /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
      "Please use a valid email address.",
    ],
    trim: true,
  },
  website: {
    type: String,
    required: false,
    unique: false,
    match: [
      /(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
      "Please use a valid url.",
    ],
    trim: true,
  },
  poster: { type: String, required: true },
  photos: [{ type: String, required: true }],
  submitter: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  // submittedFilms: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: "Film",
  //   },
  // ],
});

module.exports = model("Festival", festivalSchema);
