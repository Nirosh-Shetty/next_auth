"use client";

import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const searchParams = useSearchParams();
  const [token, settoken] = useState("");
  const [verified, setverified] = useState(false);
  const [error, seterror] = useState(false);
  const verifyToken = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setverified(true);
      seterror(false);
    } catch (error: any) {
      console.log(error.response.data);
      seterror(true);
      setverified(false);
    }
  };
  useEffect(() => {
    console.log("hi");

    const urlToken: any = searchParams.get("token");
    console.log("aasd", urlToken);
    settoken(urlToken);
  }, []);
  useEffect(() => {
    // console.log(token);
    if (token.length > 0) verifyToken();
  }, [token]);
  return (
    <div className="flex justify-center items-center flex-col ">
      <h1>verify token</h1>
      //TODO use a button to verify token instead of directly verifing on page
      load
      {verified && (
        <div>
          <h3>Token verifyed</h3>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h3>Error occured</h3>
        </div>
      )}
    </div>
  );
};

export default page;
