// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

contract LhMemories{
    mapping(address => string[]) public LhMemoriesMap;
    function payToPost(
        string memory memoryNft
    ) public payable returns (string[] memory) {
        LhMemoriesMap[msg.sender].push(memoryNft);
        return LhMemoriesMap[msg.sender];
    }
}
