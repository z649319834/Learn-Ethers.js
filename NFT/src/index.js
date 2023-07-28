import {
  JsonRpcProvider,
  Wallet,
  Contract,
  formatUnits,
  getNumber,
} from "ethers"
// require("dotenv").config()
const { NETWORK_URL, WALLET_PRIVATE_KEY, WALLET_KEY, WALLET_KEY_2 } =
  process.env
const abi = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function balanceOf(address) public view returns(uint)",
  "function totalSupply() public view returns(uint)",
  "function transfer(address, uint) public returns (bool)",
  "function mint(address to,uint256 tokenId) public",
  "function mints(address[] to,uint256[] tokenIds) public",
]
const provider = new JsonRpcProvider(NETWORK_URL)
const contractAddress = "0x7476ADabF4bEA25B19fDF0A8D1B41Dd4baA01677"
const wallet = new Wallet(WALLET_PRIVATE_KEY, provider)

const contract = new Contract(contractAddress, abi, wallet)

const main = async () => {
  const feedata = await provider.getFeeData()
  console.log(
    "gasPrice: ",
    `${formatUnits(feedata.gasPrice, "gwei")}Gwei`,
    feedata,
    feedata.toJSON()
  )
  console.log(
    "maxFeePerGas: ",
    `${formatUnits(feedata.maxFeePerGas, "gwei")}Gwei`
  )
  console.log(
    "maxPriorityFeePerGas: ",
    `${formatUnits(feedata.maxPriorityFeePerGas, "gwei")}Gwei`
  )

  console.log("contract", await contract.name())
  console.log("contract", await wallet.getAddress())
  let tokenId = await contract.totalSupply()
  tokenId = Number(tokenId) + 1
  console.group(
    "===========开始铸造========== tokenId:",
    WALLET_KEY_2,
    typeof tokenId
  )
  let tx = await contract.mint(WALLET_KEY_2, tokenId)
  console.log("===========铸造中========== tokenId:", tokenId, tx)
  tx = await tx.wait()
  console.log("===========铸造结束==========tokenId:", tokenId, tx)
  console.groupEnd()
}

main()
