import { ethers } from "ethers"

export function getProvider() {
  // return ethers.getDefaultProvider('sepolia', {sepolia:process.env.API_KEY})
  return new ethers.JsonRpcProvider(
    `https://eth-sepolia.g.alchemy.com/v2/${process.env.API_KEY}`
  )
}
