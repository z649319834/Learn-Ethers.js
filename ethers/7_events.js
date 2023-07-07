// 检索事件
// https://github.com/WTFAcademy/WTF-Ethers/blob/main/07_Event/readme.md
import { ethers, JsonRpcProvider, Contract } from "ethers"

const provider = new JsonRpcProvider(process.env.NETWORK_URL)

const main = async () => {
  const abi = [
    "function symbol() view returns (string)",
    "event Transfer(address indexed from, address indexed to, uint amount)",
  ]

  const addressZCZ = "0x89812BEFC977E21802b198FBEd9475846045D83f"

  const contract = new Contract(addressZCZ, abi, provider)

  const symbol = await contract.symbol()

  // const blockNumber = 3763420
  const blockNumber = await provider.getBlockNumber()
  console.log(`当前区块高度: ${blockNumber}`)

  console.log("获取过去10个区块内的Transfer事件")
  const transferEvents = await contract.queryFilter(
    "Transfer",
    blockNumber - 100,
    blockNumber
  )
  console.log(
    "打印出第1个: ",
    transferEvents[0].args[0],
    transferEvents[0].args[1],
    transferEvents[0].args[2]
  )

  if (!transferEvents[0]) return
  console.log(
    "解析事件：",
    ethers.formatUnits(ethers.getBigInt(transferEvents[0].args[2]), "ether")
  )
  // console.log("解析事件：")
  const amount = ethers.formatUnits(
    ethers.getBigInt(transferEvents[0].args[2]),
    "ether"
  )

  console.log(
    `地址 ${transferEvents[0].args[0]} 转账 ${amount} ${symbol} 到地址 ${transferEvents[0].args[1]}`
  )
}

main()
