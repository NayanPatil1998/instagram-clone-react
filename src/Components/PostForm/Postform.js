import React, { useState } from "react";
import { useStateValue } from "../../contextapi/StateProvider";
import { firestore, storage } from "../../Fireabase/firebase";
import firebase from "firebase";
import "./postform.css";
import { Link, useHistory } from "react-router-dom";

function Postform() {
    const history = useHistory();
  const [caption, setCaption] = useState("");
  const [{ user }, dispatch] = useStateValue();

  const [url, setUrl] = useState("")
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
        console.log(progress);
      },
      (error) => {
        console.log(error);
        alert(error.message);
      },
      () => {
        storage.ref("images").child(image.name).getDownloadURL().then(url => {

        setUrl(url);
            
        firestore.collection("posts").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            caption: caption,
            imageUrl: url,
            username: user.displayName
        });
        setProgress(0);
        setCaption("");
        setImage(null)
        history.push("/");
        })
        

      }
    );
  };

 if(user) {
   return (
    <div className="container postform__container">
    <h2>Create a Post</h2>
      <div className="form-group">
        <input
          type="text"
          placeholder="Enter caption.."
          value={caption}
          onChange={(event) => setCaption(event.target.value)}
          class="form-control"
        />
      </div>
      <div className="form-group">
        <input type="file" onChange={handleChange} />
      </div>
      <div >
      <progress className="progress" value={progress} max="100"/>
      </div>
      {/* <div class="progress">
        <div
          class="progress-bar"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div> */}

      <button className="btn btn-primary" onClick={handleUpload}>
        Upload
      </button>

  </div>
   );
 }else{

  return (
    <div className="container postform__container">
    <h2>Create a Post</h2>
        <p>You have to login to create post</p>
    </div>
    );
 }

}

export default Postform;
