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



// const { ethers } = require("hardhat");
// const hre = require("hardhat");

// async function main() {


//   // Deploy the Transfer contract
//   const Transfer = await hre.ethers.getContractFactory("Transfer");
//   const transferContract = await Transfer.deploy();
//   await transferContract.waitForDeployment();
//   console.log("Transfer contract deployed to:", transferContract.target);


//   const NFT = await hre.ethers.getContractFactory("Nft");
//   const nftContract = await NFT.deploy();
//   await nftContract.waitForDeployment();
//   console.log("Nft contract deployed to:", nftContract.target);

//   const Vote = await hre.ethers.getContractFactory("Vote");
//   const voteContract = await Vote.deploy();
//   await voteContract.waitForDeployment();
//   console.log("Vote contract deployed to:", voteContract.target);

//   // Deploy the Proxy contract, passing the address of the Transfer contract
//   const Proxy = await hre.ethers.getContractFactory("Proxy");
//   const proxyContract = await Proxy.deploy(transferContract.target, nftContract.target,voteContract.target);
//   await proxyContract.waitForDeployment();
//   console.log("Proxy contract deployed to:", proxyContract.target);

//   // Optionally, you can call setImplementation function of the proxy contract to map function ID to Transfer contract address
//   const transferFunctionId = await proxyContract.getTransferFunctionId();
//   await proxyContract.setImplementation(transferFunctionId, transferContract.target);

//   const voteFunctionId = await proxyContract.getTransferFunctionId();
//   await proxyContract.setImplementation(voteFunctionId, voteContract.target);

//   const nftFunctionId = await proxyContract.getTransferFunctionId();
//   await proxyContract.setImplementation(nftFunctionId, nftContract.target);

//   console.log("Proxy contract configured successfully!");

// }

// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });



  // Transfer contract deployed to: 0x03641FdD1caD602a73Dac8BC0f76082b199C6153
  // Nft contract deployed to: 0x55Eeb0A6D3EB19765c79325fEA40358c79A78aE5
  // Vote contract deployed to: 0x825Fa4F402F5A15740A3e6E363A1f5839517EB36
  // Proxy contract deployed to: 0x76477aD2E12ACCAD3AD69D5b9Fedf0E845369a2E
  // Proxy contract configured successfully!








  // scripts/deployProxy.js

const { ethers, upgrades } = require("hardhat");

async function main() {
    // Deploy the implementation contracts first
    const Transfer = await ethers.getContractFactory("Transfer");
    const Nft = await ethers.getContractFactory("Nft");
    const Vote = await ethers.getContractFactory("Vote");

    const transfer = await Transfer.deploy();
    await transfer.waitForDeployment();

    const nft = await Nft.deploy();
    await nft.waitForDeployment();

    const vote = await Vote.deploy();
    await vote.waitForDeployment();

    console.log("Implementation contracts deployed:");

    console.log("Transfer:", transfer.target);
    console.log("Nft:", nft.target);
    console.log("Vote:", vote.target);

    // Deploy the proxy contract
    const Proxy = await ethers.getContractFactory("Proxy");
    const proxy = await upgrades.deployProxy(
        Proxy,
        [transfer.target, nft.target, vote.target],
        {
          initializer: "starting",
       }
    );

    console.log("Proxy contract deployed:", proxy.target);
}

main().then(() => process.exit(0)).catch(error => {
    console.error(error);
    process.exit(1);
});


// Implementation contracts deployed:
// Transfer: 0x2cc12a06CcfcA91d62dafa8572f9557C0Fd778AF
// Nft: 0xe7559AB433CBe38ae6B105D978B9FAA23A1D178D
// Vote: 0xa480f19EBa9169b6644dbC5Cd22944bE58A6cFF1
// Proxy contract deployed: 0xAD84f50c6E1B1CB0045035122e00b5876409B685