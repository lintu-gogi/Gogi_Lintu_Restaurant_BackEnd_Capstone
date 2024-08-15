import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import bodyParser from "express";
import cors from "cors"
import MenuItemsModel from "./models/menuitems.mjs"
import ReserveSchema from "./models/reservations.mjs"
import CustomerSchema from "./models/custdetails.mjs"
import OrderSchema from "./models/orderdetails.mjs"

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
//Submit Customer details from Order form
app.post("/submit_cust",async(req,res)=>{
  console.log(req.body);
  const {firstPayload,secondPayload,idPayload} = req.body;
    console.log(firstPayload);
    console.log(secondPayload);
    console.log(idPayload);
    console.log(firstPayload.firstnCust);
    console.log(secondPayload.length);
  if (req.body) {
    try{
    //const { firstnCust, lastnCust, emailCust,phnoCust } = req.body;
    const newuser= new CustomerSchema({
      firstname_cust: firstPayload.firstnCust, 
      lastname_cust: firstPayload.lastnCust, 
      email_cust: firstPayload.emailCust,
      phoneno_cust: firstPayload.phnoCust,
      cust_id: idPayload
    });
    await newuser.save();
    for(let i=0;i<secondPayload.length;i++){
    const neworder= new OrderSchema({
      cust_id: idPayload,
      custname: firstPayload.firstnCust, 
      custphone: firstPayload.phnoCust,
      order_item: secondPayload[i].name,
      item_price: secondPayload[i].price
    })
    await neworder.save();
    }
    res.json({ message: 'Data saved successfully' });
    //console.log(res.json());
    }catch(error){
      console.log(error);
    }
    
  } else res.status(400);
  });

// Route to get all order items
app.get('/orderitems', async (req, res) => {
  try {
    const items = await OrderSchema.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items' });
  }
});
// Route to delete selected items
app.delete('/deleteorders', async (req, res) => {
  try {
    const ids = req.body.ids;
    console.log("Id's to delete "+ids);
    await OrderSchema.deleteMany({ _id: { $in: ids } });
    res.json({ message: 'Orders deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting items' });
  }
});
// Global error handling
app.use((err, _req, res, next) => {
    res.status(500).send("Seems like we messed up somewhere...");
  });
  
  // Start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
