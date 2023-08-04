// 读取合约信息
import { ethers, JsonRpcProvider, Contract } from "ethers"

// 连接Sepolia测试网
const provider = new JsonRpcProvider(
  `https://eth-mainnet.g.alchemy.com/v2/oKmOQKbneVkxgHZfibs-iFhIlIAl6HDN`
)

const main = async () => {
  const abiERC20 = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)",
  ]
  const addressDAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F"
  const contract = new Contract(addressDAI, abiERC20, provider)
  const nameDAI = await contract.name()
  const symbolDAI = await contract.symbol()
  const totalSupplDAI = await contract.totalSupply()
  const balanceDAI = await contract.balanceOf(
    "0x6B175474E89094C44Da98b954EedeAC495271d0F"
  )
  console.log("1. 读取DAI合约信息", contract)
  console.log(`合约地址: ${addressDAI}`)
  console.log(`gas: ${JSON.stringify((await provider.getFeeData()).toJSON())}`)
  console.log(`名称: ${nameDAI}`)
  console.log(`代号: ${symbolDAI}`)
  console.log(`总供给: ${ethers.formatEther(totalSupplDAI)}`)
  console.log(`balanceDAI: ${ethers.formatEther(balanceDAI)}`)
  let n = 0
  const timer = setInterval(async () => {
    if (n === 600) {
      clearInterval(timer)
      console.log(
        "10分钟后查询gas价格: ",
        JSON.stringify((await provider.getFeeData()).toJSON())
      )
    } else {
      n += 1
      console.log(`延时：${n}秒`)
    }
  }, 1000)
}
main()
{"_type":"FeeData","gasPrice":"13804425015","maxFeePerGas":"28839491722","maxPriorityFeePerGas":"1000000000"}