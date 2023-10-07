// SPDX-License-Identifier: AGPL-3.0
pragma solidity ^0.8.21;

import { ERC721, ERC721Enumerable } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Deliverable is ERC721Enumerable {
  constructor() ERC721("recebivel", "recebivel") { }

  function mint() external returns (uint256 tokenId) {
    tokenId = totalSupply() + 1;
    _safeMint(msg.sender, tokenId);
  }
}
