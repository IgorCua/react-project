import { Chart } from "components/Dynamics/Chart";
import { Info } from "components/Dynamics/Info";
import style from './DynamicsPage.module.scss';
import { Outlet } from "react-router-dom";

const DynamicsPage = () => {
  return <section className={style.section}>
    <Chart/>
    <Info/>
    <Outlet/>
  </section>;
};

export default DynamicsPage;
