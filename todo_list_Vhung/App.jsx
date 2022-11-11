// const App = () => {
//   const [count, setCount] = React.useState(60);

//   console.log(count);

//   const handleStart = () => {
//     setInterval(() => {
//       setCount((prev) => prev - 1);
//       console.log(count);
//     }, 1000);
//   };

//   const handleStop = () => {
//     // clearInterval(id);
//   };

//   return (
//     <div className="container">
//       <div className="counter">{count}</div>
//       <button onClick={handleStart}>Start</button>
//       <button onClick={handleStop}>Stop</button>
//     </div>
//   );
// };

const App = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <input type="text" />
      <button type="submit">Submit</button>
    </form>
  );
};

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<App />);
