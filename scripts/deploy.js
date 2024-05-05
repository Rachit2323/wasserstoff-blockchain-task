
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


// Implementation contracts deployed:
// Transfer: 0x27f80D9006732d7b4a5d1d179354f7E675a3d8d1
// Vote: 0x31Ef95B957689Ab328B2072650074110f3b1b9D4
// Proxy contract deployed: 0x23E053e31EA6c2dd3CCAE1c3B5a009146fCFA50C