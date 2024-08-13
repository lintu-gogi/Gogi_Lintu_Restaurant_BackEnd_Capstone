import mongoose from "mongoose";
const MenuItemSchema = new mongoose.Schema({
    // Each property can have a type field that describdes
    // the valid data types for that field, and a
    // required field to specify whether it is required.
    name: { type: String, required: true },
    price: { type: Number, required: true }
    
});
MenuItemSchema.index({ name: 1 });

// Compile the schema into a model and export it.
// Models are used much like classes to create instances
// of the objects that the schema describes.
export default mongoose.model("menu_items", MenuItemSchema);