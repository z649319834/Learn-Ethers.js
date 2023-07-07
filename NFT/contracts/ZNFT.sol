// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract ZNFT is ERC721URIStorage, Ownable {
  using Counters for Counters.Counter;
  // 已铸造NFT数量
  Counters.Counter private _tokenIds;

  constructor() ERC721('ZNFT','ZTH') {}

  function mint (address recipient, string memory tokenURI) public onlyOwner returns (uint256){
    _tokenIds.increment();
    uint256 newTokenId = _tokenIds.current();
    _mint(recipient, newTokenId);
    _setTokenURI(newTokenId,tokenURI);
    return newTokenId;
  }
}