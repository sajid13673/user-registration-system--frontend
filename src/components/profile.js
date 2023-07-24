import React from 'react';
import Navbar from "./navbar";
import {useSelector} from "react-redux";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export default function Profile(){
  const [user, setUser] = React.useState([]);
  const navigate = useNavigate();
  const token = useSelector((state) => state.allToken.token);
  const { token_type, access_token } = token;
  const defaultImage =
    "https://firebasestorage.googleapis.com/v0/b/laravel-product-list-frontend.appspot.com/o/images%2Fimages.png?alt=media&token=c976d938-ad68-4948-bd93-d4dc8661a40e";

  const profile = (
    <div className="profile-container">
      <div className="profile-header">
        <img src={user.length == 0 || user.profile_image.thumb == undefined ? defaultImage : user.profile_image.thumb} alt="profile-pic" className="profile-pic" />
        <div class="image-upload">
          <label for="file-input">
            <i class="fa-solid fa-plus fa-xl"></i>
          </label>
          <input id="file-input" type="file" onChange={handleChange}/>
        </div>
        <div className='greet'>
        <h1>Welcome</h1>
        <p className="profile-name-text">
          {user.gender === "male" ? "Mr." : "Ms"} {user.full_name}
        </p>
        </div>
      </div>
      <div className="profile-info">
        <div className="detail">
          <p>E Mail Address</p>
          <p>Name</p>
          <p>Gender</p>
          <p>Date Of Birth</p>
        </div>
        <div className="info">
          <p>{user.email}</p>
          <p>{user.full_name}</p>
          <p>{user.gender}</p>
          <p>{user.dob}</p>
        </div>
      </div>
    </div>
  );
  const empty = <h1>...loading</h1>;
  async function getUser() {
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
        console.log("errors :" + err);
      });
    console.log(response.data.result);
    setUser(response.data.result);
    }
  };
  const formData = new FormData();

  async function handleChange(e){
    console.log("changed")
    const file = e.target.files[0];
    formData.append("profile_image",file);
    console.log("fData :"+formData)
    const headers = {
      Authorization: `${token_type} ${access_token}`,
    };
    const response = await axios
      .put("https://mditest.elifeamerica.com/api/v1/profile", formData, {
        headers,
      })
      .catch((err) => console.log("Failed to upload" + err));
      if(response){
        console.log("success :"+response)
        getUser();

      }
  }
  React.useEffect(() => {
    getUser();
    console.log("user got");
  }, []);
  return (
    <div>
      <Navbar/>
    <div className="user-contents">
      <div>
        <div className="profile">{user.length !== 0 ? profile : empty}</div>
      </div>
    </div>
    </div>
  );
}