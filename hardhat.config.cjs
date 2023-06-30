require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()

const { NETWORK_URL, WALLET_PRIVATE_KEY } = process.env
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: `${NETWORK_URL}`,
      accounts: [`${WALLET_PRIVATE_KEY}`],
    },
  },
  etherscan: {
    apiKey: "JAQ4CZM8BCQRDPSM3IZS2QGW5QV7EHB5CA",
  },
}
