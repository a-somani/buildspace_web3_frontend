import DisplayMessages from "./Components/DisplayMessages"
import React, { useEffect } from "react"
import Header from "./Components/Header"
import Input from "./Components/Input"
import { UseCheckForWallet } from "./CustomHooks/useCheckForWallet"
import useWeb3Context from "./Web3StateManagement/Web3Context"
import { UseWave } from "./CustomHooks/useWave"
import TxDetails from "./Components/TxDetails"
import useFetchMessages from "./CustomHooks/useFetchMessages"

function App() {
  const {
    state: { account, userStatus },
    updateStatus,
  } = useWeb3Context()

  UseCheckForWallet()
  UseWave()
  useFetchMessages()

  //check for account or network changes not requested by app
  useEffect(() => {
    const handleChainChanged = () => {
      if (userStatus === "user requested switch") {
        //user requests switch by clicking 'switch to Rinkeby' button in Input component.
        console.log("chain change accepted")
        updateStatus("user accepted switch")
        window.location.reload()
      } else {
        //handles if user changes chain in wallet - not a function in frontend
        console.log("chain change!!")
        window.location.reload()
      }
    }
    const handleAccountChanged = (accounts) => {
      if (accounts.length > 0) {
        if (account) {
          //if there was already an account in state then that means they switched accounts
          console.log("acc change!!")
          window.location.reload()
        } else {
          //if there was no account stored in state then that means they have connected
          console.log("acc connected!!")
        }
      } else {
        //if there is no account now, they disconnected
        console.log("disconnected")
        window.location.reload()
      }
    }
    if (window.ethereum) {
      window.ethereum.on("chainChanged", handleChainChanged)
      window.ethereum.on("accountsChanged", handleAccountChanged)
    }
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("chainChanged", handleChainChanged)
        window.ethereum.removeListener("accountsChanged", handleAccountChanged)
      }
    }
  })

  return (
    <>
      <Header />
      <TxDetails />
      <Input />
      <DisplayMessages />
    </>
  )
}

export default App
