const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  // We get the contract to deploy
  const LhMemories = await hre.ethers.getContractFactory("LhMemories");
  const lhMemories = await LhMemories.deploy();

  await lhMemories.deployed();
  const envContractAddress = "VITE_CONTRACT_ADDR=" + lhMemories.address;
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
