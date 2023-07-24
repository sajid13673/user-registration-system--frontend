import React from "react";
import Navbar from "./navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { editProfileSchema } from "../schemas";
import { useSelector } from "react-redux";

export default function EditProfile() {
  const token = useSelector((state) => state.allToken.token);
  const navigate = useNavigate();
  const [error, setError] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      dob: "",
      gender: "",
      email: "",
    },
    validationSchema: editProfileSchema
});
  const { values, errors, handleBlur, handleChange, touched } = formik;
  const { token_type, access_token } = token;

  async function onSubmit(e) {
    e.preventDefault();
    const headers = {
      Authorization: `${token_type} ${access_token}`,
    };
    const response = await axios
      .put("https://mditest.elifeamerica.com/api/v1/profile", values, {
        headers,
      })
      .catch((err) => setError(true));
    if (response) {
      console.log("updated :" + response);
      navigate(-1);
    }
  }
    async function getProfile() {
      if(access_token == undefined){
        navigate('/')
        alert("Please login")
      }
      else{
    const response = await axios
      .get("https://mditest.elifeamerica.com/api/v1/profile", {
        headers: { Authorization: `${token_type} ${access_token}` },
      })
      .catch((err) => {
        console.log("error :" + err);
      });
    if (response) {
      const { first_name, email, gender, dob } = response.data.result;
      formik.setFieldValue("first_name", first_name);
      formik.setFieldValue("email", email);
      formik.setFieldValue("gender", gender);
      formik.setFieldValue("dob", dob);
    }
  }
  };
  React.useEffect(() => {
    getProfile();
  }, []);
return(
       <div>
      <Navbar />
      <div className="user-contents">
        <div className="editProfile">
          {/* /<Navbar /> */}
          <div className="editForm">
            <form className="form" onSubmit={onSubmit}>
              <h2>Edit Profile</h2>
              {error && <p className="error">Please check your inputs</p>}
              <p>First Name</p>
              <input
                type="text"
                id="first_name"
                value={values.first_name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.first_name && touched.first_name ? "input-error" : ""
                }
              />
              <p>Second Name</p>
              <input
                type="text"
                id="last_name"
                value={values.last_name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errors.last_name && touched.last_name ? "input-error" : ""
                }
              />
              <p>Email Address</p>
              <input
                type="email"
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.email && touched.email ? "input-error" : ""}
              />
              <p>Gender</p>
              <select
                id="gender"
                value={values.gender}
                onChange={handleChange}
                onBlur={handleBlur}
                className="gender-select"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <p>Date of Birth</p>
              <input
                type="text"
                id="dob"
                value={values.dob}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.dob && touched.dob ? "input-error" : ""}
              />

              <button type="submit">Update profile Details</button>
            </form>
          </div>
        </div>
      </div>
    </div>
)
}