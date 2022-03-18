import React from "react"
import {
  Description,
  SubTitle,
  Title,
  StatusBar,
  Web3Status,
  SymbolFilled,
  SymbolHollow,
} from "./HeaderElements"
import useWeb3Context from "../../Web3StateManagement/Web3Context"
import { FaRegDotCircle } from "react-icons/fa"
import { Textfit } from "react-textfit"

const Header = () => {
  const {
    state: { account, userStatus, network, enableInstallMM },
  } = useWeb3Context()
  let address = String(account)
  address =
    address.substring(0, 6) +
    "..." +
    address.substring(address.length - 4, address.length)

  return (
    <>
      <StatusBar>
        <Web3Status network={network} status={userStatus}>
          {enableInstallMM ? (
            <>
              <FaRegDotCircle className="status-icon" />
              {`No Wallet`}
            </>
          ) : account ? (
            <>
              <FaRegDotCircle className="status-icon" />
              {`${address} has connected to ${network}`}
            </>
          ) : userStatus === "Connecting" ? (
            <>
              <SymbolFilled />
              <SymbolHollow />
              {userStatus}
            </>
          ) : (
            <>
              <FaRegDotCircle className="status-icon" />
              {userStatus}
            </>
          )}
        </Web3Status>
      </StatusBar>
      <Title>A Web3 Database</Title>
      <SubTitle>
        <h3>Store messages on the blockchain</h3> <p>(For Free!)</p>
      </SubTitle>
      <Description>
        <Textfit className="fitter" mode="multi" max={18}>
          <b>Instructions:</b> Connect to the Rinkeby testnet with MetaMask and
          send a message to store on the blockchain
        </Textfit>
        <hr />
      </Description>
    </>
  )
}

export default Header
