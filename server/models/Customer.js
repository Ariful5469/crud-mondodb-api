// server/models/Customer.js
import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Customer', CustomerSchema);
