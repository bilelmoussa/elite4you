import React, { Component } from 'react'
import './Upload.scss';
import Dropzone from '../dropzone/Dropzone';
import Progress from '../progress/Progress';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline'
import {Button} from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';

export default class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            uploading: false,
            uploadProgress: {},
            successfullUploaded: false
        };

        this.uploadFiles = this.uploadFiles.bind(this);

    }

    onFilesAdded = (files) => {
        let key_id  = 0;
        if(this.state.files.length === 0){
          key_id = this.state.files.length;
        }else{
          key_id = this.state.files[this.state.files.length - 1].id +1;
        }


        files.forEach((file)=>{
          file.id = key_id;
          key_id++;
        });

        this.setState(prevState => ({
          files: prevState.files.concat(files)
        }));
        if (this.props.onFilesAdded) {
          this.props.onFilesAdded(files);
        }
    }

    renderProgress = (file) => {
        const uploadProgress = this.state.uploadProgress[file.name];
        if (this.state.uploading || this.state.successfullUploaded) {
          return (
            <div className="ProgressWrapper">
              <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
              <CheckCircleOutline 
                className="CheckIcon"
                style={{
                    opacity:
                      uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
                }}
              />
            </div>
          );
        }
    }

  renderActions = () => {
        if (this.state.successfullUploaded) {
          return (
            <Button
              onClick={() =>
                this.setState({ files: [], successfullUploaded: false })
              }
              color="primary"
              variant="contained"
              className="upload_btn"
            >
              Clear
            </Button>
          );
        } else {
          if(this.state.files.length === 0 || this.state.uploading){
            return(
              <Button
                className="upload_btn"
                onClick={this.uploadFiles}
                disabled 
                color="primary"
                variant="contained"
              >
              Upload
            </Button>
            )
          }else{
            return(
              <Button
                className="upload_btn"
                onClick={this.uploadFiles}
                color="primary"
                variant="contained"
              >
              Upload
            </Button>
            )
          }

        }
    }

    async uploadFiles(){
        this.setState({ uploadProgress: {}, uploading: true });
        const promises = [];
        this.state.files.forEach(file => {
          promises.push(this.sendRequest(file));
        });
        try {
          await Promise.all(promises);
      
          this.setState({ successfullUploaded: true, uploading: false });
        } catch (e) {
          // Not Production ready! Do some error handling here instead...
          this.setState({ successfullUploaded: true, uploading: false });
        }
    }

    sendRequest = (file) => {
        return new Promise((resolve, reject) => {
          const req = new XMLHttpRequest();

          req.upload.addEventListener("progress", event => {
            if (event.lengthComputable) {
             const copy = { ...this.state.uploadProgress };
             copy[file.name] = {
              state: "pending",
              percentage: (event.loaded / event.total) * 100
             };
             this.setState({ uploadProgress: copy });
            }
           });
            
           req.upload.addEventListener("load", event => {
            const copy = { ...this.state.uploadProgress };
            copy[file.name] = { state: "done", percentage: 100 };
            this.setState({ uploadProgress: copy });
            resolve(req.response);
           });
            
           req.upload.addEventListener("error", event => {
            const copy = { ...this.state.uploadProgress };
            copy[file.name] = { state: "error", percentage: 0 };
            this.setState({ uploadProgress: copy });
            reject(req.response);
           });

          const formData = new FormData();
          formData.append("file", file, file.name);
      
          req.open("POST", "http://localhost:5000/api/upload/file");
          req.send(formData);
        });
    }

    handeleDeleteFile = (target) => () =>{
      const {files} = this.state;
      let index = files.indexOf(target);
      if (index !== -1) {
        files.splice(index, 1);
        this.setState({files: files});
      }
      this.props.handeleDeleteFile(target);
    }

    render() {
        return (
            <div className="Upload">
                <span className="Title">Upload Files</span>
                <div className="Content">
                    <Dropzone
                            onFilesAdded={this.onFilesAdded}
                            disabled={this.state.uploading || this.state.successfullUploaded}
                    />
                    <div className="Files" >
                        {this.state.files.map(file => {
                            return (
                                <div key={file.id} className="Row">
                                <div className="delete_file" onClick={this.handeleDeleteFile(file)}><Delete/></div>   
                                <span className="Filename">{file.name}</span>
                                <div className="ImageContainer">
                                    <img 
                                        alt={file.name}
                                        src={URL.createObjectURL(file)}
                                        width="250px"
                                        height="100%"
                                    />
                                </div>  
                                {this.renderProgress(file)}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
