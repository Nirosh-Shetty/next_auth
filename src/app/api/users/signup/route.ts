import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
export async function POST(request: NextRequest) {
  const reqBody = request.json();
  const { username, email, password } = reqBody;
  const user = await User.findOne({ email });
  if (user) {
    NextResponse.json({ error: "User already exits" }, { status: 400 });
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  const savedUser = await newUser.save();
}
