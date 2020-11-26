import React, { useState, useEffect } from "react";
import Header from "./Components/Header/Header";
import "./app.css";
import Post from "./Components/Posts/Post";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { auth, firestore } from "./Fireabase/firebase";
import { useStateValue } from "./contextapi/StateProvider";
import Login from "./Components/Login/Login";
import Signup from "./Components/SignUp/Signup";
import Postform from "./Components/PostForm/Postform";
import InstagramEmbed from "react-instagram-embed";

function App() {
  const [posts, setPosts] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authuser) => {
      console.log("USER ----> ", authuser);
      if (authuser) {
        dispatch({
          type: "SET_USER",
          user: authuser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
    return () => {
      unsubscribe();
    };
  }, [user]);

  useEffect(() => {
    firestore
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  return (
    <Router>
      <div className="app">
        <Switch>
          {/* <Route path="/createpost">
            <Postform />
          </Route> */}
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>

          <Route path="/">
            <Header />
            <div className="app__body row">
              <div>
                <Postform />
              </div>
              <div className="main___body">
                {posts.map(({ id, post }) => (
                  <Post
                    postId={id}
                    key={id}
                    imageUrl={post.imageUrl}
                    caption={post.caption}
                    username={post.username}
                  />
                ))}
              </div>
              <div className="insta__feed">
                <h5>Created by</h5>
                <InstagramEmbed
                  url="https://www.instagram.com/p/B8JfHPeBC8Y/?igshid=176wvusk9r9bc"
                  maxWidth={320}
                  hideCaption={false}
                  containerTagName="div"
                  protocol=""
                  injectScript
                  onLoading={() => {}}
                  onSuccess={() => {}}
                  onAfterRender={() => {}}
                  onFailure={() => {}}
                />
              </div>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
