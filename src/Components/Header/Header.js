import React from "react";
import { Button, IconButton } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import "./header.css";
import { useStateValue } from "../../contextapi/StateProvider";
import { Link } from "react-router-dom";
import { auth } from "../../Fireabase/firebase";

function Header() {
  const [{ user }, dispatch] = useStateValue();

  const handleAuth = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className="header">
      <div className="container">
        <nav class="navbar navbar-expand-lg navbar-light bg-white">
          <a class="navbar-brand" href="#">
            <img
              src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt=""
              width="130"
              loading="lazy"
            />
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto">
              <li class="nav-item active">
                <IconButton>
                  <HomeIcon className="header__icons"/>
                </IconButton>
              </li>
              <li class="nav-item active">
                <IconButton>
                  <FavoriteBorderIcon className="header__icons" />
                </IconButton>
              </li>
              <li class="nav-item active">
                <Link to={!user && "/login"}>
                  <div className="header__button">
                    <Button onClick={handleAuth}>
                      {user ? "Sign Out" : "Sign In"}
                    </Button>
                  </div>
                </Link>
                </li>
              
            </ul>
          </div>
        </nav>

        {/* <Link to="/">
        <img
          className="header__logoImage"
          src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        />
      </Link>
      <div className="header__icons">
        <IconButton>
          <HomeIcon />
        </IconButton>
        <IconButton>
          <FavoriteBorderIcon />
        </IconButton>
        <Link to={!user && "/login"}>
          <div className="header__button">
            <Button onClick={handleAuth}>
              {user ? "Sign Out" : "Sign In"}
            </Button>
          </div>
        </Link>
      </div> */}
      </div>
    </div>
  );
}

export default Header;
