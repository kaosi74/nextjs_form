import { NextRequest } from "next/server";
// import { NextResponse } from "next/server";
import connectMongo from "../../../../lib/mongodb";
import Form from "../../../../models/Form";
import { redirect } from "next/navigation";

export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    const body = await req.json();
    const existingUser = await Form.findOne({ email: body.email });
    if (existingUser) {
      return Response.json({ message: "User already exists" }, { status: 400 });
    }

    const userData = await Form.create(body);
    console.log(userData);
    redirect("/success");

    // return redirect("/success");
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

export async function GET() {
  try {
    await connectMongo();
    const users = await Form.find({});
    console.log(users);
    return Response.json(users, { status: 200 });
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
