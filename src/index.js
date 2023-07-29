import React, { useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { Button, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";

function BootstrapForm() {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [item, setItem] = useState(1);
  const [data, setData] = useState("");
  const textUsername = useRef();
  const selectItem = useRef();

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const checkEmail = (e) => {
    if (!isValidEmail(e.target.value)) {
      setEmailError("อีเมล์ไม่ถูกต้อง");
    } else {
      setEmailError("");
      setEmail(e.target.value);
    }
  };

  const checkUsername = () => {
    if (textUsername.current.value.length >= 4) {
      setUsername(textUsername.current.value);
      setUsernameError("");
    } else {
      setUsernameError("username  ต้องมีความยาว 4 ตัวอักษรขึ้นไป");
      setUsername("");
    }
  };

  const checkItem = () => {
    setItem(selectItem.current.value);
  };

  const submitData = () => {
    setData(username + " " + email + " " + item);
  };

  return (
    <form>
      <label htmlFor="username" className="form-label">
        Username
      </label>
      <input
        type="text"
        id="username"
        placeholder="username"
        ref={textUsername}
        className="form-control"
        onChange={checkUsername}
        required
      ></input>
      <h6 style={{ color: "red" }}>{usernameError}</h6>
      <label htmlFor="password" className="form-label">
        Password
      </label>
      <input
        type="password"
        id="password"
        placeholder="password"
        className="form-control"
        required
      ></input>
      <label htmlFor="email" className="form-label">
        E-mail
      </label>
      <input
        type="email"
        id="email"
        placeholder="your e-mail eg: someone@gmail.com"
        className="form-control"
        onBlur={checkEmail}
      ></input>
      <h6 style={{ color: "red" }}>{emailError}</h6>
      <label htmlFor="selectItem" className="form-label">
        Item
      </label>
      <select
        id="selectItem"
        className="form-select"
        ref={selectItem}
        onChange={checkItem}
      >
        <option value="1">Item 1</option>
        <option value="2">Item 2</option>
        <option value="3">Item 3</option>
      </select>
      <Button className="my-3" onClick={submitData}>
        Submit
      </Button>
      <h4>{data}</h4>
    </form>
  );
}

function HookForm() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const [data, setData] = useState("");

  return (
    <form
      onSubmit={handleSubmit((data) => {
        setData(firstName + " " + lastName);
      })}
    >
      <input
        type="text"
        {...register("firstName", { required: "ต้องใส่ข้อมูลในช่องนี้" })}
        placeholder="First Name"
      ></input>
      <p>{errors.firstName?.message}</p>
      <input
        type="text"
        {...register("lastName", {
          required: "ต้องใส่ข้อมูลในช่องนี้",
          minLength: { value: 4, message: "ต้องมีความยาว 4 ตัวอักษรขึ้นไป" },
        })}
        placeholder="Last Name"
      ></input>
      <p>{errors.lastName?.message}</p>
      <input type="submit" />
      <h4>{data}</h4>
    </form>
  );
}

function App() {
  return (
    <Container className="my-3">
      <BootstrapForm />
      <HookForm />
    </Container>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
