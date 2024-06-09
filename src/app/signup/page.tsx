"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
const page = () => {
  const router = useRouter();
  const [Loading, setLoading] = useState(false);
  const [ButtonDisabled, setButtonDisabled] = useState(true);
  const [Inputs, setInputs] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleOnSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", Inputs);
      console.log("signup successful", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      Inputs.username.length > 0 &&
      Inputs.email.length > 0 &&
      Inputs.password.length > 0
    )
      setButtonDisabled(false);
    else setButtonDisabled(true);
  }, [Inputs]);

  return (
    <>
      <div className="flex flex-col items-center  justify-center min-h-screen py-2 ">
        <h3>{Loading ? "Loading" : "signup"}</h3>
        <hr />
        <label htmlFor="username">Username:</label>
        <input
          className="text-black outline-none border-r-4"
          onChange={(e) => {
            setInputs({ ...Inputs, username: e.target.value });
          }}
          value={Inputs.username}
          type="text"
          id="username"
        />
        <label htmlFor="email">email:</label>
        <input
          onChange={(e) => {
            setInputs({ ...Inputs, email: e.target.value });
          }}
          value={Inputs.email}
          type="text"
          id="email"
        />
        <label htmlFor="password">password:</label>
        <input
          onChange={(e) => {
            setInputs({ ...Inputs, password: e.target.value });
          }}
          value={Inputs.password}
          type="text"
          id="password"
        />
        {ButtonDisabled ? "" : <button onClick={handleOnSubmit}>Signup</button>}
      </div>
    </>
  );
};

export default page;
