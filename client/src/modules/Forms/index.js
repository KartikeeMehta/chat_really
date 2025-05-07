import React from "react";
import { useState } from "react";
import Input from "../../components/input/index";
import Button from "../../components/button/index";
import { useNavigate } from "react-router-dom";

const Form = ({ isSignInPage = false }) => {
  const [data, setData] = useState({
    ...(!isSignInPage && {
      fullName: "",
    }),
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // handle form submission
    console.log("data :>>", data);
    e.preventDefault();
    const res = await fetch(
      `http://localhost:8000/api/${isSignInPage ? "login" : "register"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (res.status === 400) {
      alert("Invalid credentials");
    } else {
      const resData = await res.json();
      if (resData.token) {
        localStorage.setItem("user:token", resData.token);
        localStorage.setItem("user:detail", JSON.stringify(resData.user));
        navigate("/");
      } else {
        alert(resData);
      }
    }
  };

  return (
    <div className="bg-[#f9faff] h-screen flex items-center justify-center">
      <div className="bg-white w-[600px] h-[800px] shadow-lg rounded-lg flex flex-col justify-center items-center">
        <div className="text-4xl font-extrabold">
          Welcome {isSignInPage && "Back"}
        </div>
        <div className="text-xl font-light mb-14">
          {isSignInPage ? "Sign in to get explored" : "Sign Up to get started"}
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          {!isSignInPage && (
            <Input
              label="Full Name"
              name="name"
              placeholder="Enter your full name"
              className=""
              value={data.fullName}
              onChange={(e) => setData({ ...data, fullName: e.target.value })}
            />
          )}
          <Input
            label="Email Address"
            name="email"
            placeholder="Enter your Email"
            className=""
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <Input
            label="Password"
            name="password"
            placeholder="Enter your Password"
            className=""
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
          <Button type="submit" label={isSignInPage ? "Sign In" : "Sign Up"} />
        </form>
        <div>
          {isSignInPage ? "Didnt have an account" : " Already Have an Account"}
          <span
            className="text-blue-500 cursor-pointer underline"
            onClick={() =>
              navigate(`/users/${isSignInPage ? "sign_up" : "sign_in"}`)
            }
          >
            {isSignInPage ? "Sign Up" : "Sign In"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Form;
