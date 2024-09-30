/* eslint-disable react/jsx-no-undef */
import AppBar from "../components/AppBar.jsx";
import Balance from "../components/Balance.jsx";
import axios from "axios";
import { useState, useEffect } from "react";
import Users from "../components/User.jsx";

export default function Dashboard() {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/account/balance",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };
    fetchBalance(); 
  }, []); 
  return (
    <div>
      <AppBar />
      <div className="m-8">

        <Balance value={balance} />
        <Users />
      </div>
    </div>
  );
}
