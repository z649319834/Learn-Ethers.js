// 合约交互
// https://github.com/WTFAcademy/WTF-Ethers/blob/main/05_WriteContract/readme.md
import { JsonRpcProvider, Wallet, Contract, ethers } from "ethers"
const main = async () => {
  const provider = new JsonRpcProvider(
    `https://eth-sepolia.g.alchemy.com/v2/${process.env.API_KEY}`
  )

  const wallet = new Wallet(process.env.WALLET_PRIVATE_KEY, provider)

  /**
 * 创建可写LINK合约变量，我们在ABI中加入了4个我们要调用的函数：
    balanceOf(address)：查询地址的LINK余额。
    transfer(adress, uint256)：转账。
 */
  const abi = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function balanceOf(address) public view returns(uint)",
    "function transfer(address, uint) public returns (bool)",
  ]
  // ZCZ 合约地址
  const address = "0x89812BEFC977E21802b198FBEd9475846045D83f"
  // 必须是可读写的合约，取决于最后一个参数是Provider还是Signer
  const contract = new Contract(address, abi, wallet)

  const symbol = await contract.symbol()

  let balance = await contract.balanceOf(wallet)
  console.log(
    `1、查询余额:  ${balance} | ${ethers.formatEther(balance)} ${symbol}`
  )

  // 给自己的另一个账户转账
  const tx = await contract.transfer(
    process.env.WALLET_KEY_2,
    ethers.parseEther("10")
  )
  console.log("tx: ", tx)
  // 等待交易上链
  await tx.wait()
  console.log(`交易详情：`, tx)
  balance = await contract.balanceOf(wallet)
  console.log(
    `3、查询余额:  ${ethers.formatEther(balance)} ${symbol} ｜ ${balance}`
  )
}
main()
