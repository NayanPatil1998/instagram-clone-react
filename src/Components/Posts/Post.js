import { Avatar } from "@material-ui/core";
import { firestore } from "../../Fireabase/firebase";
import React, { useEffect, useState } from "react";
import firebase from "firebase";

import "./post.css";
import { useStateValue } from "../../contextapi/StateProvider";

function Post({ postId, username, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    let unsubscribe;
    if (postId) {
      unsubscribe = firestore
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      unsubscribe();
    };
  }, [postId]);

  const postComment = (event) => {
    event.preventDefault();
    if (user) {
      firestore.collection("posts").doc(postId).collection("comments").add({
        comment: comment,
        username: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setComment("");
    } else {
      setComment("");

      alert("You have to login to comment");
    }
  };

  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__avatar"
          src="httpaaas://static2.stuff.co.nz/1398841710/201/9994201.jpg"
          alt={username}
        />
        <h5>
          {" "}
          <strong> {username} </strong>
        </h5>
      </div>

      <img className="post__image" src={imageUrl} />
      <h4 className="post__text">
        <strong>{username} </strong>: {caption}
      </h4>

      <div className="post__comments">
        {comments.map((comment) => (
          <p className="comment">
            <strong>{comment.username}</strong> {comment.comment}
          </p>
        ))}
      </div>

      <form className="post__comment__box">
        <input
          className="post__input"
          type="text"
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="post__button "
          disabled={!comment}
          type="submit"
          onClick={postComment}
        >
          <h5>Post</h5>
        </button>
      </form>
    </div>
  );
}

export default Post;
