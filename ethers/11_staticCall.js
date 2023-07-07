// staticCall https://github.com/WTFAcademy/WTF-Ethers/blob/main/11_StaticCall/readme.md

import { ethers, JsonRpcProvider, Contract, Wallet } from "ethers"

const ALCHEMY_MAINNET_URL =
  "https://eth-mainnet.g.alchemy.com/v2/oKmOQKbneVkxgHZfibs-iFhIlIAl6HDN"

// 利用私钥和provider创建wallet对象
const privateKey =
  "0x227dbb8586117d55284e26620bc76534dfbd2394be34cf4a09cb775d593b6f2b"

const provider = new JsonRpcProvider(ALCHEMY_MAINNET_URL)

const wallet = new Wallet(privateKey, provider)

const abi = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function balanceOf(address) public view returns(uint)",
  "function transfer(address, uint) public returns (bool)",
]
// DAI 合约地址
const address = "0x6B175474E89094C44Da98b954EedeAC495271d0F"

// 注意，这里生成合约时要用provider而不是wallet，不然则不能更改staticCall方法中的from（可能是bug，也可能是feature）。
const contract = new Contract(address, abi, provider)

const main = async () => {
  const address1 = await wallet.getAddress()
  const symbol = await contract.symbol()
  let balance = await contract.balanceOf(address1)
  let balance2 = await contract.balanceOf("vitalik.eth")
  let balance3 = await contract.balanceOf(process.env.WALLET_KEY_2)
  console.log(`${address1}持仓: ${ethers.formatEther(balance)} ${symbol}`)
  console.log(`vitalik.eth 持仓: ${ethers.formatEther(balance2)} ${symbol}`)
  console.log(`测试钱包持仓: ${ethers.formatEther(balance3)} ${symbol}`)

  console.log(
    `==========用staticCall尝试调用transfer转账1 ${symbol}，msg.sender为${process.env.WALLET_KEY_2}地址===========`
  )
  const tx = await contract.transfer.staticCall(
    "vitalik.eth",
    ethers.parseEther("10000"),
    { from: "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" }
  )
  console.log(`交易会成功吗？：`, tx)
  balance = await contract.balanceOf(address1)
  balance2 = await contract.balanceOf("vitalik.eth")
  console.log(`${address1}持仓: ${ethers.formatEther(balance)} ${symbol}`)
  console.log(`vitalik.eth 持仓: ${ethers.formatEther(balance2)} ${symbol}`)

  console.log(
    `==========用staticCall尝试调用transfer转账1 ${symbol}，msg.sender为测试地址===========`
  )
  const tx1 = await contract.transfer.staticCall(
    process.env.WALLET_KEY_2,
    ethers.parseEther("10000"),
    { from: process.env.WALLET_KEY_2 }
  )
  console.log(`交易会成功吗？：`, tx1)
  balance = await contract.balanceOf(address1)
  balance3 = await contract.balanceOf(process.env.WALLET_KEY_2)
  console.log(`${address1}持仓: ${ethers.formatEther(balance)} ${symbol}`)
  console.log(`测试地址持仓: ${ethers.formatEther(balance3)} ${symbol}`)
}
main()
