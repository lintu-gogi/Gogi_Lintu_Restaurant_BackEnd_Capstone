import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema({
    // Each property can have a type field that describdes
    // the valid data types for that field, and a
    // required field to specify whether it is required.
    cust_id:{type :String},
    custname: { type: String  },
    order_item :{type: String},
    item_price :{type:Number},
    order_notes: {type: String},
    date: { type: Date },
    time: {type: String},
    service_type:{type: String}
    
});

// Compile the schema into a model and export it.
// Models are used much like classes to create instances
// of the objects that the schema describes.
export default mongoose.model("order_details", OrderSchema);