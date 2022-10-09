const mongoose = require('mongoose');
const User = require('../models/User.model');
const Festival = require('../models/Festival.model');
const Film = require('../models/Film.model');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/filmgalaxy';

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });



//
const users = [

];


//
const festivals = [
    {   title: "Sundance Film Festival",
        country: "USA",
        Location: "Utah",
        timeZone: "",
        format: "Onsite",
        eventStartDate: "2023-04-01",
        eventEndDate: "2023-04-08",
        submissionDeadline: "2023-01-10",
        entryFee: 100,
        contactEmail: "Institute@sundance.org",
        website: "https://www.sundance.org/",
        submittedFilms: []
    },
    {   title: " International Film Festival Rotterdam",
        country: "Netherlands",
        Location: "Rotterdam",
        timeZone: "",
        format: "Onsite",
        eventStartDate: "2023-01-25",
        eventEndDate: "2023-02-05",
        submissionDeadline: "2022-10-04",
        entryFee: 55,
        contactEmail: "tiger@IFFR.com",
        website: "https://iffr.com/en",
        submittedFilms: []
    }
];


//
const films = [
    {
        title: "Avatar: The Way of Water",
        country: "USA",
        completionDate: "2022-12-16",
        runtime: 120,
        director: "James Cameron",
        synopsis: `Jake Sully lives with his newfound family formed on the planet of Pandora. 
        Once a familiar threat returns to finish what was previously started, Jake must work 
        with Neytiri and the army of the Na'vi race to protect their planet`,
        projectlength: "Long",
        projectType: "Fiction",
        image: "",
        language: "English",
        genre: "Fantasy",
        submittedInFestivals: []
    }

];

const usersPromise = User.create(users);
const festivalsPromise = Festival.create(festivals);
const filmsPromise = Film.create(films);

Promise.all([usersPromise, festivalsPromise, filmsPromise])
  .then( (result) => {
    const usersCreated = result[0];
    const festivalsCreated = result[1];
    const filmsCreated = result[2];

    console.log(`Number of users created... ${usersCreated.length} `);
    console.log(`Number of festivals created... ${festivalsCreated.length} `);
    console.log(`Number of films created... ${filmsCreated.length} `);


    mongoose.connection.close();

  })
  .catch( e => console.log("error seeding data in DB....", e));