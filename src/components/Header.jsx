import React, { Component } from "react";
import $ from "jquery";
//import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  },
})(TextField);

class Header extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
  }

  fileInput(event) {
    let file = event.target.files[0];
    let fileName = file.name;
    this.props.addFile(fileName);
    $("#new-file-box").hide();
  }

  search(event) {
    let term = $(event.target).val();
    this.props.searchFile(term);
    $(".folder-link").removeClass("active-folder");
  }

  render() {
    return (
      <div className="header">
        <div className="header-left">
          <h2>
            Album atual: <span id="folder-name">{this.props.folderName}</span>
          </h2>
        </div>
        <div className="header-right">
          <div id="search-form">
            <CssTextField
              id="search"
              label="Buscar pasta"
              type="search"
              variant="outlined"
              placeholder="Buscar pasta"
              onChange={this.search}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
