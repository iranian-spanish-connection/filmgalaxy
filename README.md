# Description

Film Galaxy is a platform where filmmakers, producers and distributors can submit their films to the member film festivals globally. It also provides a workspace for festival organizers to manage their event.

# How to run this application

In order to run this application you need to add these environment variables to the platform where the site will be running:

- MONGODB_URI: The mongodb connection string for the database
- SESSION_SECRET: The secret used to sign the session ID cookies
- Create an account in Cloudinary to upload the images in the application and put the required values from you account (you can find them on the dashboard)
  - CLOUDINARY_KEY
  - CLOUDINARY_NAME
  - CLOUDINARY_SECRET

# Demo

Find the live app [here](https://filmgalaxy.herokuapp.com/)

<p float="left">
<img src="./public/images/filmgalaxy-homepage.jpg" alt="drawing" style="width:100%;"/>
</p>

<br/>
<p float="left">
<img src="./public/images/filmgalalxy-festivals.png" alt="drawing" style="width:50%;"/><img src="./public/images/filmgalaxy-films.png" alt="drawing" style="width:50%;"/>
</p>
