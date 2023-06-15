import app from "./src/app.js";
import {
  connectDatabase,
  disconnectDatabase,
} from "./src/database/database.js";
import dotenv from "dotenv";


/* Accessing .env content */
dotenv.config();

/* Defining server's HOSTNAME & PORT */
const hostname = process.env.HOSTNAME;
const port = process.env.PORT;


/* Connecting and disconnecting database */
connectDatabase()
  .then(() => {
    app.get("/", (req, res) => {
      res.send("Home page");
    });

    app.listen(port, () => {
      console.log(`Listening [http://${hostname}:${port}]...`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });
