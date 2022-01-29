import React, { useEffect } from "react";
import Input from "../../common/Input.js";
import * as Yup from "yup";
import "../Login/login.css";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { signupUser } from "./../../services/signupService";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { useAuthActions, useAuth } from "./../../Providers/AuthProvider";
import { useQuery } from "./../../hooks/useQuery";
const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  passwordConfirm: "",
};

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is Required")
    .min(4, "Name length is too short"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is Required"),
  phoneNumber: Yup.string()
    .required("Phone Number is Required")
    .matches(/^[0-9]{11}$/, "Phone Number should be 11 digit"),
  password: Yup.string().required("Password is Required"),
  passwordConfirm: Yup.string().test(
    "password-match",
    "Password must match",
    function (value) {
      return this.parent.password === value;
    }
  ),
});

function SignupForm({ history }) {
  const query = useQuery();
  const redirect = query.get("redirect") || "/";
  const setAuth = useAuthActions();
  const auth = useAuth();

  useEffect(() => {
    if (auth) {
      history.push(redirect);
    }
  }, [redirect, auth]);
  const onSubmit = async (values) => {
    const { name, email, phoneNumber, password } = values;

    const userData = {
      name,
      email,
      phoneNumber,
      password,
    };
    console.log(userData);
    try {
      const { data } = await signupUser(userData);
      toast.success("Thanks for signing up");
      history.push(redirect);
      setAuth(data);
      // localStorage.setItem("authState", JSON.stringify(data));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });
  return (
    <div className="container form-container font-face-light">
      <form className="form" onSubmit={formik.handleSubmit}>
        <Input label="Name" name="name" formik={formik} />
        <Input label="Email" name="email" formik={formik} />
        <Input
          label="Phone Number"
          name="phoneNumber"
          formik={formik}
          type="tel"
        />
        <Input
          label="Password"
          name="password"
          formik={formik}
          type="password"
        />
        <Input
          label="Password Confirmation"
          name="passwordConfirm"
          formik={formik}
          type="password"
        />
        <div className="buttons">
          <button type="submit" disabled={!formik.isValid}>
            submit
          </button>
          {/* <button onClick={() => setFormData(savedData)}>Load Data</button> */}
        </div>
        <Link to={`/login?redirect=${redirect}`}>
          <p>Already Login?</p>
        </Link>
      </form>
    </div>
  );
}

export default withRouter(SignupForm);
