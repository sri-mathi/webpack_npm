import { lazyLoad } from "../../../utils/loadable";

export const DashboardPage = lazyLoad(
  () => import("./index"),
  (module) => module.default
);
export type { DashboardPageProps } from './index';
export default DashboardPage;
