// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract LhMemories{
    mapping(address => string[]) public LhMemoriesMap;
    
    function payToPost(
        string memory memoryNft
    ) public payable returns (uint256) {
        LhMemoriesMap[msg.sender].push(memoryNft);
        return 1;
    }

    function getPostsSpecificAddr(
        address specificAddr
    ) public view returns (string[] memory) {
       return LhMemoriesMap[specificAddr];
    }
}
