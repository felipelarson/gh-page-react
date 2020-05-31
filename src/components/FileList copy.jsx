import React, { Component } from "react";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import ImageIcon from "@material-ui/icons/Image";
import {
  IconButton,
  Card,
  CardMedia,
  CardContent,
  Grid,
} from "@material-ui/core";

class FileList extends Component {
  removeFile(index) {
    this.props.deleteFile(index);
  }

  render() {
    return (
      <Grid container id="file-list">
        {this.props.files.map((value, index) => {
          return (
            <Grid item lg={3} sm={12} key={index}>
              <Card className="file" >
                <IconButton className="file-name">
                  <ImageIcon />
                </IconButton>
                <CardMedia image="{}" />
                <CardContent>
                  <a href={"img/" + value}>{value}</a>
                </CardContent>
                <IconButton
                  variant="contained"
                  color="secondary"
                  className="file-delete"
                  onClick={this.removeFile.bind(this, index)}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    );
  }
}

export default FileList;
