const express = require("express");
const mongoose = require("mongoose");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require('cors');
const path = require('path');


//import routes
const auth = require("./routes/auth");
const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobsRoutes");
const jobTypeRoutes = require("./routes/jobsTypeRoutes");




const cookieParser = require('cookie-parser');
const errorHandler = require("./middleware/error");

//db connection 
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

//MIDDLEWARE
//app.use(express.limit('5M'));
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  limit: '5mb',
  extended: true
}));
app.use(cookieParser());
app.use(cors());

//ROUTES middleware 
app.use("/api", auth);
app.use("/api", userRoutes);
app.use("/api", jobRoutes);
app.use("/api", jobTypeRoutes);


//Error middleware
app.use(errorHandler);

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

