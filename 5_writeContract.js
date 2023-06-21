// https://github.com/WTFAcademy/WTF-Ethers/blob/main/05_WriteContract/readme.md
import { JsonRpcProvider, Wallet, Contract, ethers } from "ethers"

// console.log(ethers.formatEther(1))
// process.exit()

const main = async () => {
  const provider = new JsonRpcProvider(
    `https://eth-sepolia.g.alchemy.com/v2/${process.env.API_KEY}`
  )

  const wallet = new Wallet(process.env.WALLET_PRIVATE_KEY_2, provider)

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
  // LINK 合约地址
  const addressLINK = "0x779877A7B0D9E8603169DdbD7836e478b4624789"
  const contract = new Contract(addressLINK, abi, wallet)

  let balanceLINK = await contract.balanceOf(wallet)
  console.log(
    `1、查询LINK 余额:  ${balanceLINK} | ${ethers.formatEther(
      balanceLINK
    )} LINK`
  )

  // 给自己的另一个账户转账
  const tx = await contract.transfer(
    process.env.WALLET_KEY,
    ethers.parseEther("1")
  )
  console.log("tx: ", tx)
  // 等待交易上链
  await tx.wait()
  console.log(`交易详情：`, tx)
  balanceLINK = await contract.balanceOf(wallet)
  console.log(
    `3、查询LINK 余额:  ${ethers.formatEther(
      balanceLINK
    )} LINK ｜ ${balanceLINK}`
  )
}
main()
