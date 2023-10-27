import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const BASE_URL = "http://localhost:8000";
  const [filter, setFilter] = useState({
    location: "",
    distance: "",
    category: "",
    price: 0
  })

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

  const handleChange = (event) => {
    const userInput = { ...filter };
    userInput[event.target.name] = event.target.value;
    setFilter(userInput);
  };

  const handleChange2 = (event) => {
    const userInput = { ...filter };
    userInput[event.target.name] = event.target.value;
    setFilter(userInput);
  };

  return (
    <>
      <h2>Listing posts</h2>
    <form >
        <label for="location">Location:</label>
        <input type="text" id="location" name="location" value={filter.location} onChange={handleChange}></input>
        <label for="distance">Distance:</label>
        <select name="distance" id="distance" value={filter.distance} onChange={handleChange2}>
            <option value="5">5 miles</option>
            <option value="10">10 miles</option>
            <option value="15">15 miles</option>
            <option value="20">20 miles</option>
            <option value="25">25 miles</option>
        </select>
        <label for="category">category:</label>
        <select name="category" id="category" value={filter.category} onChange={handleChange}>
            <option value="produce">produce</option>
            <option value="seed">seed</option>
            <option value="live plant">live plant</option>
        </select>
        <label for="price">Price:</label>
        <input type="number" id="price" name="price" value={filter.price} onChange={handleChange}></input>
    </form>

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