import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {removeToken} from '../redux/actions/tokenActions';

export default function NavBar(){
  const [navData, setNavData] = React.useState([]);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.allToken.token);
  const { token_type, access_token } = token;
  const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/laravel-product-list-frontend.appspot.com/o/images%2Fimages.png?alt=media&token=c976d938-ad68-4948-bd93-d4dc8661a40e';
  const navigate = useNavigate();
  function handleEdit(){
    navigate('edit-profile')
  };
  async function handleLogOut(){
    const response = await axios
      .get("https://mditest.elifeamerica.com/api/v1/logout", {
        headers: { Authorization: `${token_type} ${access_token}` },
      })
      .catch((err) => {
        console.log("errors :" + err);
      });
      if(response){
        dispatch(removeToken(response.data));
        navigate('/')
      }
  }
  async function getNavData(){
    const response = await axios
      .get("https://mditest.elifeamerica.com/api/v1/profile", {
        headers: { Authorization: `${token_type} ${access_token}` },
      })
      .catch((err) => {
        console.log("errors :" + err);
      });
      if(response){
      const {full_name, profile_image} = response.data.result
      console.log(response.data.result)
      console.log(profile_image.thumb)
      setNavData({
        name: full_name,
        image: profile_image.thumb
      });}
  }
  React.useEffect(()=>{
    getNavData();
  },[])
    return (
      <nav className="navBar">
        <h1>ABC COMPANY</h1>

        {/* <div className="right-f"> */}
        <h2>{navData.length !== 0 ? navData.name : ""}</h2>
          <div className="dropdown">
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              id='drop-btn'
              data-toggle="dropdown"
            >
              <img src={navData.length == 0 ? defaultImage : navData.image} alt="dropdown image" className='nav-img'/>
              <span class="caret"></span>
            </button>
            <ul class="dropdown-menu">
              <li>
                <p onClick={handleEdit}>Edit profile</p>
              </li>
              <li>
                <p onClick={handleLogOut}>Log Out</p>
              </li>
            </ul>
          {/* </div> */}
          </div>
      </nav>
    );
}