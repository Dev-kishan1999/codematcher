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
const theme = createTheme();
const AdminPage = () => {
  const [message, setMessage] = useState("");

  const clickHandler = async () => {
    fetch(
      "https://ul2z2j3natx7d4caiwvevygwc40pvuzj.lambda-url.us-east-1.on.aws/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
        }),
      }
    )
      .then((resp) => resp.json())
      .then((result) => console.log("Result:", result))
      .catch((err) => console.error("ERROR:", err));
  };
  return (
    <ThemeProvider theme={theme}>
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
          <Typography component="h1" variant="h5">
            ADMIN
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Content of Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setMessage(e.target.value)}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => clickHandler()}
            >
              SEND
            </Button>
          </Box>
        </Box>
      </Grid>
    </ThemeProvider>
  );
};

export default AdminPage;
