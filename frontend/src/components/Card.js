import React, { Component } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import EditIcon from "@mui/icons-material/Edit";

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: this.props.quantity };
  }
  handleIncrement = () => {
    this.setState({ counter: this.state.counter + 1 });
  };

  handleDecrement = () => {
    this.setState({ counter: this.state.counter - 1 });
  };
  render() {
    return (
      <Paper
        sx={{
          p: 2,
          margin: " 4px auto",
          maxWidth: "90%",
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sm
            container
            spacing={2}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid item xs>
              <Grid item xs>
                <Typography gutterBottom variant="h6" component="div">
                  {this.props.itemname}
                </Typography>
                <Typography variant="subtitle1" component="div">
                  Price:- ₹{this.props.price}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="subtitle1" component="div">
                <ButtonGroup
                  variant="contained"
                  aria-label="outlined primary button group"
                >
                  <Button
                    disabled={this.state.counter < 1}
                    onClick={this.handleDecrement}
                  >
                    -
                  </Button>
                  <Button>{this.state.counter}</Button>
                  <Button onClick={this.handleIncrement}>+</Button>
                </ButtonGroup>
              </Typography>
            </Grid>
            <Grid item style={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ cursor: "pointer" }} variant="body2">
                <Stack direction="column" spacing={0.5}>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<InfoIcon fontSize="inherit" />}
                  >
                    Show Details
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<EditIcon fontSize="inherit" />}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<DeleteIcon fontSize="inherit" />}
                  >
                    Delete
                  </Button>
                </Stack>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}
