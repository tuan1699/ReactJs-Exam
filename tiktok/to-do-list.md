code To-do-list using useState

```php
function App() {
  const [jobs, setJobs] = useState(() => {
    const jobList = JSON.parse(localStorage.getItem("jobList"));

    return jobList ?? [];
  });
  const [job, setJob] = useState("");

  const handleSubmit = () => {
    setJobs((prev) => {
      const newJobs = [...prev, job];

      const stringJobs = JSON.stringify(newJobs);
      localStorage.setItem("jobList", stringJobs);

      return newJobs;
    });
    setJob("");
  };

  return (
    <div className="app">
      <input value={job} onChange={(e) => setJob(e.target.value)} />

      <button onClick={handleSubmit}>Add</button>
      <ul className="list-todo">
        {jobs.map((job, index) => (
          <li key={index}>{job}</li>
        ))}
      </ul>
    </div>
  );
}
```
