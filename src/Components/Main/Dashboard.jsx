import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleTransfer = () => {
    navigate("/transfer");
  };
  
  const handleTransferMarket=()=>{
    
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg mb-4"   onClick={handleTransferMarket}>
        NFT Marketplace
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg"
        onClick={handleTransfer}
      >
        Token Transfer
      </button>
    </div>
  );
};

export default Dashboard;
