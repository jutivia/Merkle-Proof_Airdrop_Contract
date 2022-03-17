// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
 contract Airdrop{
    IERC20 Jupiter;
    bytes32 merkleRoot;
    address JupiterAddress = 0x13dc5fbd0045bffBE0D31CeDF3895B5b6d745366;
    // address JupiterAddress = 0x5FbDB2315678afecb367f032d93F642f64180aa3;
   mapping(address => bool) addressClaimed;
    event AddressClaim(address owner, uint amount);
    constructor(bytes32 _merkleRoot){
        Jupiter = IERC20(JupiterAddress);
        merkleRoot = _merkleRoot;
    }

   function claimAirdrops(
        uint256 _amount,
        bytes32[] calldata _merkleProof
    ) external {
        require(!addressClaimed[msg.sender], "Airdrop has been claimed");
        // Verify the merkle proof.
        bytes32 node = keccak256(abi.encodePacked(msg.sender, _amount));
        require(MerkleProof.verify(_merkleProof, merkleRoot, node), "MerkleDistributor: Invalid proof.");

        // Mark it claimed and send the token.
        addressClaimed[msg.sender] = true;
        Jupiter.transfer(msg.sender, _amount* 10**18);
        //only emit when successful
        emit AddressClaim( msg.sender, _amount* 10**18);
    }
    function checkTokenBalance () public view returns (uint256){
        return Jupiter.balanceOf(address(this));
    }
 }