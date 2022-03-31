/*Take posts as an array, and use the "sort" function in a return statement*/
import React, { useContext, useEffect, useState } from "react";
import Post from "../Posts"
import AppContext from "../../../context/AppContext";

const Timeline = () => {
    const {user, setUser} = useContext(AppContext);
    const {posts, setPosts} = useState([]);
    
    useEffect(() => {
      const fetchPosts = async () => {
        const res = username
          ? await axios.get("/posts/profile/" + username)
          : await axios.get("posts/timeline/" + user._id);
        setPosts(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
      };
      fetchPosts();
    }, [username, user._id]);
  
    return (
      <div className="feed">
        <div className="feedWrapper">
          {(!username || username === user.username) && <Share />}
          {posts.map((p) => (
            <Post key={p._id} post={p} />
          ))}
        </div>
      </div>
    );
  };
//     return (
//       <div>
          
//       </div>
//     );
// };
export default Timeline;
