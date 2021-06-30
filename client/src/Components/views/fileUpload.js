import React, { Component} from 'react';
import firebase from "../firebase/index";
import Template1 from "url:../../assests/Templates/temp2.docx"



class FileUpload extends Component {

    constructor(props) {
        super(props);
        this.state={
            files:null,
            u:''
        }
    }

    handleChange=(files)=>{
        this.setState({
            files:files
        })
    }

    handleSave=(files)=>{
        // let bucketName = 'images';
        let file = this.state.files[0];
        // let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`);
        // let uploadTask = storageRef.put(file);
        // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,function(){
        //     let downloadURL = uploadTask.snapshot.downloadURL
        // })


        // firebase.storage().ref(`images/${images.name}`)


        const upload = firebase.storage().ref(`images/${file.name}`).put(file);
        upload.on(
            "state_changed",
            snapshot => {},
            error => {
                console.log(error);
            },()=>{
                firebase.storage()
                    .ref("images")
                    .child(file.name)
                    .getDownloadURL()
                    .then(url=>{
                        console.log(url)
                        this.setState({
                            u:url
                        })

                        console.log(this.state.u);
                    })
            }
        )

    }

    showImage=()=>{
        let storageRef = firebase.storage().ref();
        let spaceRef = storageRef.child('images/'+this.state.files[0].name);
        storageRef.child('images/'+this.state.files[0].name).getDownloadURL().then((url)=>{
            document.getElementById('new_image').src = url;
        })
    }


    render() {
        return(
            <div>
                <input type="file" onChange={(e)=>{this.handleChange(e.target.files)}}/>
                <button onClick={this.handleSave}>Save</button>
                {/*<button onClick={this.showImage}>Show Image</button>*/}
                {/*<img id="new-img"/>*/}
                <p>ee:{this.state.u}</p>
                <a href="https://firebasestorage.googleapis.com/v0/b/application-d8249.appspot.com/o/images%2Fsprim.JPG?alt=media&token=26cb48ab-1647-438a-b163-b74cb2139cde">uuu</a>
                {/*<form method="get" action={Template1}>*/}
                {/*    <button type="submit">Download!</button>*/}
                {/*</form>*/}
            </div>
        )
    }

}

export default FileUpload;
