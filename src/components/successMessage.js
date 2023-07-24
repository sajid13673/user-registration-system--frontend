import React from 'react';
import {useNavigate} from 'react-router-dom';

export default function SuccessMessage(){
    const navigate = useNavigate();
    function handleClick(){
        navigate('/');
    }
    return(
        <div className='contents'>
        <div className="SuccessMessage">
        <i class="fa-regular fa-circle-check fa-2xl" ></i>
            <h1>Congragulations</h1>
            <p>Your Account has been created succesfully</p>
            <button onClick={handleClick}>Go to Login</button>
        </div>
        </div>
    )
}