import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// cognito
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import UserPool from "../../UserPool/UserPool";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [isSend, setIsSend] = useState(false);
  const navigate = useNavigate();
  // get congnito user
  const getUser = () => {
    const user = new CognitoUser({
      Username: email,
      Pool: UserPool,
    });
    return user;
  };

  const handleSendCodeSubmit = (e) => {
    e.preventDefault();
    getUser().forgotPassword({
      onSuccess: (data) => {
        console.log(data);
      },
      onFailure: (err) => {
        console.log(err);
      },
      inputVerificationCode: (data) => {
        console.log(data);
        setIsSend(true);
      },
    });
  };
  const handleResetSubmit = (e) => {
    e.preventDefault();
    getUser().confirmPassword(code, password, {
      onSuccess: (data) => {
        console.log(data);
      },
      onFailure: (err) => {
        console.log(err);
      },
    });
  };

  return (
    <ThemeProvider theme={theme}>
      {!isSend && (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Email/Username
            </Typography>
            <Box
              component="form"
              onSubmit={handleSendCodeSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email/Username"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Send Code
              </Button>
            </Box>
          </Box>
        </Container>
      )}
      {isSend && (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset Password
            </Typography>
            <Box
              component="form"
              onSubmit={handleResetSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="code"
                label="Verification Code"
                name="code"
                autoComplete="code"
                autoFocus
                onChange={(e) => setCode(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                autoComplete="password"
                autoFocus
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Reset
              </Button>
            </Box>
          </Box>
        </Container>
      )}
    </ThemeProvider>
  );
}
