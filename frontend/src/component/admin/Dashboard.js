import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import "./dashboard.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
// import { getAllOrders } from "../../actions/orderAction.js";
// import { getAllUsers } from "../../actions/userAction.js";
import MetaData from "../layout/MetaData";
import { Chart, registerables } from "chart.js"


const Dashboard = () => {
  const dispatch = useDispatch();
  Chart.register(...registerables);


  const { products } = useSelector((state) => state.products);

//   const { orders } = useSelector((state) => state.allOrders);

//   const { users } = useSelector((state) => state.allUsers);


  useEffect(() => {
    dispatch(getAdminProduct());
    // dispatch(getAllOrders());
    // dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 500;
//   orders &&
//     orders.forEach((item) => {
//       totalAmount += item.totalPrice;
//     });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };


  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> Rs. {totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Products</p>
              <p>{products && products.length}</p>
              <p></p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              {/* <p>{orders && orders.length}</p> */}
              <p>4</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              {/* <p>{users && users.length}</p> */}
              <p>3</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line data={lineState} />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;