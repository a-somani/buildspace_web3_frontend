import { ethers } from "ethers"
import abi from "../Utils/WavePortal.json"
import useWeb3Context from "../Web3StateManagement/Web3Context"
import { useEffect } from "react"

const useFetchMessages = () => {
  const contractAddress = "0x9003F1766fdC861D033d8c8c6a9A3468Ef33eFc8"
  const contractABI = abi.abi
  const {
    state: { fetchingMessages, account },
    fetchMessages,
    updateWaves,
    updateTotalWaveCount,
    updateUserWaveCount,
    updateUserWaves,
  } = useWeb3Context()

  useEffect(() => {
    if (fetchingMessages) {
      getAllWaves()
      fetchMessages(false)
    }
  }, [fetchMessages])

  const getAllWaves = async () => {
    try {
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const wavePortalContract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        )
        const waves = await wavePortalContract.getAllWaves()
        console.log(waves)
        let wavesProcessed = []
        waves.forEach((wave, index) => {
          const { waver, timestamp, message } = wave
          let convertedAddress = String(waver)
          convertedAddress =
            convertedAddress.substring(0, 6) +
            "..." +
            convertedAddress.substring(
              convertedAddress.length - 4,
              convertedAddress.length
            )
          let convertedTime = String(new Date(timestamp * 1000))
          const shortenIndex = convertedTime.indexOf(" (")
          if (shortenIndex > 0) {
            convertedTime = convertedTime.substr(0, shortenIndex)
          }

          wavesProcessed.push({
            index: `#${index + 1}`,
            address: String(waver),
            formatted_address: convertedAddress,
            timestamp: convertedTime,
            message: message,
          })
        })
        updateWaves(wavesProcessed)

        const userWaves = wavesProcessed.filter(
          (wave) => wave.address.toLowerCase() === account.toLowerCase()
        )
        updateUserWaves(userWaves)

        const totalCount = await wavePortalContract.getTotalWaves()
        console.log("total: " + totalCount.toNumber())
        updateTotalWaveCount(totalCount.toNumber())

        const userCount = await wavePortalContract.getUserWaves(account)
        console.log("user: " + userCount.toNumber())
        updateUserWaveCount(userCount.toNumber())

        console.log(wavesProcessed)
      }
    } catch (e) {
      console.log(e)
    }
  }

  return
}

export default useFetchMessages
