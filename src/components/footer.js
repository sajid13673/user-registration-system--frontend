import React from 'react';
import {useNavigate} from 'react-router-dom';

export default function Footer(){
    return(
        <div className="footer">
            <p>Versio 1.0</p>
            <p className='about'>About us</p>
            <p>Privacy</p>
            <p>Terms</p>
        </div>
    )
}