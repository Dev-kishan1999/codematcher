import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navbar";
const Profile = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(
      `http://g35-cloud.us-east-1.elasticbeanstalk.com/user/${localStorage.getItem(
        "email"
      )}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((err) => console.log("ERROR", err));
  }, []);
  if (!data) {
    return <h1>No data found</h1>;
  }
  return (
    <>
      <Navbar type="profile" />
      <section class="vh-100" style={{ "background-color": "#f4f5f7" }}>
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col col-lg-6 mb-4 mb-lg-0">
              <div class="card mb-3" style={{ "border-radius": "0.5rem" }}>
                <div class="row g-0">
                  <div
                    class="col-md-4 gradient-custom text-center text-white"
                    style={{
                      "border-top-left-radius": "0.5rem",
                      "border-bottom-left-radius": "0.5rem",
                    }}
                  >
                    <img
                      src={data.imgurl.S}
                      alt="Avatar"
                      class="img-fluid my-5"
                      style={{ width: "80px" }}
                    />
                  </div>
                  <div class="col-md-8">
                    <div class="card-body p-4">
                      <h6>Information</h6>
                      <hr class="mt-0 mb-4" />
                      <div class="row pt-1">
                        <div class="col-6 mb-3">
                          <h6>Email</h6>
                          <p class="text-muted">{data.email.S}</p>
                        </div>
                        <div class="col-6 mb-3">
                          <h6>Name</h6>
                          <p class="text-muted">{data.name.S}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
