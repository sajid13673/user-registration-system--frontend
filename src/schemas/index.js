import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
export const loginSchema = yup.object().shape({
    username: yup.string().email("Please enter a valid email").required("Required"),
    password: yup.string().required("Required")
});
export const signUpSchema = yup.object().shape({
    first_name: yup.string()
    .required("Required"),
    last_name: yup.string()
    .required("Required"),
    email: yup.string()
    .email("Please enter a valid email")
    .required("Required"),
    mobile_number: yup.string()
    .matches(/^[0-9]+$/, "Please enter a valid phone number")
    .min(10, 'Must be exactly 10 digits')
    .max(10, 'Must be exactly 10 digits'),
    password: yup.string() //add validation
    .required("Required").matches(passwordRules, { message: "Please enter a stronger password" }),
    confirm_password: yup.string()
    .oneOf([yup.ref("password"),null],"Passwords must match")
    .required("Required")
});
export const editProfileSchema = yup.object().shape({
    first_name: yup.string()
    .required("Required"),
    last_name: yup.string()
    .required("Required"),
    email: yup.string()
    .email("Please enter a valid email")
    .required("Required"),
    gender: yup.string()
    .required("Required"),
    dob: yup.string().required()
})