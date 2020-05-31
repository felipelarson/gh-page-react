import React from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import FileList from "./components/FileList";
import "./assets/css/main.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      folders: [],
      files: [],
      currentFolder: false,
      folderName: "",
    };

    this.addFolder = this.addFolder.bind(this);
    this.deleteFolder = this.deleteFolder.bind(this);
    this.updateStorage = this.updateStorage.bind(this);
    this.loadFiles = this.loadFiles.bind(this);
    this.addFile = this.addFile.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
    this.searchFile = this.searchFile.bind(this);
  }

  /*
   * After Mount
   */
  componentDidMount() {
    if (localStorage.getItem("folders")) {
      this.setState({ folders: JSON.parse(localStorage.getItem("folders")) });
    }
  }

  /*
   * Add Folders
   */
  addFolder(folderName) {
    let folders = this.state.folders;
    folders.push({ name: folderName, files: [] });
    this.setState({ folders: folders });
    this.updateStorage();
  }

  /*
   * Delete Folder
   */
  deleteFolder(key) {
    key = parseInt(key);
    let folders = this.state.folders;
    folders.splice(key, 1);
    this.setState({ folders: folders });
    this.updateStorage();
  }

  /*
   * update localStorage
   */
  updateStorage() {
    let json = JSON.stringify(this.state.folders);
    localStorage.setItem("folders", json);
  }

  /*
Load Files
*/
  loadFiles(index) {
    let folders = this.state.folders;
    this.setState({
      files: folders[index].files,
      folderName: folders[index].name,
      currentFolder: index,
    });
  }

  /*
   * Add File
   */
  addFile(fileName) {
    let folders = this.state.folders;
    folders[this.state.currentFolder].files.push(fileName);
    this.setState({
      folders: folders,
      files: folders[this.state.currentFolder].files,
    });
    this.updateStorage();
  }

  /*
   * DeleteFile
   */
  deleteFile(index) {
    let folders = this.state.folders;
    folders[this.state.currentFolder].files.splice(index, 1);
    this.setState({
      folders: folders,
      files: folders[this.state.currentFolder].files,
    });
    this.updateStorage();
  }

  /*
   * Search File
   */
  searchFile(term) {
    this.setState({ currentFolder: false, folderName: "Search" });

    var found = [];
    this.state.folders.forEach(function (item) {
      item.files.forEach(function (file) {
        if (file.indexOf(term) !== -1) {
          found.push(file);
        }
      });
    });
    this.setState({ files: found });
  }

  /*
   * Render
   */
  render() {
    return (
      <div className="main-container">
        <div className="column-left">
          <Sidebar
            folders={this.state.folders}
            addFolder={this.addFolder}
            deleteFolder={this.deleteFolder}
            loadFiles={this.loadFiles}
          />
        </div>

        <div className="column-right">
          <Header
            folderName={this.state.folderName}
            addFile={this.addFile}
            searchFile={this.searchFile}
          />

          <div className="work-area" lg={4}>
            <FileList files={this.state.files} deleteFile={this.deleteFile} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
