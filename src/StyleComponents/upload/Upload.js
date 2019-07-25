import React, { Component } from 'react'
import './Upload.scss';
import Dropzone from '../dropzone/Dropzone';
import Delete from '@material-ui/icons/Delete';
import { empty } from '../../is-empty';

export default class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            uploading: false,
            uploadProgress: {},
            successfullUploaded: false,
            ErrorMsg: ""
        };
    }

    onFilesAdded = (files) => {
      this.setState({ErrorMsg: ""});
      let FilesNmb =  files.length + this.state.files.length;
      let maxFileUploads = false;
      let FileToDelete = [];
      

      if(FilesNmb > 3){
          maxFileUploads = true;
          this.setState({ErrorMsg: "Max Files Number is 3"})
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
          console.log(file);
          const filetypes = /jpeg|jpg|png|gif/;
          const name = filetypes.test(file.name.toLowerCase());
          const type = filetypes.test(file.type.toLowerCase());

          if(!name && !type){
            this.setState({ErrorMsg: "Images Only !"})
            FileToDelete.push(file);
          }

          if(file.size > 1000000){
            this.setState({ErrorMsg: "Height Size File !"})
            FileToDelete.push(file);
          }

          this.state.files.forEach((f)=>{
            if(file.name === f.name && file.lastModified === f.lastModified && file.size === f.size && file.type === f.type ){
                FileToDelete.push(file);
                this.setState({ErrorMsg: "File Aleardy Exist !"})
            }
          })
          
        });

        
        if(FileToDelete.length > 0){
          FileToDelete.forEach((F)=>{
            let index = files.indexOf(F)
            files.splice(index, 1);
          })
        }

        this.setState(prevState => ({
          files: prevState.files.concat(files)
        }));
  
        if (this.props.onFilesAdded) {
          this.props.onFilesAdded(files);
        }

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
      const {ErrorMsg} = this.state;

      const RenderErrMsg = () =>{
        if(!empty(ErrorMsg)){
          return(
            <div style={{margin: "20px auto", backgroundColor: "#f00", padding: 10, borderRadius: 5, textAlign: "center"}}>
            <p style={{color: "#fff", textTransform: "uppercase", fontSize: 14, letterSpacing: 1}}>{ErrorMsg}</p>
          </div>
          )
        }else{
          return null;
        }
      }

      const RenderImgSide = (i) =>{
        if(i === 0){
          return(<span className="Filename">Front Side</span>)
        }else if(i === 1){
          return(<span className="Filename">Right Side</span>)
        }else if(i === 2){
          return(<span className="Filename">Left Side</span>)
        }else{
          return null;
        }
      } 

        return (
            <div className="Upload">
                <span className="Title">Upload Files</span>
                <div className="Content">
                    <Dropzone
                            onFilesAdded={this.onFilesAdded}
                            disabled={this.state.uploading || this.state.successfullUploaded}
                    />
                    <div className="Files" >
                      {RenderErrMsg()}
                        {this.state.files.map((file, i) => {
                            return (
                                <div key={file.id} className="Row">
                                <div className="delete_file" onClick={this.handeleDeleteFile(file)}><Delete/></div>
                                {RenderImgSide(i)}
                                <span className="Filename">{file.name}</span>
                                <div className="ImageContainer">
                                    <img 
                                        alt={file.name}
                                        src={URL.createObjectURL(file)}
                                        width="250px"
                                        height="auto"
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
