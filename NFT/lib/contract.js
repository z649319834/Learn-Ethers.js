import { ethers } from "ethers"
import { getContractAt } from "@nomiclabs/hardhat-ethers/internal/helpers"
import { env } from "./env"
import { getProvider } from "./provider"

export function getContract(name, hre) {
  const WALLET = new ethers.Wallet(env("ETH_PRIVATE_KEY"), getProvider())
  return getContractAt(hre, name, env("NFT_CONTRACT_ADDRESS"), WALLET)
}
