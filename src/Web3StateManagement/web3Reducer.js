export const initialState = {
  account: undefined,
  network: undefined,
  web3Status: "",
  //web3Status is for managing the status of metamask
  //ie: web3Status takes the values: "Please get a MetaMask wallet", "No authorized account found", "Connected"
  userStatus: "",
  //userStatus is for monitoring the user's interactions - like accepting/denying requests in MM or click/inputting buttons/fields
  enableInstallMM: false,
  showConnectWallet: false,
  enableMessageInput: false,
  displayMessages: false,
  txnMessage: "",
  txnStatus: "",
  txnHash: "",
  fetchingMessages: false,
  allWaves: [],
  userWaves: [],
  totalWaveCount: undefined,
  userWaveCount: undefined,
}

const web3Reducer = (state, action) => {
  const { type, payload } = action

  switch (type) {
    case "UPDATE_TOTAL_WAVE_COUNT":
      return {
        ...state,
        totalWaveCount: payload,
      }
    case "UPDATE_USER_WAVE_COUNT":
      return {
        ...state,
        userWaveCount: payload,
      }
    case "UPDATE_USER_WAVES":
      return {
        ...state,
        userWaves: payload,
      }
    case "UPDATE_ALL_WAVES":
      return {
        ...state,
        allWaves: payload,
      }
    case "FETCH_MESSAGES":
      payload && console.log("FETCH_MESSAGES " + payload)
      return {
        ...state,
        fetchingMessages: payload,
      }
    case "MESSAGE_INPUT":
      console.log("MESSAGE_INPUT " + payload)
      return {
        ...state,
        enableMessageInput: payload,
      }
    case "TXN_HASH":
      console.log("TXN_HASH: " + payload)
      return {
        ...state,
        txnHash: payload,
      }
    case "TXN_STATUS":
      console.log("TXN_STATUS: " + payload)
      return {
        ...state,
        txnStatus: payload,
      }
    case "TXN_MESSAGE":
      console.log("TXN_MESSAGE: " + payload)
      return {
        ...state,
        txnMessage: payload,
      }
    case "UPDATE_STATUS":
      console.log("UPDATE_STATUS: " + payload)
      return {
        ...state,
        userStatus: payload,
      }
    case "UPDATE_NETWORK":
      console.log("UPDATE_NETWORK: " + payload)
      return {
        ...state,
        network: payload,
      }
    case "NO_MM_WALLET":
      console.log("NO_MM_WALLET")
      //show install MM message
      //hide connect wallet
      //hide message input
      //hide all messages display
      return {
        ...state,
        account: undefined,
        web3Status: "Please get a MetaMask wallet",
        enableInstallMM: true,
        showConnectWallet: false,
        enableMessageInput: false,
        displayMessages: false,
      }
    case "MM_NOT_AUTHORIZED":
      console.log("MM_NOT_AUTHORIZED")
      //hide install MM message
      //show connect wallet
      //disable message input
      //hide all messages display
      return {
        ...state,
        account: undefined,
        web3Status: "No authorized account found",
        enableInstallMM: false,
        showConnectWallet: true,
        enableMessageInput: false,
        displayMessages: false,
      }
    case "MM_AUTHORIZED":
      console.log("MM_AUTHORIZED")

      //hide install MM message
      //hide connect wallet
      //enable message input
      //enable all messages display
      return {
        ...state,
        account: payload,
        web3Status: "Connected",
        enableInstallMM: false,
        showConnectWallet: false,
        enableMessageInput: true,
        displayMessages: false,
        userStatus: "Connected",
      }
    case "MM_SIGNED_MESSAGE":
      //???
      return {
        ...state,
        web3Status: "Message sent",
      }
    default:
      throw new Error(`No case matching type:${type}`)
  }
}

export default web3Reducer
