import mongoose from "mongoose";

const DropdownServiceSchema = new mongoose.Schema({
  name: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("DropdownService", DropdownServiceSchema);
