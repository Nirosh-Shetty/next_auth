import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const response = NextResponse.json({
      message: "logout successful",
      success: true,
    });
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    console.log("logged out");
    return response;
  } catch (error: any) {
    console.log(error.message);
  }
};
