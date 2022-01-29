import { useFormik } from "formik";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import Input from "../../common/Input";
import http from "../../services/httpServices";
import "./login.css";
import { loginUser } from "./../../services/loginService";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { useAuth, useAuthActions } from "./../../Providers/AuthProvider";
import { useQuery } from "./../../hooks/useQuery";
import "../../";
const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is Required"),

  password: Yup.string().required("Password is Required"),
});

function LoginForm({ history }) {
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
    console.log(values);
    try {
      const { data } = await loginUser(values);
      toast.success("sign in successfuly");
      history.push(redirect);
      setAuth(data);
      // localStorage.setItem("authState", JSON.stringify(data));
    } catch (error) {
      console.log(error.response.data.message);
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
        <Input label="Email" name="email" formik={formik} />
        <Input
          label="Password"
          name="password"
          formik={formik}
          type="password"
        />
        <div className="buttons">
          <button type="submit" disabled={!formik.isValid}>
            Log In
          </button>
          {/* <button onClick={() => setFormData(savedData)}>Load Data</button> */}
        </div>
        <Link className="" to="/signup">
          <p>Create account?</p>
        </Link>
      </form>
    </div>
  );
}

export default withRouter(LoginForm);
