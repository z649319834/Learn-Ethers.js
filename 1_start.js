import { ethers } from "ethers"

const provider = ethers.getDefaultProvider(
  `https://eth-sepolia.g.alchemy.com/v2/${process.env.API_KEY}`
)
const main = async () => {
  console.log("1: 查询余额") // 测试环境有限流，所以尽量少查询
  const balance = await provider.getBalance(process.env.WALLET_KEY)
  console.log(
    `balance: ETH Balance of ZCZ: ${balance} Wei | ${ethers.formatEther(
      balance
    )} ETH`
  )
}
main()
