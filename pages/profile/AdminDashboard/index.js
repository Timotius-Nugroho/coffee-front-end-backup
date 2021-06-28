import AdminDashboardNavbar from "../../../components/module/AdminDashboardNavbar";
import Layout from "../../../components/Layout";
import styles from "../../../styles/Dashboard.module.css";
import Footer from "../../../components/module/Footer";
import axiosApiIntances from "utils/axios";
import { authPage } from "middleware/authorizationPage";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

export async function getServerSideProps(context) {
  const data = await authPage(context);

  const charts = await axiosApiIntances
    .get("/chart/daily", {
      headers: {
        Authorization: `Bearer ${data.token || ""}`,
      },
    })
    .then((res) => {
      return res.data;
    });

  const chartsWeek = await axiosApiIntances
    .get("/chart/daily?groubBy=week", {
      headers: {
        Authorization: `Bearer ${data.token || ""}`,
      },
    })
    .then((res) => {
      return res.data;
    });

  const chartsMonth = await axiosApiIntances
    .get("/chart/daily?groubBy=month", {
      headers: {
        Authorization: `Bearer ${data.token || ""}`,
      },
    })
    .then((res) => {
      return res.data;
    });

  const dataChart = charts.data.map((item) => {
    const data = { DAY: item.DAY, Total: parseInt(item.Total) };
    return data;
  });

  const dataChartWeek = chartsWeek.data.map((item) => {
    const data = {
      day_name: item.day_name,
      total_invoice: parseInt(item.total_invoice),
    };
    return data;
  });

  const dataChartMonth = chartsMonth.data.map((item) => {
    const data = { month: item.month, Total: parseInt(item.Total) };
    return data;
  });

  return {
    props: {
      data: dataChart,
      dataWeek: dataChartWeek,
      dataMonth: dataChartMonth,
    },
  };
}

export default function AdminDashboard(props) {
  const [click, setClick] = useState(false);
  const [click1, setClick1] = useState(false);
  const [click2, setClick2] = useState(false);

  const handleClickDay = () => {
    setClick(true);
    setClick1(false);
    setClick2(false);
  };

  const handleClickWeek = () => {
    setClick1(true);
    setClick(false);
    setClick2(false);
  };

  const handleClickMonth = () => {
    setClick2(true);
    setClick(false);
    setClick1(false);
  };
  return (
    <>
      <Layout title="Admin Dashboard">
        <div className={styles.greyBackground}>
          <AdminDashboardNavbar />
          <div className="container">
            <h5 className={`fw-bold text-center pt-4 pb-3 ${styles.brownText}`}>
              See how your store progressed so far
            </h5>
            <div className="d-flex justify-content-center flex-wrap pb-3">
              <div className="row mx-1">
                <div className="d-flex justify-content-center">
                  <img
                    src="/Ellipse 189.png"
                    className={
                      click ? styles.bulletPeriod1 : styles.bulletPeriod
                    }
                    onClick={handleClickDay}
                  ></img>
                </div>
                <span className="text-center">Daily</span>
              </div>

              <div className="row mx-1">
                <div className="d-flex justify-content-center">
                  <img
                    src="/Ellipse 189.png"
                    className={
                      click1 ? styles.bulletPeriod1 : styles.bulletPeriod
                    }
                    onClick={handleClickWeek}
                  ></img>
                </div>
                <span className="text-center">Week</span>
              </div>
              <div className="row mx-1">
                <div className="d-flex justify-content-center">
                  <img
                    src="/Ellipse 189.png"
                    className={
                      click2 ? styles.bulletPeriod1 : styles.bulletPeriod
                    }
                    onClick={handleClickMonth}
                  ></img>
                </div>
                <span className="text-center">Month</span>
              </div>
            </div>
            <div className={`card ${styles.chartCard}`}>
              <div className="p-3">
                <h5 className="fw-bold">
                  {click2 ? "Monthly" : click1 ? "Weekly" : "Daily"} Report
                </h5>
                <span className="d-block">
                  Last {click2 ? "Month" : click1 ? "Week" : "7 Days"}
                </span>
              </div>
              <ResponsiveContainer width="100%" height={500}>
                <BarChart
                  className={styles.chart}
                  data={
                    click2
                      ? props.dataMonth
                      : click1
                      ? props.dataWeek
                      : props.data
                  }
                  barSize={50}
                  margin={{ top: 50, left: 20, right: 20, bottom: 20 }}
                >
                  <XAxis
                    padding={{ left: 20, right: 100 }}
                    dataKey={click2 ? "month" : click1 ? "day_name" : "DAY"}
                  />
                  <YAxis type="number" />
                  <CartesianGrid horizontal={false} />
                  <Tooltip />
                  <Bar
                    dataKey={
                      click2 ? "Total" : click1 ? "total_invoice" : "Total"
                    }
                    fill="#6a4029"
                    isAnimationActive={true}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="pt-4">
              <button className={`${styles.downloadButton} w-100`}>
                <span className="fw-bold">Download Report</span>
              </button>
            </div>
          </div>
          <div className={`mt-5 ${styles.footerBorder}`}>
            <Footer />
          </div>
        </div>
      </Layout>
    </>
  );
}
