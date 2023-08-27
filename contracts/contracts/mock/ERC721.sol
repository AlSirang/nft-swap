// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MockERC721 is ERC721 {
    address owner;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 volume
    ) ERC721(_name, _symbol) {
        for (uint256 tokenId = 0; tokenId < volume; tokenId++)
            _safeMint(msg.sender, tokenId);
    }
}
