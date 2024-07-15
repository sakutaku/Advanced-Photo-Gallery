# Advanced Photo Gallery
This is an Advanced Photo Gallery, where you can create and enjoy different photos. The app is divided into admin and client sides. To enter an admin side you need to login as admin (login: Kimmy, password: 0000). As admin you are able to manage content.

As user you can add/delete photos. Clicking on a photo will open a modal window displaying the photo in a larger size. Clicking on the author's name takes you to a page displaying all the photos uploaded by that author. If you are logged in and are the author, you will see a "Upload New Photo" button on this page and have the ability to delete any of your photos.

The code is divided into backend and frontend parts. Backend is made on Express, MongoDb, TypeScript, using middlewares to control user permissions. Frontend is made using ReactJs, Redux Toolkit, TypeScript.

To start the project, you need to do the following:

1) Clone the project to your Github machine with the command:
   
   `git clone git@github.com:sakutaku/Advanced-Photo-Gallery.git`

2) Open project in the terminal an go to backend folder and write following commands:

   `npm i && npm run seed` and `npm run dev`

3) Open frontend folder and write following command:

   `npm i` && `npm run start`

4) Open website in browser
   
   `http://localhost:3000/`
