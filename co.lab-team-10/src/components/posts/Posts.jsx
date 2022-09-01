import DeleteIcon from "@mui/icons-material/Delete";
import { CardActionArea, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { DateTime } from "luxon";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/appContext.jsx";
import warningIcon from "../../images/CircleWavyWarning.svg";
import checkIcon from "../../images/CircleWavyCheck.svg";

function Posts({ post }) {
  const { user, setUser, setPosts, posts } = useContext(AppContext);

  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:4000/posts/${post.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const filtered = posts.filter((p) => p.id != post.id);
      setPosts(filtered);
    } catch (error) {
      console.log(error);
    }
  };
  // const handleDelete = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await fetch(`https://colab-free-up.herokuapp.com/posts/${post.id}`, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const filtered = posts.filter((p) => p.id != post.id);
  //     setPosts(filtered);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <Grid item xs="12" md="4" className="item-card-grid-container">
      <Card className="item-card">
        <div onClick={(e) => navigate(`/details/${post.id}`)}>
          <CardActionArea>
            <CardMedia
              className="post-images"
              width="300px"
              height="172px"
              component="img"
              image={!post.upload ? post.image : post.upload}
              alt="post_image"
            />
            <CardContent>
              <div className="card-content-1">
                <h3>{post.title}</h3>
                <h4>{post.location}</h4>
              </div>
              <div className="card-content-2">
                <div className="pick-up-container">
                  {post.pickup_type === 'drop-off'
                    ? (
                      <>
                        <img src={warningIcon} alt="warning-icon" />
                        <h3>Immediate Pickup</h3>
                      </>
                    )
                    : (
                      <>
                        <img src={checkIcon} alt="check-icon" />
                        <h3>Schedule Pickup</h3>
                      </>
                    )}
                </div>
                <h4>{DateTime.fromISO(post.time_posted).toRelative()}</h4>
              </div>

              <Typography gutterBottom variant="h6" component="div">
                {/* {post.title} */}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {/* {post.location} */}
              </Typography>
            </CardContent>
          </CardActionArea>
        </div>
        <div className="delete-btn">
          {post.user_id === user.id && (
            <IconButton aria-label="delete">
              <DeleteIcon
                className="delete-icon"
                type="submit"
                onClick={handleDelete}
              />
            </IconButton>
          )}
        </div>
      </Card>
    </Grid>
  );
}

export default Posts;
