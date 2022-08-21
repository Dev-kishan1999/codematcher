import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { LocalizationProvider, DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { useNavigate, useLocation } from "react-router-dom";
// UserPool
import UserPool from "../../UserPool/UserPool";
import axios from "axios";
// important for cloud

const theme = createTheme();

export default function Register() {
  const [birthdate, setBirthdate] = useState(new Date());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  //const [userData, setUserData] = useState([]);

  // Navigator
  const navigate = useNavigate();

  //location
  const location = useLocation();
  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, password, birthdate);

    const userAttributes = [
      {
        Name: "email",
        Value: email,
      },
      {
        Name: "name",
        Value: name,
      },
    ];
    // registering user to AWS Cognito
    const cognitoUser = UserPool.signUp(
      email,
      password,
      userAttributes,
      null,
      async (err, data) => {
        if (err) {
          console.log("Error:", err);
        }
        if (data) {
          // upload snippet to S3 bucket
          const formData = new FormData();
          formData.append("image", image);

          const uploadResponse = await axios.post(
            "http://g35-cloud.us-east-1.elasticbeanstalk.com/uploadpng",
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
          console.log("UPLOAD RESPONSE::", uploadResponse);

          // uploading linked data with user in dynamo

          //setUserData(data.user);
          let userData = {
            userSub: data.userSub,
            email,
            name,
            birthdate: birthdate.toDateString(),
            url: uploadResponse.data.Location,
          };

          let requestOption = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
          };

          // TODO:: pass userData to lambda to store in DynamoDB
          const response = await fetch(
            `https://g2j4h3gq5omgr5ujrez4iprnve0kltmx.lambda-url.us-east-1.on.aws/`,
            requestOption
          );
          if (response) {
            console.log("Response::", response);
            const subRes = await fetch(
              `https://3ow5v2vvip2cjof27cgp6agwze0qfvff.lambda-url.us-east-1.on.aws/`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: email,
                }),
              }
            );
            if (subRes) {
              console.log("SubRes::", subRes);
            }
            navigate("/");
          }
        }
      }
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="snippet"
                type="file"
                id="snippet"
                autoComplete="snippet"
                onChange={(e) => setImage(e.target.files[0])}
              />

              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Birth Date"
                  renderInput={(params) => <TextField {...params} />}
                  value={birthdate}
                  onChange={(date) => {
                    setBirthdate(date);
                  }}
                  margin="normal"
                />
              </LocalizationProvider>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <Link href="/" variant="body2">
                    {"Already have an account? Login"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
