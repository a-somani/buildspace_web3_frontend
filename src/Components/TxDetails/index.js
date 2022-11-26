import React, { useState, useEffect, useRef } from "react"
import useWeb3Context from "../../Web3StateManagement/Web3Context"
import {
  Gif,
  StatusText,
  GifContainer,
  Dot1,
  Dot2,
  Dot3,
  BarWrapper,
  TextWrapper,
  LoadingText,
} from "./TxDetailsElements"
import MiningMiner from "../../Assets/mining_miner.gif"
import WalkingMiner from "../../Assets/walking_miner.gif"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const TxDetails = () => {
  const {
    state: { txnStatus, txnHash },
  } = useWeb3Context()
  const [userMessageIndex, setUserMessageIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const timerRef = useRef()

  useEffect(() => {
    if (txnStatus === "Requested") {
      setUserMessageIndex(1)
    } else if (txnStatus === "Mining") {
      setUserMessageIndex(2)
    } else if (txnStatus === "Mined") {
      setUserMessageIndex(3)
      setTimeLeft(59)
      timerRef.current = setInterval(() => {
        tick()
      }, 1000)
      setTimeout(() => {
        clearInterval(timerRef.current)
      }, 59000)
    } else {
      setUserMessageIndex(0)
    }
  }, [txnStatus])

  function tick() {
    setTimeLeft((prev) => prev - 1)
  }

  return (
    userMessageIndex > 0 && (
      <>
        {userMessageIndex === 1 && (
          <TextWrapper>
            <LoadingText>
              <p>The miners are ready for your message</p>
              <Dot1 />
              <Dot2 />
              <Dot3 />
            </LoadingText>
          </TextWrapper>
        )}

        {userMessageIndex === 2 && (
          <TextWrapper>
            <LoadingText>
              <p>
                The miners are working hard to mine your{" "}
                <a
                  href={`//Goerli.etherscan.io/tx/${txnHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  transaction
                </a>
              </p>
              <Dot1 />
              <Dot2 />
              <Dot3 />
            </LoadingText>
          </TextWrapper>
        )}
        {userMessageIndex === 3 && (
          <>
            <TextWrapper>
              <StatusText>
                Your{" "}
                <a
                  href={`//Goerli.etherscan.io/tx/${txnHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  transaction
                </a>{" "}
                was mined. Your message is now saved on the Goerli Network!
              </StatusText>
              <StatusText>
                <em>
                  Please wait before sending a new message. There's a 60 second
                  cooldown in the contract.
                </em>
              </StatusText>
            </TextWrapper>
            <BarWrapper>
              <CircularProgressbar
                value={Math.round((timeLeft * 100) / 60)}
                text={`${timeLeft}s`}
                styles={buildStyles({
                  textColor: "#676767",
                  pathColor: "#1167b1",
                  tailColor: "rgba(255,255,255,.2)",
                })}
              />
            </BarWrapper>
          </>
        )}
        <GifContainer>
          {userMessageIndex === 1 && <Gif src={WalkingMiner} />}
          {userMessageIndex === 2 && <Gif src={MiningMiner} />}
        </GifContainer>
      </>
    )
  )
}

export default TxDetails
