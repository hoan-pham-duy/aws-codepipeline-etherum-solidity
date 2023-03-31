const hre = require("hardhat");
require("dotenv").config();

async function main() {
  let contractAddress = undefined
  if (process.env.IS_USE_NEW_CONTRACT_LH_MEMORIES === 'TRUE') {
    const [deployer] = await ethers.getSigners();
    // We get the contract to deploy
    const LhMemories = await hre.ethers.getContractFactory("LhMemories");
    const lhMemories = await LhMemories.deploy();

    await lhMemories.deployed();
    contractAddress = lhMemories.address
  } else {
    contractAddress = process.env.STATIC_CONTRACT_LH_MEMORIES_ADDRESS
  }
  const envContractAddress = "VITE_LH_MEMORIES_CONTRACT_ADDR=" + contractAddress
  console.log(envContractAddress);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
