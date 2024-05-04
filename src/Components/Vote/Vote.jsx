import React, { useState } from 'react';
import { ethers } from "ethers";
import Proxy from "../../abi/Proxy.json";
import toast, { Toaster } from "react-hot-toast";
const Vote = () => {
  // State to store the list of candidates

  
  // State variables for candidate inputs
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [party, setParty] = useState('');

  // Function to handle adding a new candidate
  const addCandidate = async() => {

    try {
      // Check if MetaMask is installed
      if (window.ethereum) {

        // Connect to MetaMask
        await window.ethereum.request({ method: "eth_requestAccounts" });

        // Create ethers provider
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        
        // Get signer
        const signer = provider.getSigner();
        
        // Proxy contract address
        const proxyAddress = "0x76477aD2E12ACCAD3AD69D5b9Fedf0E845369a2E";

        // Create contract instance
        const proxy = new ethers.Contract(proxyAddress, Proxy.abi, signer);
        
        // Call the transfer function
        const tx = await proxy.addCandidates(name,id,party, {
          value: ethers.utils.parseEther("0.001"), 
        });

        // Wait for the transaction to be confirmed
        await tx.wait();
        
        // Show success toast
        toast.success("Candidate Added");
      } else {
        // MetaMask not installed, show error toast
        toast.error("MetaMask not detected");
      }
    } catch (error) {
      // Error occurred, show error toast
      toast.error("Error transferring amount");
      console.error(error);
    }

    setName('');
    setId('');
    setParty('');
  };

  return (
    <div className=" mx-auto p-4 bg-gray-100 rounded-lg h-screen w-screen shadow-md bg-gray-400">
      <h2 className="text-xl font-bold mb-4">Vote</h2>
      <div className="mb-4">
        {/* Input fields for adding a new candidate */}
        <input
          type="text"
          placeholder="Candidate Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 mb-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Candidate ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="w-full px-3 py-2 mb-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Party"
          value={party}
          onChange={(e) => setParty(e.target.value)}
          className="w-full px-3 py-2 mb-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button onClick={addCandidate} className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
          Add Candidate
        </button>
      </div>
      {/* Display the list of candidates */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Candidates:</h3>
        <ul>
          {/* {candidates.map((candidate, index) => (
            <li key={index} className="text-gray-700 hover:text-blue-500 cursor-pointer">
              Name: {candidate.name}, ID: {candidate.id}, Party: {candidate.party}
            </li>
          ))} */}
        </ul>
      </div>
      <Toaster />
    </div>
  );
};

export default Vote;
