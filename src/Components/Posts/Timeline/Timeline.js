/*Take posts as an array, and use the "sort" function in a return statement*/
import React, { useContext, useEffect, useState } from "react";
import Post from "../Posts"
import AppContext from "../../../context/AppContext";
import useAxiosFetch from "../../../hooks/use-axios";

const Timeline = () => {
    const {user, setUser} = useContext(AppContext);
    const [posts, setPosts] = useState(null);
    const {
      isLoading,
      fetchError,
      sendRequest,
    } = useAxiosFetch();

    useEffect(()=>{
      sendRequest({url: "posts"}, (a)=>{setPosts(a);});
    }, []);

    if(isLoading){
      return <h1>Loading...</h1>;
    }
    if(fetchError){
      return <h1>Error fetching posts!</h1>
    }
    return posts.sort((a, b) => a > b)? 1 : -1;
};
//     return (
//       <div>
          
//       </div>
//     );
// };
export default Timeline;
