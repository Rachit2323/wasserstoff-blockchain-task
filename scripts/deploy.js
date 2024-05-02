// const { ethers } = require("hardhat");
// const hre = require("hardhat");
// // contract - 0x185Fb25A06cF814B068d6dC8B2Bd883bc75c761f

// async function main() {
//   const [deployer] = await ethers.getSigners();

//   const PayPal = await hre.ethers.getContractFactory("Transfer");
//   const paypal = await PayPal.deploy();

//   await paypal.waitForDeployment();
//   console.log('address',paypal.target);


// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });



const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {


  // Deploy the Transfer contract
  const Transfer = await hre.ethers.getContractFactory("Transfer");
  const transferContract = await Transfer.deploy();
  await transferContract.waitForDeployment();
  console.log("Transfer contract deployed to:", transferContract.target);


  const NFT = await hre.ethers.getContractFactory("Nft");
  const nftContract = await NFT.deploy();
  await nftContract.waitForDeployment();
  console.log("Nft contract deployed to:", nftContract.target);

  // Deploy the Proxy contract, passing the address of the Transfer contract
  const Proxy = await hre.ethers.getContractFactory("Proxy");
  const proxyContract = await Proxy.deploy(transferContract.target, nftContract.target);
  await proxyContract.waitForDeployment();
  console.log("Proxy contract deployed to:", proxyContract.target);

  // Optionally, you can call setImplementation function of the proxy contract to map function ID to Transfer contract address
  const transferFunctionId = await proxyContract.getTransferFunctionId();
  await proxyContract.setImplementation(transferFunctionId, transferContract.target);

  console.log("Proxy contract configured successfully!");

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });




// Transfer contract deployed to: 0x7cB5aEf78A339Bd7e5e5e1867d1193E1B13B8947
// Proxy contract deployed to: 0x692f5bEFa2Ba509Dedd15D2E268C2299F1dBA3Eb
// Proxy contract configured successfully!