import { getDefaultProvider, JsonRpcProvider, formatUnits } from "ethers"

// 连接主网
const provider = new JsonRpcProvider(
  "https://eth-mainnet.g.alchemy.com/v2/VNpQcShahsCcVcQQdNeR6jqPX_hEVtfN"
)

const main = async () => {
  // 获取当前时间的gas费用
  const feedata = await provider.getFeeData()
  console.log("toJSON: ", feedata.toJSON())
  console.log("gasPrice: ", `${formatUnits(feedata.gasPrice, "gwei")}Gwei`)
  console.log(
    "maxFeePerGas: ",
    `${formatUnits(feedata.maxFeePerGas, "gwei")}Gwei`
  )
  console.log(
    "maxPriorityFeePerGas: ",
    `${formatUnits(feedata.maxPriorityFeePerGas, "gwei")}Gwei`
  )
}

main()
