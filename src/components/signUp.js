import React from 'react';
import {useFormik} from 'formik';
import axios from 'axios';
import {signUpSchema} from '../schemas';
import {useNavigate} from 'react-router-dom';

export default function SignUp(){
    const navigate = useNavigate();
    const [emailError, setEmailError] = React.useState(false)
    const [error, setError] = React.useState(false);
    async function onSubmit (e){
        e.preventDefault();

        console.log("error")
        const resp = await axios.get(`https://mditest.elifeamerica.com/api/v1/email/check/${values.email}`).catch((err)=>{
            console.log("error :"+err)
        })
        const emailExist = resp.data.result.exist;
        console.log(emailExist)
        if(emailExist){
            console.log("true")
            //e.preventDefault();
            setEmailError(true);
        }
        else if(!emailExist)
        {e.preventDefault();
           console.log("submitted");
        const response = await axios.post('https://mditest.elifeamerica.com/api/v1/register', values).catch((err)=>{
            setError(true)
            console.log("Error :"+err)
        });
        if(response){
            navigate('success-message');
        console.log(response.data); }
        }
        
    };
    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            mobile_number: "",
            dob: '1994-01-16',
            password: "",
            confirm_password:""
        },
        validationSchema: signUpSchema
    });
    React.useEffect(()=>{
        console.log("renderred")
    },[emailError])
    const {values, errors, handleBlur, handleChange, touched} = formik;
    return(
        <div className='contents'>
        <div className="signUp">
            <h1>Create Account</h1>
            <div>
                <form className="form" onSubmit={onSubmit}>
                    <h2>ABC COMPANY</h2>
                    {error && <p className="error">Please check your inputs</p>}
                    <p>First Name</p>
                    <input 
                    type="text"
                    id="first_name"
                    value={values.first_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.first_name && touched.first_name ? "input-error" : ""}
                    />
                    {errors.first_name && touched.first_name && <p className='error'>{errors.first_name}</p>}
                    <p>Second Name</p>
                    <input 
                    type="text"
                    id="last_name"
                    value={values.last_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.last_name && touched.last_name ? "input-error" : ""}
                    />
                    {errors.last_name && touched.last_name && <p className='error'>{errors.last_name}</p>}
                    <p>Email Address</p>
                    <input 
                    type="text"
                    id="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.email && touched.email ? "input-error" : ""}
                    />
                    {errors.email && touched.email && <p className='error'>{errors.email}</p>}
                    {emailError && <p className='error'>email already exists</p>}
                    <p>Mobile Number</p>
                    <input type="text" placeholder='+94' className='country-code'/>
                    <input 
                    type="text"
                    id="mobile_number"
                    value={values.mobile_number}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.mobile_number && touched.mobile_number ? "input-error" : ""}
                    />
                    {errors.mobile_number && touched.mobile_number && <p className='error'>{errors.mobile_number}</p>}
                    <p>Password</p>
                    <input 
                    type="text"
                    id="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.password && touched.password ? "input-error" : ""}
                    />
                    {errors.password && touched.password && <p className='error'>{errors.password}</p>}
                    <p>Password</p>
                    <input 
                    type="text"
                    id="confirm_password"
                    value={values.confirm_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.confirm_password && touched.confirm_password ? "input-error" : ""}
                    />
                    {errors.confirm_password && touched.confirm_password && <p className='error'>{errors.confirm_password}</p>}
                    <button>Create Account</button>
                </form>
            </div>
        </div>
        </div>
    )
}