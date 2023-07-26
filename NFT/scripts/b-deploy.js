async function main() {
  const baseTokenURI = "ipfs://QmSH2Gax9aFP5JBXnR23jSet5nBqYK88tejwibts9bibjz/"

  // Get owner/deployer's wallet address
  // const [owner] = await hre.ethers.getSigners()

  // Get contract that we want to deploy
  const contractFactory = await hre.ethers.getContractFactory("BNFT")

  // Deploy contract with the correct constructor arguments
  const contract = await contractFactory.deploy(baseTokenURI)

  // Wait for this transaction to be mined
  await contract.deployed()

  // Get contract address
  console.log("Contract deployed to:", contract.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
