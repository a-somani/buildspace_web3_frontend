import React, { createContext, useReducer, useContext } from "react"
import web3Reducer, { initialState } from "./web3Reducer"

const Web3Context = createContext(initialState)

export const Web3ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(web3Reducer, initialState)

  const updateTotalWaveCount = (count) => {
    dispatch({
      type: "UPDATE_TOTAL_WAVE_COUNT",
      payload: count,
    })
  }
  const updateUserWaveCount = (count) => {
    dispatch({
      type: "UPDATE_USER_WAVE_COUNT",
      payload: count,
    })
  }
  const updateUserWaves = (data) => {
    dispatch({
      type: "UPDATE_USER_WAVES",
      payload: data,
    })
  }
  const updateWaves = (data) => {
    dispatch({
      type: "UPDATE_ALL_WAVES",
      payload: data,
    })
  }
  const fetchMessages = (enable) => {
    dispatch({
      type: "FETCH_MESSAGES",
      payload: enable,
    })
  }
  const hideMessageInput = (enable) => {
    dispatch({
      type: "MESSAGE_INPUT",
      payload: !enable,
    })
  }
  const updateTxnMessage = (text) => {
    dispatch({
      type: "TXN_MESSAGE",
      payload: text,
    })
  }
  const updateTxnHash = (hash) => {
    dispatch({
      type: "TXN_HASH",
      payload: hash,
    })
  }
  const updateTxnStatus = (status) => {
    dispatch({
      type: "TXN_STATUS",
      payload: status,
    })
  }

  const updateStatus = (status) => {
    dispatch({
      type: "UPDATE_STATUS",
      payload: status,
    })
  }
  const updateNetwork = (network) => {
    dispatch({
      type: "UPDATE_NETWORK",
      payload: network,
    })
  }
  const noMMWallet = () => {
    dispatch({
      type: "NO_MM_WALLET",
    })
  }
  const noAuthAccount = () => {
    dispatch({
      type: "MM_NOT_AUTHORIZED",
    })
  }
  const authConnected = (address) => {
    dispatch({
      type: "MM_AUTHORIZED",
      payload: address,
    })
  }
  const toggleConnect = (boolean) => {
    dispatch({
      type: "UPDATE_CONNECT",
      payload: boolean,
    })
  }
  const toggleSwitch = (boolean) => {
    dispatch({
      type: "UPDATE_SWITCH",
      payload: boolean,
    })
  }

  return (
    <Web3Context.Provider
      value={{
        state,
        noMMWallet,
        noAuthAccount,
        authConnected,
        updateNetwork,
        updateStatus,
        toggleConnect,
        toggleSwitch,
        updateTxnMessage,
        updateTxnHash,
        updateTxnStatus,
        hideMessageInput,
        fetchMessages,
        updateWaves,
        updateTotalWaveCount,
        updateUserWaveCount,
        updateUserWaves,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

const useWeb3Context = () => {
  const context = useContext(Web3Context)
  if (context === undefined) {
    throw new Error(
      "useWeb3Context cannot be used outside of scope where context is provided"
    )
  }
  return context
}

export default useWeb3Context
