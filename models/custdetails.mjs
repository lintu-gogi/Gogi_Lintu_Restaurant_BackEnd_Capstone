import mongoose from "mongoose";
const CustomerSchema = new mongoose.Schema({
    // Each property can have a type field that describdes
    // the valid data types for that field, and a
    // required field to specify whether it is required.
    firstname_cust: { type: String},
    lastname_cust: { type: String},
    email_cust: { type: String },
    phoneno_cust: { type: Number },
    cust_id : {type: String}
    
});

// Compile the schema into a model and export it.
// Models are used much like classes to create instances
// of the objects that the schema describes.
export default mongoose.model("cust_details", CustomerSchema);