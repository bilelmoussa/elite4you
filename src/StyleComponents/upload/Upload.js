import React, { Component } from 'react'
import './Upload.scss';
import Dropzone from '../dropzone/Dropzone';
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
    }

    onFilesAdded = (files) => {
      let FilesNmb =  files.length + this.state.files.length;
      let maxFileUploads = false;
      let FileToDelete = [];


      if(FilesNmb > 3){
          maxFileUploads = true;
      }


      if(!maxFileUploads){
        let key_id  = 0;
        if(this.state.files.length === 0){
          key_id = this.state.files.length;
        }else{
          key_id = this.state.files[this.state.files.length - 1].id +1;
        }
  

        files.forEach((file, i)=>{
          file.id = key_id;
          key_id++;

          if(file.size > 1000000){
            console.log("Heigh Size !!!");
            FileToDelete.push(file);
          }

          this.state.files.forEach((f)=>{
            if(file.name === f.name && file.lastModified === f.lastModified && file.size === f.size && file.type === f.type ){
                FileToDelete.push(file);
            }
          })
          
        });

        
        if(FileToDelete.length > 0){
          FileToDelete.forEach((F)=>{
            let index = files.indexOf(F)
            files.splice(index, 1);
          })
        }



        console.log("Choosed Files: ",files);

        this.setState(prevState => ({
          files: prevState.files.concat(files)
        }));
  
        if (this.props.onFilesAdded) {
          this.props.onFilesAdded(files);
        }

      }else{
        console.log('max files');
      }
     
    }


    handeleDeleteFile = (target) => () =>{
      const {files} = this.state;
      let index = files.indexOf(target);
      if (index !== -1) {
        files.splice(index, 1);
        this.setState({files: files});
      }

      if(this.props.handeleDeleteFile){
        this.props.handeleDeleteFile(target);
      }
      
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
                                <div key={file.id+Date()} className="Row">
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
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
