import DashboardPage from "./app/pages/Dashboard/index";

const App = () => {
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
