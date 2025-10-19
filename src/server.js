import express from "express";
import configViewEngine from "./config/viewEngine.js";
import initWebRoutes from "./routes/web.js";
require('dotenv').config();
import bodyParser from "body-parser";
// import connection from "./config/connectDB.js";

const app = express();
const PORT = process.env.PORT || 8080;

//config view engine
configViewEngine(app);

// config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test connection db
// connection();

//init web routes
initWebRoutes(app);

app.listen(PORT, () => {
    console.log("JWT Backend nodejs is running on the port: " + PORT);
});