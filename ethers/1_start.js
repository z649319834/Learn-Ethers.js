import { ethers, toNumber, getNumber, JsonRpcProvider } from "ethers"

const provider = new JsonRpcProvider(
  `https://eth-sepolia.g.alchemy.com/v2/1qr6Bdy3ZRNhCkAZFIqztdMJdBl_rUsJ`
)
const main = async () => {
  console.log("1: 查询余额") // 测试环境有限流，所以尽量少查询
  const balance = await provider.getBalance(process.env.WALLET_KEY)
  console.log(
    `balance: ETH Balance of ZCZ: ${balance} Wei | ${ethers.formatEther(
      balance
    )} ETH`
  )
  console.log(getNumber(balance, "number"))
}
main()
