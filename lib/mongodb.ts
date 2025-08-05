import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://kaosi:coder@cluster0.28urvud.mongodb.net/del1"
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectMongo;
