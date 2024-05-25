import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json(
        { error: "User does'nt exist" },
        { status: 400 }
      );
    const passwordCompare = bcrypt.compare(password, user.password);
    if (!passwordCompare)
      return NextResponse.json({ error: "Password wrong" }, { status: 400 });
    const tokenPayload = {
      id: user._id,
      email: user.email,
    };
    const token = jwt.sign(tokenPayload, process.env.SECRET_TOKEN!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({
      message: "login Successful",
      success: true,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
