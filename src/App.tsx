import DashboardPage from "./app/pages/Dashboard/index";
// import { DashboardPage } from "svg-updated";
// import { DashboardPage } from "d-version-v16";

const App = () => {
  // const payload = {
  //   host: "doworks-testin.c7jrg0h7nzsx.ap-south-1.rds.amazonaws.com",
  //   user: "calibraint",
  //   password: "Spider$05",
  //   database: "CRM-a89b6449-a48f-412c-bcd6-b364272ddfb7",
  //   port: 5432,
  // };
  const payload = {
    host: "localhost",
    user: "postgres",
    password: "calibraint",
    database: "sample",
    port: 5432,
  };

  const loginData = {
    email: "dashboard2@mailsac.com",
    password: "Test@1234",
  };

  return (
    <div>
      <DashboardPage payload={payload} loginData={loginData} />
    </div>
  );
};

export default App;
