// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract BNFT is ERC721Enumerable, Ownable {
  using SafeMath for uint256;
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  uint256 private MAX_SUPPLY = 1;
  uint256 private MAX_PER_MINT = 5;
  string private BASETOKEN_URL;
  uint public PRICE = 100000000000000; // 0.0001 ether
  

  constructor(string memory baseURI) ERC721("BNFT","BNFT") {
    setBaseURI(baseURI);
  }

  // 设置baseTokenURI
  function setBaseURI(string memory _baseTokenURI) public onlyOwner {
    BASETOKEN_URL = _baseTokenURI;
  }


  function _baseURI() internal view override returns (string memory) {
    return BASETOKEN_URL;
  }

  //  批量铸造 []
  function mintNfts(address[] memory to,uint256[] memory tokenIds) public payable onlyOwner{
      uint _count = tokenIds.length;
      uint totalMinted = _tokenIds.current();
      require(
        totalMinted.add(_count) <= MAX_SUPPLY, "Purchase would exceed max supply!"
      );

      require(
        _count > 0 && _count <= MAX_PER_MINT, 
        "Cannot mint specified number of NFTs."
      );


     require(
       msg.value >= PRICE.mul(_count), 
       "Ether value sent is not correct!"
     );
     
     for (uint i = 0; i < _count; i++) {
        _safeMint(to[i], tokenIds[i]);
        _tokenIds.increment();
     }
  }



  // 单个铸造
  function mint(address to) public payable onlyOwner{
   uint tokenId = _tokenIds.current();
    require(
       (tokenId+1) <= MAX_SUPPLY, 
       "Not enough NFTs!"
     );

     require(
       msg.value >= PRICE.mul(1), 
       "Not enough ether to purchase NFTs."
     );
     _safeMint(to, tokenId);
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
  function withdraw() public onlyOwner {
      uint balance = address(this).balance;
      require(balance > 0, "No ether left to withdraw");
      (bool success, ) = (msg.sender).call{value: balance}("");
      require(success, "Transfer failed.");
  }

  // 设置最大铸造数量
  function addMaxSupply(uint maxSupply) public onlyOwner {
      require(maxSupply > 0, "The value must be greater than 0.");
      MAX_SUPPLY = MAX_SUPPLY + maxSupply;
  }

  // 设置价格
  function setPrice(uint price) public onlyOwner {
      require(price >= 0, "The minimum value is 0");
      PRICE = price;
  }

  // 设置批量铸造的最大值
  function setMaxPerMint(uint maxPerMint) public onlyOwner {
      require(maxPerMint >= 0, "The minimum value is 1");
      MAX_PER_MINT = maxPerMint;
  }

  function burn(uint256 tokenId) public {
        //solhint-disable-next-line max-line-length
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: caller is not token owner or approved");
        _burn(tokenId);
    }

}