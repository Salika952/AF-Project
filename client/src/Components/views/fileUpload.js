// import React, { Component} from 'react';
// import axios from "axios";
// import ReviewerNavBar from "../navBars/reviewerNavBar";
// import {storage} from "../firebase/index"
//
//
//
// const handleChange = e => {
//     if (e.target.files[0]) {
//         setImage(e.target.files[0]);
//     }
// };
//
// const handleUpload = () => {
//     const uploadTask = storage.ref(`images/${image.name}`).put(image);
//     uploadTask.on(
//         "state_changed",
//         snapshot => {
//             const progress = Math.round(
//                 (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//             );
//             setProgress(progress);
//         },
//         error => {
//             console.log(error);
//         },
//         () => {
//             storage
//                 .ref("images")
//                 .child(image.name)
//                 .getDownloadURL()
//                 .then(url => {
//                     setUrl(url);
//                 });
//         }
//     );
// };
//
// class FileUpload extends Component {
//     constructor(props) {
//         super(props);
//
//     }
//
//     const [image, setImage] = useState(null);
//
//     const [url, setUrl] = useState("");
//     const [progress, setProgress] = useState(0);
//
//
//     render() {
//         return (
//             <div>
//                 d
//                 <progress value={progress} max="100" />
//                 <br />
//                 <br />
//                 <input type="file" onChange={handleChange} />
//                 <button onClick={handleUpload}>Upload</button>
//                 <br />
//                 {url}
//                 <br />
//                 <img src={url || "http://via.placeholder.com/300"} alt="firebase-image" />
//             </div>
//         );
//     }
// }
//
// export default FileUpload;