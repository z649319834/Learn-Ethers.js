// 提供器Provider
import { ethers } from "ethers"

// 连接Sepolia测试网
console.log("provider:")
const provider = new ethers.JsonRpcProvider(
  `https://eth-sepolia.g.alchemy.com/v2/${process.env.API_KEY}`
)
console.log(provider)

const main = async () => {
  // console.log("signer===================")
  // const signer = await provider.getSigner()
  // console.log(signer)

  console.log("1: 查询余额", Object.keys(provider))
  const balance = await provider.getBalance(process.env.WALLET_KEY)
  console.log(`balance: ${ethers.formatEther(balance)} ETH`)

  console.log("2: 查询网络")
  const network = await provider?.getNetwork()
  console.log("network: ", network)

  console.log("3: 查询当前区块高度")
  const blockNumber = await provider.getBlockNumber()
  console.log("blockNumber: ", blockNumber)

  console.log("4. 查询当前建议的gas设置")
  const feeData = await provider.getFeeData()
  console.log("feeData: ", feeData)

  console.log("5. 查询区块信息")
  const block = await provider.getBlock(0)
  console.log("block: ", block)

  // 6. 给定合约地址查询合约bytecode
  console.log("6. 给定合约地址查询合约bytecode")
  const code = await provider.getCode(
    "0x639D4384b429ea4660f377B7A29dAe6d2255090f"
  )
  console.log("code: ", code)
}
main()
