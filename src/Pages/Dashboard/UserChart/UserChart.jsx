import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";

const UserChart = () => {
  const {user}=useAuth()
  const email=user.email
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDonationData = async () => {
      try {
        const res = await axios.get(
          `https://waggo-server.vercel.app/userTotalDonation?email=${email}`
        );

        // Filter out the first element if your API still returns the collection
        // Only keep monthwise totals
        const monthData = res.data.filter((item) => item.month);
        setData(monthData);
      } catch (err) {
        console.error("Error fetching donation data", err);
      }
    };

    fetchDonationData();
  }, [email]);

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h3 style={{ textAlign: "center" }}>Monthly Donations</h3>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserChart;
