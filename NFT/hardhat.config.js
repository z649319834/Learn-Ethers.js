require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()

require("@nomiclabs/hardhat-ethers")

const { API_KEY, WALLET_PRIVATE_KEY } = process.env
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${API_KEY}`,
      accounts: [WALLET_PRIVATE_KEY],
    },
  },
}

// import("@nomiclabs/hardhat-ethers")
// import("@nomiclabs/hardhat-waffle")
// const dotenv = require("dotenv")
// // You need to export an object to set up your config
// // Go to https://hardhat.org/config/ to learn more

// const argv = JSON.parse(env("npm_config_argv"))
// if (argv.original !== ["hardhat", "test"]) {
//   dotenv.config()
// }

// import("./tasks/nft")

// const config = {
//   solidity: "0.8.6",
// }

// // export default config
