import { ethers } from "ethers"
import abi from "../Utils/WavePortal.json"
import useWeb3Context from "../Web3StateManagement/Web3Context"
import { useEffect } from "react"

export const UseWave = async () => {
  const contractAddress = "0x9003F1766fdC861D033d8c8c6a9A3468Ef33eFc8"
  const contractABI = abi.abi
  const {
    updateTxnMessage,
    updateTxnHash,
    updateTxnStatus,
    state: { txnMessage, noMMWallet, txnStatus },
    hideMessageInput,
    fetchMessages,
  } = useWeb3Context()

  useEffect(() => {
    if (txnMessage && txnStatus === "Requested") {
      const message = txnMessage
      submitTxn(message)
      updateTxnMessage("")
    } else if (txnStatus) {
      console.log("please wait for cooldown")
    }
  }, [txnMessage])

  const submitTxn = async (waveMessage) => {
    try {
      hideMessageInput(true)
      const { ethereum } = window

      if (ethereum) {
        //setup connection to ethereum
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        )

        //wave transaction - write function in smart contract
        const waveTxn = await wavePortalContract.wave(waveMessage)
        console.log(new Date() + " Mining...", waveTxn.hash)
        updateTxnHash(waveTxn.hash)
        updateTxnStatus("Mining")

        await waveTxn.wait()
        console.log(new Date() + " Mined...", waveTxn.hash)
        updateTxnStatus("Mined")
        setTimeout(() => {
          updateTxnStatus("")
          hideMessageInput(false)
          fetchMessages(true)
        }, 60000)
      } else {
        console.log("No eth object")
        noMMWallet()
      }
    } catch (err) {
      if (err.code === 4001) {
        console.log("user rejected TX approval in MM")
        hideMessageInput(false)
        updateTxnStatus("")
      } else {
        console.log(err)
      }
    }
  }
}
