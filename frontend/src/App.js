import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/posts")
      .then(({ data }) => setPosts(data.data))
      .catch((error) => setError(error));
  }, []);

  if (error) {
    // Print errors if any
    return <div>An error occured: {error.message}</div>;
  }

  return (
    <div className="App">
      <ul>
        {posts.map(({ id, attributes }) => (
          <li key={id}>{attributes.Title}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;