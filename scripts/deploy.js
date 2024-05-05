
  // scripts/deployProxy.js

const { ethers, upgrades } = require("hardhat");

async function main() {
    // Deploy the implementation contracts first
    const Transfer = await ethers.getContractFactory("Transfer");

    const Vote = await ethers.getContractFactory("Vote");

    const transfer = await Transfer.deploy();
    await transfer.waitForDeployment();



    const vote = await Vote.deploy();

    await vote.waitForDeployment();

    console.log("Implementation contracts deployed:");

    console.log("Transfer:", transfer.target);

    console.log("Vote:", vote.target);

    // Deploy the proxy contract
    const Proxy = await ethers.getContractFactory("Proxy");
    const proxy = await upgrades.deployProxy(
        Proxy,
        [transfer.target, vote.target],
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

