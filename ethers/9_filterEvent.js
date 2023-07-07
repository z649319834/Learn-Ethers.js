// 事件过滤 https://github.com/WTFAcademy/WTF-Ethers/blob/main/09_EventFilter/readme.md

import { ethers, JsonRpcProvider, Contract } from "ethers"

// USDT合约地址
const addressUSDT = "0xdac17f958d2ee523a2206206994597c13d831ec7"
// 币安交易所钱包地址
const addressBIAN = "0x28C6c06298d514Db089934071355E5743bf21d60"

const abi = [
  "event Transfer(address indexed from, address indexed to, uint value)",
  "function balanceOf(address) public view returns(uint)",
]

const provider = new JsonRpcProvider(
  "https://eth-mainnet.g.alchemy.com/v2/VNpQcShahsCcVcQQdNeR6jqPX_hEVtfN"
)
const main = async () => {
  const contract = new Contract(addressUSDT, abi, provider)
  const balance = await contract.balanceOf(addressBIAN)
  console.log(`币安USDT总额: ${ethers.formatUnits(balance, 6)} USDT`)

  console.log("创建过滤器，监听USDT转进交易所========")

  const bianFilterTransferIn = contract.filters.Transfer(null, addressBIAN)
  const bianFilterTransferOut = contract.filters.Transfer(addressBIAN)
  console.log("过滤器详情：")
  contract.on(bianFilterTransferIn, (res) => {
    console.log("---------监听USDT进入交易所--------", res.args)
    console.log(
      `${res.args[0]} -> ${res.args[1]} ${ethers.formatUnits(res.args[2], 6)}`
    )
  })
  contract.on(bianFilterTransferOut, (res) => {
    console.log("---------监听USDT转出交易所--------", res.args)
    console.log(
      `${res.args[0]} -> ${res.args[1]} ${ethers.formatUnits(res.args[2], 6)}`
    )
  })
}

main()
