import React, { useState } from "react"
import {
  MessageBox,
  SubmitButton,
  MessageWrapper,
  InputWrapper,
  ConnectWallet,
  ConnectNetwork,
  InstallMM,
} from "./InputElements"
// import { ethers } from "ethers"
import useWeb3Context from "../../Web3StateManagement/Web3Context"
import MetaMaskOnboarding from "@metamask/onboarding"

const Input = () => {
  const [disableSubmit, setDisableSubmit] = useState(true)
  const [disableConnect, setDisableConnect] = useState(false)
  const [disableSwitch, setDisableSwitch] = useState(false)
  const [message, setMessage] = useState("")
  const {
    state: { showConnectWallet, enableMessageInput, network, enableInstallMM },
    noMMWallet,
    authConnected,
    updateStatus,
    updateTxnMessage,
    updateTxnStatus,
    fetchMessages,
  } = useWeb3Context()
  const onboarding = new MetaMaskOnboarding()

  const checkText = (e) => {
    setDisableSubmit(true)
    setMessage(e.target.value)
    if (e.target.value.length > 0) {
      setDisableSubmit(false)
    }
  }
  const connectWallet = async () => {
    setDisableConnect(true)
    try {
      const { ethereum } = window
      if (!ethereum) {
        //should not run
        noMMWallet()
        alert("Get MetaMask!")
        return
      }
      updateStatus("connecting")
      const accounts = await ethereum.request({ method: "eth_requestAccounts" })
      if (accounts.length !== 0) {
        console.log("Connected", accounts[0])
        authConnected(accounts[0])
        updateStatus("user approved and connected")
        fetchMessages(true)
        //console.log("user approved and connected")
      }
    } catch (err) {
      //console.log(err)
      if (err.code === 4001) {
        //console.log("user rejected approval in MM")
        updateStatus("User Rejected Approval")
        setDisableConnect(false)
      } else if (err.code === -32002) {
        console.log("already waiting for approval, check wallet")
      }
    }
  }
  const switchToRinkeby = async () => {
    setDisableSwitch(true)
    const { ethereum } = window
    try {
      updateStatus("user requested switch")
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x3" }],
      })
      //updateStatus("user accepted switch")
      //will refresh in app.js because chain changed if accepted, don't need to update status
    } catch (err) {
      if (err.code === 4001) {
        //console.log("user rejected switch in MM")
        updateStatus("user rejected switch")
        setDisableSwitch(false)
      } else if (err.code === -32002) {
        console.log("already waiting for approval, check wallet")
      }
    }
  }

  const submitMessage = () => {
    updateTxnStatus("Requested")
    setDisableSubmit(true)
    const submit = message
    setMessage("")
    updateTxnMessage(submit)
    //disable message input - re-enable after cooldown
    setDisableSubmit(false)
  }

  return (
    <InputWrapper>
      {enableInstallMM ? (
        <InstallMM
          onClick={(e) => {
            onboarding.startOnboarding()
          }}
        >
          Install MetaMask
        </InstallMM>
      ) : showConnectWallet ? (
        <ConnectWallet
          disabled={disableConnect}
          onClick={() => {
            connectWallet()
          }}
        >
          {disableConnect ? "Check Your Wallet" : "Connect Wallet"}
        </ConnectWallet>
      ) : (
        network &&
        network !== "Rinkeby" && (
          <ConnectNetwork
            disabled={disableSwitch}
            onClick={() => {
              switchToRinkeby()
            }}
          >
            {disableSwitch ? "Check Your Wallet" : "Switch to Rinkeby"}
          </ConnectNetwork>
        )
      )}
      {enableMessageInput && network === "Rinkeby" && (
        <MessageWrapper>
          <MessageBox
            rows="5"
            cols="50"
            id="message"
            name="message"
            placeholder="Enter a Message to Submit..."
            maxLength="1000"
            onChange={checkText}
            value={message}
            autoFocus={true}
          ></MessageBox>
          <SubmitButton disabled={disableSubmit} onClick={submitMessage}>
            {`SUBMIT (${message.length}/1000)`}
          </SubmitButton>
        </MessageWrapper>
      )}
    </InputWrapper>
  )
}

export default Input
