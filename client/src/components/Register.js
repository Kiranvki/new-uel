import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";



export default function Register() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    conPassword: "",
  });

  const { name, lname, email, password, conPass } = values;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/register`, { ...values }).then((res) => {
        if (res) {
          
        } else {
          console.log("response is nt found");
        }
      });
    } catch (err) {
      // console.log("err kiran:>> ", err);
    }
  };

  return (
    <>
      <div>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fiName">First Name</label>
            <input
              type="text"
              name="firstName"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="LName">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={lname}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="Confrim">Confrim Password</label>
            <input
              type="password"
              name="conPassword"
              value={conPass}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
}
