import React, { Component } from 'react';
import './Dropzone.scss';
import Backup from '@material-ui/icons/Backup';



export default class Dropzone extends Component {
    constructor(props){
        super(props);
        this.state = {
            hightlight: false,
        };

        this.fileInputRef = React.createRef();
    }

    fileListToArray = (list) => {
        const array = [];
        for (var i = 0; i < list.length; i++) {
          array.push(list.item(i));
        }
        return array;
    }

    openFileDialog = () => {
        if (this.props.disabled) return;
        this.fileInputRef.current.click();
    }

    onFilesAdded = (evt) => {
        if (this.props.disabled) return;
        const files = evt.target.files;
        if (this.props.onFilesAdded) {
          const array = this.fileListToArray(files);
          this.props.onFilesAdded(array);
        }
    }

    onDragOver = (evt) => {
        evt.preventDefault();
      
        if (this.props.disabled) return;
      
        this.setState({ hightlight: true });
    }

    onDragLeave = () => {
        this.setState({ hightlight: false });
    }

    onDrop = (event) => {
        event.preventDefault();
      
        if (this.props.disabled) return;
      
        const files = event.dataTransfer.files;

        if (this.props.onFilesAdded) {
          const array = this.fileListToArray(files);
          this.props.onFilesAdded(array);
        }
        
        this.setState({ hightlight: false });
    }



    render() {
        return (
            <div 
                className={`Dropzone ${this.state.hightlight ? "Highlight" : ""}`}
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
                onClick={this.openFileDialog}
                style={{ cursor: this.props.disabled ? "default" : "pointer" }}
            >
                <Backup
                    className="Icon" 
                />
                <input
                    onChange={this.onFilesAdded}
                    ref={this.fileInputRef}
                    className="FileInput"
                    value={""}
                    type="file"
                    multiple
                />
                <span>Upload Files</span>
             
            </div>
        )
    }
}
