// 编码calldata https://github.com/WTFAcademy/WTF-Ethers/blob/main/13_EncodeCalldata/readme.md

import { ethers, JsonRpcProvider, Wallet, Contract } from "ethers"

// ZCZ的ABI
const abi = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function balanceOf(address) public view returns(uint)",
  "function transfer(address, uint) public returns (bool)",
]

// ZCZ合约地址
const addressZCZ = "0x89812BEFC977E21802b198FBEd9475846045D83f"

const provider = new JsonRpcProvider(process.env.NETWORK_URL)
const wallet = new Wallet(process.env.WALLET_PRIVATE_KEY, provider)
const contract = new Contract(addressZCZ, abi, wallet)

const main = async () => {
  const address = await wallet.getAddress()
  const balanceOfCode = contract.interface.encodeFunctionData("balanceOf", [
    address,
  ])
  console.log(`balanceOfCode: ${balanceOfCode}`)

  // 查询账户金额
  let balance = await provider.call({
    to: addressZCZ,
    data: balanceOfCode,
  })
  console.log(`当前账户${address}总额： ${ethers.formatEther(balance)} ZCZ`)
  console.log(
    `当前账户${process.env.WALLET_KEY_2}总额： ${ethers.formatEther(
      await contract.balanceOf(process.env.WALLET_KEY_2)
    )} ZCZ`
  )

  // 转账
  const transferCode = contract.interface.encodeFunctionData("transfer", [
    process.env.WALLET_KEY_2,
    ethers.parseEther("10"),
  ])

  console.log(`transferCode: ${transferCode}`)

  // 未知错误，以后解决
  // const tx = await provider.call({
  //   to: addressZCZ,
  //   data: transferCode,
  // })
  const tx = await contract.transfer(
    process.env.WALLET_KEY_2,
    ethers.parseEther("10")
  )
  await tx.wait()
  console.log(`交易详情： ${tx}`)

  balance = await contract.balanceOf(address)
  console.log(`当前账户${address}总额： ${ethers.formatEther(balance)} ZCZ`)
  console.log(
    `当前账户${process.env.WALLET_KEY_2}总额： ${ethers.formatEther(
      await contract.balanceOf(process.env.WALLET_KEY_2)
    )} ZCZ`
  )
}

main()
