import { useEffect } from "react"
import useWeb3Context from "../Web3StateManagement/Web3Context"

export const UseCheckForWallet = async () => {
  const {
    noMMWallet,
    noAuthAccount,
    authConnected,
    updateNetwork,
    updateStatus,
    fetchMessages,
  } = useWeb3Context()

  useEffect(() => {
    async function checkWallet() {
      try {
        const { ethereum } = window
        //check for MM wallet
        if (!ethereum) {
          noMMWallet()
          console.log("make sure you have metamask")
        } else {
          console.log("we have eth object", ethereum)
          let network = await ethereum.request({ method: "eth_chainId" })
          if (network === "0x1") {
            network = "Ethereum Mainnet"
          } else if (network === "0x3") {
            network = "Ropsten"
          } else if (network === "0x4") {
            network = "Rinkeby"
          } else if (network === "0x5") {
            network = "Goerli"
          } else if (network === "0x2a") {
            network = "Kovan"
          }
          updateNetwork(network)
        }
        //check if authorized access to MM wallet
        updateStatus("Connecting")
        const accounts = await ethereum.request({ method: "eth_accounts" })
        if (accounts.length !== 0) {
          const account = accounts[0]
          console.log("Found an authorized account: ", account)
          authConnected(account)
          fetchMessages(true)
        } else {
          console.log("No authorized account found")
          noAuthAccount()
          updateStatus("Not Connected")
        }
      } catch (error) {
        if (
          error.message !==
          "Cannot read properties of undefined (reading 'request')"
        ) {
          console.log(error)
        }
      }
    }
    checkWallet()
  }, [])

  return
}
