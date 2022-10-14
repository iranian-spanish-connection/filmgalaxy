const { Schema, model } = require("mongoose");
const formatList = require("../utils/lists/festival-specs");
const {
  projectTypeList,
  lengthCategoryList,
} = require("../utils/lists/project-specs");

const festivalSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  format: { type: String, required: true, enum: formatList, trim: true },
  eventStartDate: { type: Date, required: true },
  eventEndDate: { type: Date, required: true },
  submissionDeadline: { type: Date, required: true },
  entryFee: { type: Number, required: true },
  acceptedCategories: [{ type: String, required: true, enum: projectTypeList }],
  acceptedLength: [{ type: String, required: true, enum: lengthCategoryList }],
  contactPerson: { type: String, required: true },
  contactEmail: {
    type: String,
    required: true,
    match: [
      /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
      "Please use a valid email address.",
    ],
    trim: true,
  },
  website: {
    type: String,
    required: true,
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
