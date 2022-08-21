import React, { useEffect, useState } from "react";
import Card2 from "./Card2";
import SwipeButton from "./SwipeButton";
import "../../App.css";
import Navbar from "./Navbar";
const Home = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(
      `http://g35-cloud.us-east-1.elasticbeanstalk.com/getlikes/${localStorage.getItem(
        "email"
      )}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="App">
      <Navbar type="home" /> <Card2 data={data} /> <SwipeButton />
    </div>
  );
};

export default Home;
