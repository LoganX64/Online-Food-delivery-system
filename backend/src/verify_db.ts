import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from './models/User.js';
import { Restaurant } from './models/Restaurant.js';

dotenv.config();

async function verify() {
  const url = process.env.MongoDB_URL || "mongodb://localhost:27017/ofds";
  console.log("Connecting to:", url);
  await mongoose.connect(url);
  
  const users = await User.find({ email: 'gordon@kitchen.com' }).lean();
  console.log("USERS:", JSON.stringify(users, null, 2));
  
  if (users.length > 0) {
    const restaurants = await Restaurant.find({ ownerId: users[0]._id }).lean();
    console.log("RESTAURANTS:", JSON.stringify(restaurants, null, 2));
  }
  
  await mongoose.disconnect();
}

verify().catch(console.error);
