import { useEffect, useState } from "react";

const tabs = ["posts", "photos", "todos"];

const Content = () => {
  const [posts, setPost] = useState([]);
  const [type, setType] = useState("posts");

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${type}`)
      .then((res) => res.json())
      .then((json) => setPost(json));
  }, [type]);

  return (
    <div className="post-list">
      {tabs.map((tab) => (
        <button onClick={() => setType(tab)} key={tab}>
          {tab}
        </button>
      ))}
      <ul>
        {posts.map((post) => {
          return <li key={post.id}>{post.title}</li>;
        })}
      </ul>
    </div>
  );
};

function App() {
  const [mount, setMount] = useState(false);

  return (
    <div className="container">
      <button onClick={() => setMount(!mount)}>Toggle</button>
      {mount && <Content />}
    </div>
  );
}

export default App;
