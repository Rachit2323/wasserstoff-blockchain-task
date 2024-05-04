const { ethers, upgrades } = require("hardhat");

async function main() {
   const V1contract = await ethers.getContractFactory("V1");
   console.log("Deploying V1contract...");
   const v1contract = await upgrades.deployProxy(V1contract, [10], {
      initializer: "initialValue",
   });
   await v1contract.waitForDeployment();
   console.log("V1 Contract deployed to:", v1contract.target);
}

main().catch((error) => {
   console.error(error);
   process.exitCode = 1;
 });


//  0xaA54b3aE6669E764A705215001CFda290560Ed0F