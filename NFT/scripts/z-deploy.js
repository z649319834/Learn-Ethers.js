async function main() {
  const [deployer] = await ethers.getSigners()

  console.log("Deploying contracts with the account:", deployer.address)

  const NFT = await ethers.getContractFactory("ZNFT")
  const nft = await NFT.deploy()
  console.log("nft address:", await nft.address)
}
// 0x8f8F59ab3efFDdcD64b285780b2DD8B575Ce47Ae
// https://testnets.opensea.io/assets/sepolia/0x8f8f59ab3effddcd64b285780b2dd8b575ce47ae/1
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
