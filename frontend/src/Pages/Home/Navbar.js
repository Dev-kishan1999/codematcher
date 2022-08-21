import React from "react";
import "./Navbar.css";
import IconButton from "@mui/material/IconButton";
import PersonIcon from "@mui/icons-material/Person";
import {useNavigate} from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
const Navbar = ({type}) => {
  const navigate = useNavigate();
  if(type === 'home'){
  return (
    <div className="navbar">
      <IconButton onClick={()=>navigate('/profile')}>
        <PersonIcon fontSize="large" className="navbar__icon" />
      </IconButton>
    </div>
  );
  } else {
    return (
    <div className="navbar">
      <IconButton onClick={()=>navigate('/home')}>
        <HomeIcon fontSize="large" className="navbar__icon" />
      </IconButton>
    </div>
  );
  }
};

export default Navbar;
