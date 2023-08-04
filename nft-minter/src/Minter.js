import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./util/interact.js"
const axios = require("axios")

const Minter = (props) => {
  const [walletAddress, setWallet] = useState("")
  const [status, setStatus] = useState("")
  let tokenId = localStorage.getItem("tokenId") || 0
  const [name, setName] = useState(`ZNFT-${tokenId}`)
  const [description, setDescription] = useState("test NFT")
  const [url, setURL] = useState(
    "ipfs://QmYneUr6DADEC8RRoFXmdfN1ditVw8EpixFaXBivu5YuF7"
  )
  const [file, setFile] = useState()

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected()

    setWallet(address)
    setStatus(status)

    addWalletListener()
  }, [])

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0])
          setStatus("👆🏽 Write a message in the text-field above.")
        } else {
          setWallet("")
          setStatus("🦊 Connect to Metamask using the top right button.")
        }
      })
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      )
    }
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet()
    setStatus(walletResponse.status)
    setWallet(walletResponse.address)
  }

  const onMintPressed = async () => {
    const { success, status } = await mintNFT(url, name, description)
    setStatus(status)
    tokenId = Number(tokenId) + 1
    localStorage.setItem("tokenId", tokenId)
    if (success) {
      setName(`ZNFT-${tokenId}`)
    }
  }

  return (
    <div className="Minter">
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <br></br>
      <h1 id="title">🧙‍♂️ Alchemy NFT Minter</h1>
      <p>
        Simply add your asset's link, name, and description, then press "Mint."
      </p>
      <form>
        <h2>🖼 Link to asset: </h2>
        <input
          value={url}
          type="text"
          placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
          onChange={(event) => setURL(event.target.value)}
        />
        <input
          type="file"
          onChange={(event) => setFile(event.target.files[0])}
        ></input>
        <h2>🤔 Name: </h2>
        <input
          value={name}
          type="text"
          placeholder="e.g. My first NFT!"
          onChange={(event) => setName(event.target.value)}
        />
        <h2>✍️ Description: </h2>
        <input
          value={description}
          type="text"
          placeholder="e.g. Even cooler than cryptokitties ;)"
          onChange={(event) => setDescription(event.target.value)}
        />
      </form>
      <button id="mintButton" onClick={onMintPressed}>
        Mint NFT
      </button>
      <p id="status" style={{ color: "red" }}>
        {status}
      </p>
    </div>
  )
}

export default Minter
