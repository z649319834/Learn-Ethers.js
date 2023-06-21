import { ethers, JsonRpcProvider, Contract, BigNumber } from "ethers"

// 连接Sepolia测试网
console.log("provider:")
const provider = new JsonRpcProvider(
  `https://eth-mainnet.g.alchemy.com/v2/oKmOQKbneVkxgHZfibs-iFhIlIAl6HDN`
)

console.log(provider)

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
  console.log(`名称: ${nameDAI}`)
  console.log(`代号: ${symbolDAI}`)
  console.log(`总供给: ${ethers.formatEther(totalSupplDAI)}`)
  console.log(`balanceDAI: ${ethers.formatEther(balanceDAI)}`)
}
main()
