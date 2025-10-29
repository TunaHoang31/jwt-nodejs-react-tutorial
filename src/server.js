require('dotenv').config();
import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import configCors from "./config/cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

// import connection from "./config/connectDB.js";
// import { createJWT, verifyToken } from './middleware/JWTAction'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 8080;

//config cors
configCors(app);

//config view engine
configViewEngine(app);

// config body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test connection db
// connection();

// config cookie-parser
app.use(cookieParser());
 
// //test JWT
// createJWT();
// let decodedData = verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSG9hbmciLCJhZGRyZXNzIjoiaGEgbm9pIiwiaWF0IjoxNzYxNjM1NjIxfQ.wJksaCMCSqNmV_yUqfQXz9Vn9k4_IPmgmsXPRemaSvg");
// console.log(decodedData)

//init web routes
initWebRoutes(app);
initApiRoutes(app);

app.use((req, res) => {
    return res.send('404 not found')
})

app.listen(PORT, () => {
    console.log("JWT Backend nodejs is running on the port: " + PORT);
});