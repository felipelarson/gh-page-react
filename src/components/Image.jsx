import React, { Component } from "react";
import {
  Card,
  CardMedia,
  Grid,
} from "@material-ui/core";

class Image extends Component {
  render() {
    return (
      <Grid container>
        {this.props.images.map((value, index) => {
          console.log("./assets/img/" + value);
          return (
            <Grid item lg={2} sm={12} key={index}>
              <Card className="file">
                <CardMedia
                  image={"./assets/img/" + value}
                  style={{ width: 80, height: 80 }}
                />
              </Card>
            </Grid>
          );
        })}
      </Grid>
    );
  }
}

export default Image;
