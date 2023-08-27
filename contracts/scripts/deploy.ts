import { ethers } from "hardhat";

async function main() {
  const NFTExchange = await ethers.getContractFactory("NFTExchange");
  const exchange = await NFTExchange.deploy();

  console.log("deployed at : ", exchange.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
