import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

//User pool
import UserPool from "../../UserPool/UserPool";
import { useLocation } from "react-router-dom";

const theme = createTheme();

const Verification = (props) => {
  const [code, setCode] = useState("");
  const { state } = useLocation();
  const username = state.username;
  console.log("USER:::::::", username);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("USERNAME::::", username);
    UserPool.confirmSignUp(username, code, (err, data) => {
      if (err) {
        console.log("Error:", err);
      }
      if (data) {
        console.log("Data:", data);
      }
    });
  };

  return (
    <ThemeProvider theme={theme}>
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
            Verification
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
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

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Verify
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Verification;
