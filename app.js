const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const path = require ("path")
const cors = require("cors");
const { addUser, getUser } = require("./controller/user");

// MiddleWares
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded());
dotenv.config({
  path: "./opt/.env",
});
const port = process.env.PORT||3001;

//DB-Connection
mongoose
  .connect(
  process.env.DB_HOST,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((e) => {
    console.log(e);
  });

//ExpressServer
app.listen(port, () => {
  console.log(`Server is running at: ${port}`);
});

//Routes
app.post("/addUser", addUser);
app.get("/getUser", getUser);

// Deployment
__dirname=path.resolve();
if(process.env.NODE_ENV==="production"){
app.use(express.static("client/build"))
}else{
  app.get("/",(req,res)=>{
    res.send("Api is running...")
  })
}
