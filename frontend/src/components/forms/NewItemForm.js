import React, { Component } from "react";

import {
  Grid,
  Box,
  Typography,
  Container,
  Button,
  TextField,
  Toolbar,
  CssBaseline,
} from "@mui/material/";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

const theme = createTheme();
export default class NewItemForm extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Toolbar />
            <Typography component="h1" variant="h5">
              Add New Item
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={this.handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="Item_name"
                    label="Item Name"
                    name="Item_name"
                    autoComplete="Item_name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel required htmlFor="outlined-adornment-price">
                      Price
                    </InputLabel>
                    <OutlinedInput
                      type="number"
                      required
                      id="outlined-adornment-price"
                      variant="standard"
                      startAdornment={
                        <InputAdornment position="start">₹</InputAdornment>
                      }
                      label="price"
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="number"
                    name="Quantity"
                    label="Quantity"
                    id="Quantity"
                    autoComplete="Quantity"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    );
  }
}
