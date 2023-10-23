import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const BASE_URL = "http://localhost:8000";

  const getPosts = async () => {
    try {
        console.log(BASE_URL)
      const response = await fetch(BASE_URL + "/listing");
      const allPosts = await response.json();
      console.log(allPosts)
      setPosts(allPosts);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <h2>Listing posts</h2>
      <ul>
        {posts &&
          posts.map((post, index) => (
       
            <div className="HomePosts" key={index}>

              <Link key={post._id} to={`/listing/viewListing/${post._id}`}>
                <div className="listingTitle">
                    <h1> {post.title}</h1>
                </div>
                <div className="images">
                  <img alt={post.tags} src={post.image} />
                </div>
                <div className="listingText">
                  <p>{post.text}</p>
                  <p>{post.price}</p>
                </div>
                <div className="location">
                    <p>{post.location}</p>
                </div>
              </Link>
            </div>
          ))}
      </ul>
    </>
  );
};
export default PostList