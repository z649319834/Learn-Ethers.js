import { ethers } from "ethers"
import { env } from "./env"
import { getProvider } from "./provider"

export function getWallet() {
  const provider = getProvider()
  console.log("provider:", provider)
  return new ethers.Wallet(env("WALLET_PRIVATE_KEY"), provider)
}
