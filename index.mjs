import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import bodyParser from "express";
import cors from "cors"
import MenuItemsModel from "./models/menuitems.mjs"
import ReserveSchema from "./models/reservations.mjs"

const PORT = process.env.PORT || 5051;
//Connection to database through mongoose
const MONGOURL=process.env.ATLAS_URI;
const options ={
    dbName:'restaurant',
};

await mongoose.connect(MONGOURL,options).then(()=>{
    console.log("Database connected");
})
.catch((error)=>
console.log(error));

const app = express();
app.use(express.json());
app.use(cors());
// Parsing Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));

// Logging Middlewaare
app.use((req, res, next) => {
  const time = new Date();

  console.log(
    `-----
${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
  );
  if (Object.keys(req.body).length > 0) {
    console.log("Containing the data:");
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});
//Get menu items
app.get("/getmenu", async(req,res)=>{
    const menuitems=await MenuItemsModel.find();
    console.log(menuitems);
    res.json(menuitems);
});
//Submit reservation form data
app.post("/submitre",async(req,res)=>{
console.log(req.body);
console.log(req.body.firstntext);
console.log(req.body.lastntext);
if (req.body) {
  try{
  const { firstntext, lastntext, datetext,timetext,emailtext,phnotext } = req.body;
  const newuser= new ReserveSchema({
    firstname:firstntext, 
    lastname:lastntext, 
    date:datetext,
    time:timetext,
    email:emailtext,
    phoneno:phnotext
  }
  );
  console.log(newuser);
  
  await newuser.save();
  res.json({ message: 'Data saved successfully' });
  }catch(error){
    if(error.code=== 11000) {
      console.error('Duplicate key error: Name must be unique');
    } else {
      console.error('Error creating user:', error);
    }
  }
  
} else res.status(400);
});
// Global error handling
app.use((err, _req, res, next) => {
    res.status(500).send("Seems like we messed up somewhere...");
  });
  
  // Start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
