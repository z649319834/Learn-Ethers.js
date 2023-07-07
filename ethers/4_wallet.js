// 发送ETH
import { JsonRpcProvider, Wallet, formatEther, parseEther } from "ethers"

const main = async () => {
  // 连接Sepolia测试网
  const provider = new JsonRpcProvider(
    `https://eth-sepolia.g.alchemy.com/v2/${process.env.API_KEY}`
  )

  console.log("1、创建随机钱包地址================")
  const walletRandom = Wallet.createRandom()
  const walletRandomProvider = walletRandom.connect(provider)
  const mnemonic = walletRandomProvider.mnemonic.phrase
  const address1 = await walletRandomProvider.getAddress()
  console.log(
    "walletRandomProvider: ",
    walletRandomProvider,
    walletRandomProvider.privateKey,
    address1
  )

  console.log("2、使用私钥创建钱包地址================")
  const walletPrivite = new Wallet(process.env.WALLET_PRIVATE_KEY, provider)
  const address2 = await walletPrivite.getAddress()
  console.log(
    "walletPrivite: ",
    walletPrivite,
    walletPrivite.privateKey,
    address2
  )

  console.log("3、使用助记词创建钱包地址================")
  const walletMnemonic = Wallet.fromPhrase(mnemonic, provider)
  const address3 = await walletMnemonic.getAddress()
  console.log(
    "walletMnemonic: ",
    walletMnemonic,
    walletMnemonic.privateKey,
    address3,
    address3 === address1
  )

  console.log("4、获取链上交易次数")
  const count1 = await provider.getTransactionCount(address1)
  const count2 = await provider.getTransactionCount(address2)
  console.log(`count1=${count1} | count2=${count2}`)

  console.log("5、发送ETH-前==========")
  console.log(
    `钱包1： ${formatEther(
      await provider.getBalance(walletRandomProvider)
    )} ETH`
  )
  console.log(
    `钱包2： ${formatEther(await provider.getBalance(walletPrivite))} ETH`
  )
  const receipt1 = await walletPrivite.sendTransaction({
    to: address1,
    value: parseEther("0.001"),
  })
  await receipt1.wait() // 等待链上确认交易
  console.log("receipt1: ", receipt1)

  console.log("6、发送ETH-后==========")
  console.log(
    `钱包1： ${formatEther(
      await provider.getBalance(walletRandomProvider)
    )} ETH`
  )
  console.log(
    `钱包2： ${formatEther(await provider.getBalance(walletPrivite))} ETH`
  )

  console.log("7、发送ETH-转账回来后==========")
  const receipt2 = await walletRandomProvider.sendTransaction({
    to: address2,
    value: parseEther("0.0009"),
  })
  await receipt2.wait() // 等待链上确认交易
  console.log("receipt: ", receipt2)

  console.log(
    `钱包1： ${formatEther(
      await provider.getBalance(walletRandomProvider)
    )} ETH`
  )
  console.log(
    `钱包2： ${formatEther(await provider.getBalance(walletPrivite))} ETH`
  )
}
main()
