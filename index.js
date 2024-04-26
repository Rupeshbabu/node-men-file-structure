const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const hpp = require('hpp');
const AppError = require('./utils/appError');


const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
dotenv.config({ path: "./config.env" });

// CORS 
app.use(cors());

// SET Security HTTP Headers
app.use(helmet());

// Limits requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    mesaage: 'Too many requests from this IP, Please try again in an hour!'
});
app.use('/api', limiter);


app.use(express.json({limit : '10kb'}));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xssClean());

// Prevent parameter pollution
app.use(hpp());


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
 
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/auth", authRoutes);


app.use("/", (req, res) => {
  return res.end("APIs works...");
});

// 404 - page not found 
app.all('*', (req, res, next) =>{
  // res.status(404).json({
  //     status:'fail',
  //     message:`Can't find ${req.originalUrl} on this server!`
  // });

  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
