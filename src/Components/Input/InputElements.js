import styled from "styled-components"

export const MessageBox = styled.textarea`
  color: #676767;
  resize: vertical;
  min-height: 20px;
  font-weight: 600;
`

export const SubmitButton = styled.button`
  color: white;
  padding: 10px;
  background-color: #1167b1;

  :disabled {
    background-color: #676767;
  }
`

export const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 60px;
  width:90%;
  @media screen and (max-width: 480px) {
    padding: 10px 15px;
  }
  //display: ${({ error }) => (error === "" ? "flex" : "none")};
  //transition: display 0.5s ease-in-out 0s;
`

export const InputWrapper = styled.div`
  align-items: center;
  max-width: 720px;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  padding: 10px 30px;
  margin-bottom: 60px;
  @media screen and (max-width: 768px) {
    padding: 10px 15px;
  }
  @media screen and (max-width: 480px) {
    padding: 10px 15px;
  }
`

export const ConnectWallet = styled.button`
  color: white;
  padding: 10px 50px;
  background-color: #1167b1;
  font-size: 20px;
  border-radius: 5px;
  :disabled {
    background-color: #676767;
  }
  :active {
    background-color: #cccccc;
  }
`
export const ConnectNetwork = styled(ConnectWallet)`
  color: white;
  padding: 10px 50px;
  background-color: #8b0000;

  :disabled {
    background-color: #676767;
  }
`
export const InstallMM = styled(ConnectWallet)`
  color: white;
  padding: 10px 50px;
  background-color: #f4841f;
`
