import styled from "styled-components"
export const TextWrapper = styled.div`
  //width: 90%;
  //padding: 5%;
  margin-top: -20px;
  @media screen and (max-width: 768px) {
    margin-top: 0px;
  }
`
export const StatusText = styled.div`
  font-size: 20px;
  color: #676767;
  font-weight: 500;
  width: 100%;
  align-self: center;
  text-align: center;
  justify-content: center;
  width: 80%;
  padding: 0 10%;
  margin-bottom: 30px;

  a {
    color: #1167b1;
  }
  em {
    color: #1167b1;
  }
  @media screen and (max-width: 1200px) {
    font-size: 18px;
  }
  @media screen and (max-width: 1000px) {
    font-size: 16px;
  }
  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
  @media screen and (max-width: 480px) {
    font-size: 11px;
  }
`
export const GifContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
`
export const Gif = styled.img`
  width: 50%;

  @media screen and (max-width: 1200px) {
    width: 55%;
  }
  @media screen and (max-width: 1000px) {
    width: 60%;
  }
  @media screen and (max-width: 850px) {
    width: 72%;
  }
  @media screen and (max-width: 600px) {
    width: 84%;
  }
`

export const LoadingText = styled(StatusText)`
  display: flex;
  flex-direction: row;
  margin-bottom: -10px;
  margin-top: -40px;
`

export const Dot = styled.div`
  --size: 7px;
  @media screen and (max-width: 1000px) {
    --size: 5px;
  }
  @media screen and (max-width: 768px) {
    --size: 4.5px;
  }
  @media screen and (max-width: 480px) {
    --size: 3px;
  }
  background-color: #1167b1;
  margin-top: calc(7px + var(--size) * 4);
  height: var(--size);
  width: var(--size);
  border-radius: 50%;
  margin-left: calc(var(--size) * 2);
  margin-right: 0px;
`
export const Dot1 = styled(Dot)`
  animation-name: jumpingDots;
  animation-duration: 1.7s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  @keyframes jumpingDots {
    0% {
      opacity: 0%;
    }
    30% {
      opacity: 100%;
    }
    70% {
      opacity: 100%;
    }

    100% {
      opacity: 0%;
    }
  }
`
export const Dot2 = styled(Dot)`
  animation-name: jumpingDots2;
  animation-duration: 1.7s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  @keyframes jumpingDots2 {
    0% {
      opacity: 0%;
    }
    20% {
      opacity: 0%;
    }
    50% {
      opacity: 100%;
    }
    80% {
      opacity: 100%;
    }
    100% {
      opacity: 0%;
    }
  }
`
export const Dot3 = styled(Dot)`
  animation-name: jumpingDots3;
  animation-duration: 1.7s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  @keyframes jumpingDots3 {
    0% {
      opacity: 0%;
    }
    35% {
      opacity: 0%;
    }
    70% {
      opacity: 100%;
    }
    90% {
      opacity: 100%;
    }
    100% {
      opacity: 0%;
    }
  }
`

export const BarWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  justify-items: center;
  justify-self: center;
  .CircularProgressbar {
    margin-bottom: 30px;
    width: 100px;
  }
`
