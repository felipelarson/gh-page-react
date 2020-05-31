import React, { Component } from "react";
import $ from "jquery";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import PermMediaIcon from "@material-ui/icons/PermMedia";
import { Button, Typography, Box } from "@material-ui/core";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  showForm() {
    $("#new-folder-form").show();
    $("#new-folder-field").focus();
  }

  submitForm(e) {
    e.preventDefault();
    let folderName = $("#new-folder-field").val();
    //this.props.folders.push({ name: folderName, files: [] });
    this.props.addFolder(folderName);
    $("#new-folder-field").val("");
    $("#new-folder-form").hide();
  }

  removeFolder(index, event) {
    event.stopPropagation();
    this.props.deleteFolder(index);
  }

  showFolder(index, event) {
    this.props.loadFiles(index);
    $(".folder-link").removeClass("active-folder");
    $(event.target).addClass("active-folder");
    $(".work-button").css({ display: "inline-block" });
  }

  render() {
    return (
      <div className="sidebar">
        <Box border={1} style={{padding: 20, backgroundColor:'#fff'}}>
          <Typography variant="h4" component="h1" align="center">
            Album de Fotografias
          </Typography>
        </Box>

        <Typography variant="h1" component="h2" align="center">
          ALBUNS
        </Typography>

        <div className="folder-list" id="folder-list"></div>

        {this.props.folders.map((value, index) => {
          return (
            <div key={index}>
              <Button
                fullWidth
                disableElevation
                variant="contained"
                className={"folder-link"}
                startIcon={<PermMediaIcon />}
                onClick={this.showFolder.bind(this, index)}
              >
                {value.name}
              </Button>

              <Button
                style={{ height: 18, marginBottom: 10 }}
                fullWidth
                disableElevation
                color="secondary"
                variant="contained"
                className="file-delete"
                onClick={this.removeFolder.bind(this, index)}
              >
                <DeleteOutlineIcon style={{ fontSize: 16 }} />
              </Button>
            </div>
          );
        })}

        <div id="new-folder" onClick={this.showForm}>
          <Button
            fullWidth
            disableElevation
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
          >
            Adicionar Album
          </Button>
          <form id="new-folder-form" onSubmit={this.submitForm}>
            <input
              type="text"
              id="new-folder-field"
              placeholder="Nome do Album"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Sidebar;
