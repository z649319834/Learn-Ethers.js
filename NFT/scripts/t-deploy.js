async function main() {
  const baseTokenURI = "ipfs://QmSH2Gax9aFP5JBXnR23jSet5nBqYK88tejwibts9bibjz/"

  // Get owner/deployer's wallet address
  // const [owner] = await hre.ethers.getSigners()

  // Get contract that we want to deploy
  const contractFactory = await hre.ethers.getContractFactory("ANFT")

  // Deploy contract with the correct constructor arguments
  const contract = await contractFactory.deploy(baseTokenURI)

  // Wait for this transaction to be mined
  await contract.deployed()

  // Get contract address
  console.log("Contract deployed to:", contract.address)

  // let txn = await contract.mint()
  // await txn.wait()

  // // Reserve NFTs
  // let txn = await contract.reserveNFTs()
  // await txn.wait()
  // console.log("10 NFTs have been reserved")

  // // Mint 3 NFTs by sending 0.03 ether
  // txn = await contract.mints(3, { value: hre.ethers.utils.parseEther("0.003") })
  // await txn.wait()

  // // Get all token IDs of the owner
  // let tokens = await contract.tokensOfOwner(owner.address)
  // console.log("Owner has tokens: ", tokens)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
