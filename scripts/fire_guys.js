// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  let contractAddress = undefined
  if (process.env.IS_USE_NEW_CONTRACT_FIRED_GUYS === 'TRUE') {
    const [deployer] = await ethers.getSigners();
    // We get the contract to deploy
    const FiredGuys = await hre.ethers.getContractFactory("FiredGuys");
    const firedGuys = await FiredGuys.deploy();
    
    await firedGuys.deployed();
    contractAddress = firedGuys.address
  } else {
    contractAddress = process.env.STATIC_CONTRACT_FIRED_GUYS_ADDRESS
  }
  if (contractAddress === undefined)
  {
    console.log("CONTRACT_ADDRESS is not defined");
    process.exit(1);
  }
  const envContractAddress = "VITE_FIRE_GUYS_CONTRACT_ADDR=" + contractAddress;
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
