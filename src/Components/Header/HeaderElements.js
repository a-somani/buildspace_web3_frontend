import styled from "styled-components"
import { DotCircle as DotCircleInv } from "@styled-icons/fa-solid/DotCircle"
import { DotCircle } from "@styled-icons/fa-regular/DotCircle"

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 900px;
  margin: 0px auto;
`

export const Title = styled.h1`
  font-weight: 500;
  font-size: 50px;
  padding-top: 50px;
  margin: 0px;
  color: #1167b1;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 35px;
  }
  @media screen and (max-width: 480px) {
    font-size: 30px;
    padding-top: 30px;
    margin-bottom: -5px;
  }
`
export const SubTitle = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  padding-bottom: 20px;
  h3 {
    font-weight: 600;
    font-style: italic;
    font-size: 20px;
    margin: 0px;
    color: #676767;
    padding-top: 10px;
    position: absolute;
  }
  p {
    font-size: 12px;
    padding-left: 420px;
    color: #2a9df4;
  }
  @media screen and (max-width: 768px) {
    h3 {
      font-size: 16px;
    }
    p {
      font-size: 10px;
      padding-left: 340px;
      color: #2a9df4;
    }
  }
  @media screen and (max-width: 480px) {
    h3 {
      font-size: 12px;
    }
    p {
      font-size: 9px;
      padding-left: 260px;
      color: #2a9df4;
    }
  }
`
export const Description = styled.div`
  color: #676767;
  text-align: center;
  padding: 0 5% 0 5%;
  font-weight: 400;
  margin-top: 10px;
  .fitter {
    height: 20px;
    @media screen and (max-width: 840px) {
      height: 40px;
    }
  }
  b {
    font-weight: 600;
  }
  hr {
    margin-top: 20px;
    border-top: 1px solid #bbb;
    margin-bottom: 50px;
    //borderRadius: "2px",
  }
  @media screen and (max-width: 768px) {
    //font-size: 14px;
    .fitter {
      height: 40px;
    }
    margin: 5px;
    hr {
      margin-top: 10px;
      margin-bottom: 30px;
    }
  }
  @media screen and (max-width: 480px) {
    hr {
      margin-top: 30px;
      margin-bottom: 20px;
    }
    margin: 0px;
    //font-size: 12px;
  }
`
export const StatusBar = styled.div`
  width: 100%;
  height: 30px;
  position: absolute;
`
export const Web3Status = styled.p`
  --size: 15px;
  font-size: var(--size);
  padding: 0px 15px 0px 0px;
  position: absolute;
  right: 0px;
  @media screen and (max-width: 768px) {
    --size: 12px;
  }
  @media screen and (max-width: 480px) {
    --size: 10px;
  }
  .status-icon {
    color: ${({ network }) => (network === "Goerli" ? "#32cd32" : "#F6BE00")};
    color: ${({ status }) => status === "Not Connected" && "#8b0000"};
    color: ${({ status }) => status === "User Rejected Approval" && "#8b0000"};

    aspect-ratio: inherit;
    width: var(--size);
    margin-right: 5px;
    margin-bottom: -2px;
  }
`
export const SymbolFilled = styled(DotCircleInv)`
  color: #32cd32;
  aspect-ratio: inherit;
  width: 15px;
  padding-bottom: 2px;
  animation: loading1 4s ease 0s infinite;
  margin-right: -16px;
  @keyframes loading1 {
    0% {
      opacity: 0;
    }
    25% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
`
export const SymbolHollow = styled(DotCircle)`
  color: #32cd32;
  aspect-ratio: inherit;
  width: 17px;
  padding-bottom: 2px;
  margin-right: 5px;
  animation: loading2 4s ease 0s infinite;
  @keyframes loading2 {
    0% {
      opacity: 1;
    }
    25% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 1;
    }
  }
`
