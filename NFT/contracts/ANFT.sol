// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract ANFT is ERC721Enumerable, Ownable {
  using SafeMath for uint256;
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds; // 铸造计数
  uint public constant MAX_SUPPLY = 500000; // 最大铸造数量
  uint public constant MAX_PER_MINT = 5; // 你一次可以铸造的NFT的上限
  uint public constant PRICE = 0.001 ether; // 购买1个NFT所需的以太币数量
  string public baseTokenURI;// 包含JSON元数据的文件夹的IPFS URL

  constructor(string memory baseURI) ERC721("ANFT","ANFT") {
    setBaseURI(baseURI);
  }

  // 设置baseUrl
  function setBaseURI(string memory _baseTokenURI) public onlyOwner {
    baseTokenURI = _baseTokenURI;
  }


  function _baseURI() internal view virtual override returns (string memory) {
    return baseTokenURI;
  }

  //  批量铸造
  function mints(address recipient,uint _count) public payable {
     uint totalMinted = _tokenIds.current();
     require(
       totalMinted.add(_count) <= MAX_SUPPLY, "Not enough NFTs!"
     );
    require(
       _count > 0 && _count <= MAX_PER_MINT, 
       "Cannot mint specified number of NFTs."
     );
     
     for (uint i = 0; i < _count; i++) {
            mint(recipient);
     }
  }

  // 单个铸造
  function mint(address recipient)public payable {
     require(
       msg.value >= PRICE.mul(1), 
       "Not enough ether to purchase NFTs."
     );
      uint tokenId = _tokenIds.current();
      _safeMint(recipient, tokenId);
      _tokenIds.increment();
  }

  // 获取一个账户下所拥有的所有代币
  function tokensOfOwner(address _owner) external view returns (uint[] memory) {
     uint tokenCount = balanceOf(_owner);
     uint[] memory tokensId = new uint256[](tokenCount);
     for (uint i = 0; i < tokenCount; i++) {
          tokensId[i] = tokenOfOwnerByIndex(_owner, i);
     }
     return tokensId;
}
  // 提取余额
  function withdraw() public payable onlyOwner {
      uint balance = address(this).balance;
      require(balance > 0, "No ether left to withdraw");
      (bool success, ) = (msg.sender).call{value: balance}("");
      require(success, "Transfer failed.");
  }
}