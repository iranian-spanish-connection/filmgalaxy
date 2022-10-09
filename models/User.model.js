const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: String,
    
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required.']
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);
const User = model("User", userSchema);


const FestAdmin = User.discriminator("FestAdmin", new Schema({
  company: String,
  address: String
}))


const Filmmaker = User.discriminator("Filmmaker", new Schema({
  gender: {
    type: String,
    enum:["male", "female", "non-binary", "Prefer not to respond"]
  },
  birthDate: Date,
}))


// const FestAdmin = model("FestAdmin", festAdminSchema)
// const Filmmaker = model("Filmmaker", filmmakerSchema)


//module.exports = {User, FestAdmin, Filmmaker};
module.exports = User;

