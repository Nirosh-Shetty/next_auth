import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const tokenData: any = jwt.verify(token, process.env.SECRET_TOKEN!);
    console.log("this is id", tokenData.id);
    return tokenData.id;
  } catch (error: any) {
    console.log(error.message);
  }
};
