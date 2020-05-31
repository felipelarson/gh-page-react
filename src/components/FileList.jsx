import React, { Component } from "react";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import { Grid, Button, FormControl, Input } from "@material-ui/core";

import Draggable from "react-draggable";
import $ from "jquery";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import PermMediaIcon from "@material-ui/icons/PermMedia";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

class FileList extends Component {
  constructor(props) {
    super(props);
    this.fileInput = this.fileInput.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  showForm() {
    $("#new-folder-form").show();
    $("#new-folder-field").focus();
  }

  showFileBox(index, event) {
    event.stopPropagation();
    this.props.loadFiles(index);
    event.stopPropagation();
    $("#new-file-box").show();
  }

  closeAlbum(e) {
    e.stopPropagation();
    $("#new-file-box").hide();
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

  removeFile(index) {
    this.props.deleteFile(index);
  }

  fileInput(event) {
    let file = event.target.files[0];
    let fileName = file.name;
    this.props.addFile(fileName);
  }

  state = {
    activeDrags: 0,
    deltaPosition: {
      x: 0,
      y: 0,
    },
    controlledPosition: {
      x: 0,
      y: 0,
    },
  };

  handleDrag = (e, ui) => {
    const { x, y } = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      },
    });
    console.log(e);
  };

  // onStart = () => {
  //   this.setState({ activeDrags: ++this.state.activeDrags });
  // };

  // onStop = () => {
  //   this.setState({ activeDrags: --this.state.activeDrags });
  // };

  // For controlled component
  adjustXPos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { x, y } = this.state.controlledPosition;
    this.setState({ controlledPosition: { x: x - 10, y } });
  };

  adjustYPos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { controlledPosition } = this.state;
    const { x, y } = controlledPosition;
    this.setState({ controlledPosition: { x, y: y - 10 } });
  };

  onControlledDrag = (e, position) => {
    const { x, y } = position;
    this.setState({ controlledPosition: { x, y } });
  };

  onControlledDragStop = (e, position) => {
    this.onControlledDrag(e, position);
    this.onStop();
  };

  render() {
    const dragHandlers = { onStart: this.onStart, onStop: this.onStop };
    // const { deltaPosition, controlledPosition } = this.state;

    return (
      <Grid container id="file-list" className="box">
        <div className="folder-list" id="folder-list"></div>
        {this.props.folders.map((value, index) => {
          //console.log(index +" = "+ value.files);
          return (
            <div key={index} style={{ margin: 10 }}>
              <div id="new-file-box">
                <Draggable {...dragHandlers}>
                  <div className="file-box-content">
                    <div className="file-box-title">
                      {this.props.folderName}
                      <HighlightOffIcon onClick={this.closeAlbum} />
                    </div>
                    <FormControl id="new-file-form">
                      <Input
                        name="userfile[]"
                        type="file"
                        id="file"
                        aria-describedby="my-helper-text"
                        onChange={this.fileInput}
                      />
                    </FormControl>
                    

                    <Grid container id="file-list">
                      {this.props.files.map((value, index) => {
                        return (
                          <Grid item lg={2} md={4} key={index}>
                            <a
                              href={require("../assets/img/" + value)}
                              className="file"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={require("../assets/img/" + value)}
                                alt=""
                              />
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  width: "100%",
                                  alignItens: "center",
                                }}
                              >
                                <h6 className="file-text">{value}</h6>
                                <DeleteForeverIcon
                                  color="secondary"
                                  onClick={this.removeFile.bind(this, index)}
                                  style={{ fontSize: "16px", marginTop: "5px" }}
                                />
                              </div>
                            </a>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </div>
                </Draggable>
              </div>

              <Button
                style={{ background: "#5444e0", minWidth: 100 }}
                variant="contained"
                className={"folder-link"}
                startIcon={<PermMediaIcon />}
                onClick={this.showFileBox.bind(this, index)}
                //onClick={this.showFolder.bind(this, index)}
              >
                {value.name}
              </Button>

              <Button
                style={{ height: 14 }}
                disableElevation
                variant="contained"
                className="file-delete"
                onClick={this.removeFolder.bind(this, index)}
              >
                <DeleteOutlineIcon
                  style={{ fontSize: 14, color: "gray", width: "50%" }}
                />
              </Button>
            </div>
          );
        })}
        <div id="new-folder" onClick={this.showForm}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
          >
            Album
          </Button>
          <form id="new-folder-form" onSubmit={this.submitForm}>
            <input
              type="text"
              id="new-folder-field"
              placeholder="Nome do Album"
              style={{ border: "1px solir #fff" }}
            />
          </form>
        </div>
      </Grid>
    );
  }
}

export default FileList;
