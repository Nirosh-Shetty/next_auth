"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const router = useRouter();
  const [data, setdata] = useState("");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("logout success");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const getUserDetails = async () => {
    console.log("dddd");

    const response = await axios.get("/api/users/profile");
    setdata(response.data.data._id);
  };
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <h1>Profile</h1>
      <h2>
        {data ? <Link href={`/profile/${data}`}>{data}</Link> : "nothing"}
      </h2>
      <button className="p-1 bg-green-500" onClick={getUserDetails}>
        Get Profile Data
      </button>
      <hr />
      <button onClick={logout} className="p-1 bg-blue-400">
        logout
      </button>
    </div>
  );
};

export default page;
