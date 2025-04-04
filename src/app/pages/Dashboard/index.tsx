import { memo, useCallback, useEffect, useState } from "react";
import { connectToDatabase } from "../../../services/api/database";
import { useLogin } from "../../hooks/useLogin";
import { fetchTableNames } from "../../../services/api/api";
import DashboardCharts from "./DashboardCharts";
import EmptyDashboard from "../EmptyDashboardPage";
import { useTableNameStore } from "../../store/tableNameList.store";
import { useDashboardStore } from "../../store/dashboardState.store";

const DashboardPage = ({ payload, loginData }) => {
  const { handleSubmit } = useLogin();
  const [isGenerate, setIsGenerate] = useState(false);
  const { columnData } = useDashboardStore();
  const { updateLoading, tableNameData, updateError } = useTableNameStore();

  const getData = useCallback(async () => {
    console.log(loginData);

    await handleSubmit(loginData);
    const data = await connectToDatabase(payload);
    console.log("API Response:", data);

    const tables = await fetchTableNames();
    console.log("table", tables);
    tableNameData(tables);
  }, [payload, loginData]);

  useEffect(() => {
    getData();
  }, [payload]);

  return (
    <div>
      {columnData ? (
        <div className="mt-20">
          <DashboardCharts columnData={columnData} />
        </div>
      ) : (
        <div className="">
          <EmptyDashboard
            isGenerate={isGenerate}
            setIsGenerate={setIsGenerate}
          />
        </div>
      )}
    </div>
  );
};

export default memo(DashboardPage);
