import React, { useState } from "react";
import "./SwipeButton.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import IconButton from "@mui/material/IconButton";

const SwipeButton = () => {
  return (
    <div className="swipeButton">
      <div>
        <IconButton className="swipeButton__left" aria-label="share">
          <CancelOutlinedIcon fontSize="large" />
        </IconButton>
        <IconButton
          className="swipeButton__right"
          aria-label="add to favorites"
        >
          <FavoriteIcon fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
};

export default SwipeButton;
