import React from 'react';
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import {useDispatch} from 'react-redux';
import {setUser} from '../redux/actions/userActions';
import {setToken} from '../redux/actions/tokenActions';
import {useFormik} from 'formik';
import {loginSchema} from '../schemas';

function Login () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = React.useState(false);
    function handleClick(){
        navigate('sign-up')
    };
    async function onSubmit(e){ 
        e.preventDefault();
        const response = await axios.post("https://mditest.elifeamerica.com/oauth/token", formik.values)
        .catch((err)=>{console.log("err :"+err)
                        setError(true);
                        });
        if(response){
        dispatch(setToken(response.data));
        navigate('profile')
    }
    }


    const formik = useFormik({
        initialValues: {
            username: "",
            password:"",
            client_id: 4,
            client_secret: "sfQfhp6tDeGvEp7ZhVwk0MjbpaP55tJ1oJAKuZAE",
            scope: "",
            grant_type: "password"
        },
        validationSchema: loginSchema,
        onSubmit
    });

    return(
        <div className='contents'>
        <div className="login">
            <h1>Welcome Back</h1>
            <p className="login-text">Login to your accout</p>
            
            <div className="form">
                <h2>ABC COMPANY</h2>
                {error && <p className="error">Invalid username or password</p>}
                <form onSubmit={onSubmit}>
                <p>User Name</p>
                <input 
                type="email"
                value={formik.values.username}
                onChange={formik.handleChange}
                id='username'
                onBlur={formik.handleBlur}
                className={formik.errors.username && formik.touched.username ? "input-error" : ""}
                //name='username'
                />
                {formik.errors.username && formik.touched.username && <p className='error'>{formik.errors.username}</p>}
                <p>Password</p>
                <input 
                type="text"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                id='password'
                className={formik.errors.password && formik.touched.password ? "input-error" : ""}
                //name='password'
                />
                {formik.errors.password && formik.touched.password && <p className='error'>{formik.errors.username}</p>}
                <button className="btn-login">Login</button>
                </form>
            <p>Still have no account ? <a onClick={handleClick} >SIGNUP</a> Now</p>
            </div>
        </div>
        </div>
    )
};
export default Login;