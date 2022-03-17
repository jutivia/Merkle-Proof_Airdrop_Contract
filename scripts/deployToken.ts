import { ethers } from "hardhat";

async function DeployJupiter() {

    // deploting the Bored ape tokens
    const JupiterToken = await ethers.getContractFactory("JupiterTokens");
    const Jupiter = await JupiterToken.deploy();

    await Jupiter.deployed();
    console.log("BATtoken", Jupiter.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
DeployJupiter().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});