import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import "./Card2.css";

const Card2 = ({ data }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("http://g35-cloud.us-east-1.elasticbeanstalk.com/allusers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setUsers(result);
      });
  }, []);

  const swiped = (direction, name, email) => {
    console.log("removing:" + name + " to: " + direction);
    // add to liked array
    // fetch('http://localhost:5000/updatelikes',{
    //   method:'POST',
    //   headers:{
    //     'Content-Type':'application/json'
    //   },
    //   body:JSON.stringify({
    //     email,  // user in the card
    //     sEmail:localStorage.getItem("email") //loggin user
    //   })
    // }).then(response=>response.json()).then(result=>console.log(result)).catch(err=>console.log(err))

    // lamda to put like data
    if (direction === "right") {
      console.log("RIGHT");
      fetch(
        `https://rzxbhhrf3bjtcz2lxp2q5denv40dqoau.lambda-url.us-east-1.on.aws/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: localStorage.getItem("email"),
            sEmail: email,
          }),
        }
      )
        .then((response) => response.json())
        .then((result) => {
          console.log("DATA:", data);
          if (data.includes(email)) {
            // sns service will be here
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const outOfFrame = (name) => {
    console.log("left: " + name);
  };
  if (!users) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="tinderCard">
      <div className="tinderCard__cardContainer">
        {users.map((user, index) => {
          return (
            <TinderCard
              className="swipe"
              key={index}
              preventSwipe={["up", "down"]}
              onSwipe={(dir) => swiped(dir, user.name.S, user.email.S)}
              onCardLeftScreen={() => outOfFrame(user.name.S)}
            >
              <div
                style={{ backgroundImage: `url('${user.imgurl.S}')` }} //https://codematcherprofile.s3.amazonaws.com/dd3746b70824045d558a66161f40f25b.png
                className="card"
              >
                <meta name="referrer" content="same-origin" />

                <h3>{user.name.S}</h3>
              </div>
            </TinderCard>
          );
        })}
      </div>
    </div>
  );
};

export default Card2;
