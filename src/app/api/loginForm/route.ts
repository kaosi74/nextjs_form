// import { NextRequest } from "next/server";
import connectMongo from "../../../../lib/mongodb";
import Form from "../../../../models/Form";

export async function POST(req: Request) {
  try {
    await connectMongo();
    const { email, password } = await req.json();
    if (!email || !password) {
      return Response.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    } else if (!email.includes("@")) {
      return Response.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    } 
    const existingUser = await Form.findOne({ email });
    if (!existingUser) {
      return Response.json({ message: "User not found" }, { status: 400 });
      }
      
    return Response.json({ success: true }, { status: 200 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("Error message:", errorMessage);
    return Response.json(
      { message: "Internal Server Error", error: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectMongo();
    const users = await Form.find({});
    if (users.length > 0) {
      return Response.json(users);
    } else {
      return Response.json({
        message: "No user found in database",
      });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Response.json(
        { message: "Internal Server Error", error: error.message },
        { status: 500 }
      );
    } else {
      return Response.json(
        { message: "Internal Server Error", error: "Unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
