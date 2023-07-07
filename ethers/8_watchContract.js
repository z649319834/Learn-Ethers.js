// 监听合约事件
// https://github.com/WTFAcademy/WTF-Ethers/blob/main/08_ContractListener/readme.md

import { ethers, JsonRpcProvider, Contract, Wallet } from "ethers"

const provider = new JsonRpcProvider(
  // "https://eth-mainnet.g.alchemy.com/v2/oKmOQKbneVkxgHZfibs-iFhIlIAl6HDN"
  process.env.NETWORK_URL
)

const abi = [
  "function symbol() view returns (string)",
  "function transfer(address, uint) public returns (bool)",
  "function balanceOf(address) public view returns(uint)",
  "event Transfer(address indexed from, address indexed to, uint amount)",
]

const address = "0x89812BEFC977E21802b198FBEd9475846045D83f"
// const address = "0xdac17f958d2ee523a2206206994597c13d831ec7"

const main = async () => {
  const wallet1 = new Wallet(process.env.WALLET_PRIVATE_KEY, provider)
  const wallet2 = new Wallet(process.env.WALLET_PRIVATE_KEY_2, provider)
  // 可读写钱包
  const contract1 = new Contract(address, abi, wallet1)
  const contract2 = new Contract(address, abi, wallet2)
  const symbol = await contract1.symbol()
  console.log(
    `查询${symbol}余额:  ${ethers.formatEther(
      await contract1.balanceOf(wallet1)
    )} ${symbol}`
  )
  console.log(
    `查询自己账户余额:  ${ethers.formatEther(
      await contract2.balanceOf(wallet2)
    )} ${symbol}`
  )

  // 监听合约转账事件,可以运行 "node 5_writeContract.js "监听转账的变化
  contract1.on("Transfer", async (form, to, value) => {
    console.log(
      `Transfer:  ${form} -->  ${to} -->  ${ethers.formatUnits(
        ethers.getBigInt(value),
        "ether"
      )}`
    )
    console.log(
      `查询${symbol}余额:  ${ethers.formatEther(
        await contract1.balanceOf(wallet1)
      )} ${symbol}`
    )
    console.log(
      `查询自己账户余额:  ${ethers.formatEther(
        await contract2.balanceOf(wallet2)
      )} ${symbol}`
    )
  })

  console.log("转账一笔可以看到事件被触发")
  const tx = await contract1.transfer(
    process.env.WALLET_KEY_2,
    ethers.parseEther("10")
  )
  await tx.wait()
}

main()
