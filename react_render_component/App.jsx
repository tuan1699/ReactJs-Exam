const users = [
  {
    id: "d8a7ecf2b2aeadbc8ebbdbcf",
    fullname: "Reginald Welch",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/634.jpg",
    job: "Product Usability Associate",
  },
  {
    id: "ddebaafecefb10bdef3e93af",
    fullname: "Greg Stark",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1109.jpg",
    job: "Product Data Director",
  },
  {
    id: "accfd2a3e37a693a11f3ab7f",
    fullname: "Carl Price",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/267.jpg",
    job: "International Accounts Supervisor",
  },
  {
    id: "c7fcfccf527daabcfee0ac6d",
    fullname: "Nicholas Stokes PhD",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/529.jpg",
    job: "Future Communications Developer",
  },
  {
    id: "a17bf3dcfaeba5d148eb5fea",
    fullname: "Joy Halvorson",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/431.jpg",
    job: "Investor Identity Associate",
  },
  {
    id: "9dbf2d8f01ccb12dc0ecbd9b",
    fullname: "Yolanda Block",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/881.jpg",
    job: "Product Applications Manager",
  },
  {
    id: "cacf54dc9205d0ea963b9d81",
    fullname: "Raul Keeling",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/831.jpg",
    job: "Chief Usability Orchestrator",
  },
  {
    id: "9f8b6dcb28daea12cc0fc0fe",
    fullname: "Leslie Emard",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/380.jpg",
    job: "Direct Metrics Manager",
  },
  {
    id: "24b7ac3ef3661e311ebabba6",
    fullname: "Neil Hermiston",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/257.jpg",
    job: "Global Usability Officer",
  },
  {
    id: "abdf2a314a5d36276b349744",
    fullname: "Lyle Hartmann",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/184.jpg",
    job: "Dynamic Factors Planner",
  },
  {
    id: "bde9fd2b6ea43d9ebbedfdba",
    fullname: "Mrs. Frankie Kub",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/688.jpg",
    job: "Central Infrastructure Officer",
  },
  {
    id: "cc07ddac45c34e6b517eb3c0",
    fullname: "Roderick Armstrong",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/3.jpg",
    job: "International Data Designer",
  },
  {
    id: "9ed8103bde92f2ed2f01f5d0",
    fullname: "Ms. Thomas Stracke DDS",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/241.jpg",
    job: "Central Interactions Developer",
  },
  {
    id: "8a7daf1f1827f7dfffa670ea",
    fullname: "Eddie Ferry",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/528.jpg",
    job: "Principal Usability Strategist",
  },
  {
    id: "0c308560ecffeebaa17a97ac",
    fullname: "Marion Quitzon",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/576.jpg",
    job: "Investor Operations Manager",
  },
  {
    id: "d5a46cf6cac1df2bbf9ee1a6",
    fullname: "Elena Hegmann",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/863.jpg",
    job: "Future Marketing Orchestrator",
  },
  {
    id: "df3b4df4a796caba0e392079",
    fullname: "Hilda Haley",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/329.jpg",
    job: "Global Metrics Representative",
  },
  {
    id: "def94addce75243fae36efcc",
    fullname: "Willie Rogahn",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/680.jpg",
    job: "Direct Group Manager",
  },
  {
    id: "2f9e543cc76ccceb21464df2",
    fullname: "Pam Langworth",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/973.jpg",
    job: "Global Implementation Director",
  },
  {
    id: "8debdfbd84c7cb9183eb19a0",
    fullname: "Lyle Heidenreich",
    avatar:
      "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1163.jpg",
    job: "Principal Web Technician",
  },
];

const root = ReactDOM.createRoot(document.querySelector("#root"));

const UserApp = () => {
  return (
    <div className="user-app">
      <UserList users={users} />
    </div>
  );
};

root.render(<UserApp />);
