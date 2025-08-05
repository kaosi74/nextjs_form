// import { NextResponse } from "next/server";
// import connectMongo from "../../../../lib/mongodb";
// import Form from "../../../../models/Form";

import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import connectMongo from "../../../../lib/mongodb";
import Form from "../../../../models/Form";

export async function POST(req: NextRequest) {
  try {
    await connectMongo();
    const body = await req.json();

    const existingUser = await Form.findOne({ email: body.email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    await Form.create(body);
    return NextResponse.json(
      { message: "User saved successfully" },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Internal Server Error", error: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { message: "Internal Server Error", error: "Unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
