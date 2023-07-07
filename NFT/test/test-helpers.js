import sinon from "sinon"
import chai from "chai"
import sinonChai from "sinon-chai"
import { ethers as hardhatEthers, waffle } from "hardhat"

chai.use(sinonChai)

afterEach(() => {
  sinon.restore()
})

export function deployTestContract(name) {
  return hardhatEthers
    .getContractFactory(name, getTestWallet())
    .then((contractFactory) => contractFactory.deploy())
}

export function getTestWallet() {
  return waffle.provider.getWallets()[0]
}
