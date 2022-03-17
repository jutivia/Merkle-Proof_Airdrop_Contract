import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Signer } from "ethers";
import { ethers } from "hardhat";
const MerkleRoot = "0x747ab3e4ebd4439f6f4fae5fe19c115e284a0b6dd2daa947ed33adc56881997e"
const JupiterToken = "0xD650fd3Db89ABCfE8673F1943a662350887bd510"
const airdropClaimer = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
async function DeployJupiter() {

    // deploting the Bored ape tokens
    const airdropFactory = await ethers.getContractFactory("Airdrop");
    const airdrop = await airdropFactory.deploy(MerkleRoot)
    airdrop.deployed()

    console.log("airdrop contract", airdrop.address);

    const Jupiter = await ethers.getContractAt("IERC20", JupiterToken)
    console.log("transfering tokens from myself to the airdrop contract")
    const signer:SignerWithAddress[] = await ethers.getSigners()
    // console.log()
    console.log(await Jupiter.balanceOf(signer[0].address))
    await Jupiter.transfer(airdrop.address, "90000000000000000000000000")
    console.log("Airdrop balance:", await airdrop.checkTokenBalance());


    // await airdrop.claimAirdrops("30000000", ['0xed6df254863aeeb0ada9451d4efb9fccbb20f8b941aac05334f830bc713e8f4c'])
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
DeployJupiter().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});