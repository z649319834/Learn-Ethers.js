// 识别ERC721合约  https://github.com/WTFAcademy/WTF-Ethers/blob/main/12_ERC721Check/readme.md

import { JsonRpcProvider, Contract } from "ethers"

const ALCHEMY_MAINNET_URL =
  "https://eth-mainnet.g.alchemy.com/v2/oKmOQKbneVkxgHZfibs-iFhIlIAl6HDN"

const abiERC721 = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function supportsInterface(bytes4) public view returns(bool)",
]
// ERC721的合约地址，这里用的BAYC
const addressBAYC = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"

const provider = new JsonRpcProvider(ALCHEMY_MAINNET_URL)

const main = async () => {
  const contract = new Contract(addressBAYC, abiERC721, provider)

  const nameERC721 = await contract.name()
  const symbolERC721 = await contract.symbol()
  console.log("\n1. 读取ERC721合约信息")
  console.log(`合约地址: ${addressBAYC}`)
  console.log(`名称: ${nameERC721}`)
  console.log(`代号: ${symbolERC721}`)
  console.log(`接口: ${contract.interface}`)

  const selectorERC721 = "0x80ac58cd"
  const isERC721 = await contract.supportsInterface(selectorERC721)
  console.log(`合约是否为ERC721标准: ${isERC721}`)
}

main()
