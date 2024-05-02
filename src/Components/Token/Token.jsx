import React, { useState } from "react";
import { ethers } from "ethers";
import Proxy from "../../abi/Proxy.json";
import toast, { Toaster } from "react-hot-toast";
const Token = () => {
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  // const [symbol, setSymbol] = useState("");

  const handleTransfer = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();
    const proxyAddress = "0x692f5bEFa2Ba509Dedd15D2E268C2299F1dBA3Eb";

    const proxy = new ethers.Contract(proxyAddress, Proxy.abi, signer);

    const tx = await proxy.callTransfer(recipientAddress, {
      value: ethers.utils.parseEther(amount),
    });
    await tx.wait();
    toast.success("Amount Transferred");
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-400 w-screen h-screen gap-10">
      <div className="flex w-4/5 justify-between items-center">
        <input
          onChange={(e) => setRecipientAddress(e.target.value)}
          value={recipientAddress}
          className="w-3/4 text-white p-3 bg-black border-2 border-blue-900 border-opacity-60 bg-opacity-70 outline-none rounded-lg"
          placeholder="Paste Recipient Address"
        />
        <input
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          type="number"
          className="w-1/4 ml-4 p-3 text-white bg-black border-2 border-blue-900 border-opacity-60 bg-opacity-70 outline-none rounded-lg"
          placeholder="Amount"
        />
        <input
          onChange={(e) => setSymbol(e.target.value)}
          value={symbol}
          className="w-1/4 ml-4 p-3 text-white  bg-black border-2 border-blue-900 border-opacity-60 bg-opacity-70 outline-none rounded-lg"
          placeholder="Symbol"
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg"
        onClick={() => handleTransfer()}
      >
        Submit
      </button>
      <Toaster />
    </div>
  );
};

export default Token;
