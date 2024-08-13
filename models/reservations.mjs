import mongoose from "mongoose";
const ReserveSchema = new mongoose.Schema({
    // Each property can have a type field that describdes
    // the valid data types for that field, and a
    // required field to specify whether it is required.
    firstname: { type: String  },
    lastname: { type: String},
    date: { type: Date },
    time: {type: String},
    email: { type: String },
    phoneno: { type: Number }
    
});

// Compile the schema into a model and export it.
// Models are used much like classes to create instances
// of the objects that the schema describes.
export default mongoose.model("reserve_datas", ReserveSchema);