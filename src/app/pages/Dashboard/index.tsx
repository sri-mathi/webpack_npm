import { memo, useCallback, useEffect, useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import DashboardCharts from "./DashboardCharts";
import EmptyDashboard from "../EmptyDashboardPage";
import { useDashboardStore } from "../../store/dashboardState.store";
interface DashboardPageProps {
  payload: {
    host: string;
    user: string;
    password: string;
    database: string;
    port: number;
  };
  loginData: {
    email: string;
    password: string;
  };
}


const DashboardPage: React.FC<DashboardPageProps> = ({ payload, loginData }) => {
  const { handleSubmit } = useLogin();
  const [isGenerate, setIsGenerate] = useState(false);
  const { columnData } = useDashboardStore();

  const getData = useCallback(async () => {
    console.log("Login Data:", loginData);
    await handleSubmit(loginData);
  }, [handleSubmit, loginData]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div>
      {columnData ? (
        <div className="mt-20">
          <DashboardCharts columnData={columnData} />
        </div>
      ) : (
        <EmptyDashboard
          isGenerate={isGenerate}
          setIsGenerate={setIsGenerate}
          payload={payload}
        />
      )}
    </div>
  );
};

export default memo(DashboardPage);
