import styled from "styled-components"

export const Container = styled.div`
  margin-top: 20px;
  padding: 0px 90px;
  @media screen and (max-width: 480px) {
    margin-top: 10px;
    padding: 0px 20px;
  }
`

export const MenuButton = styled.button`
  width: 50%;
  background: white;
  border: none;
  padding: 16px 16px 8px 16px;
  border-radius: 16px;
  :hover {
    color: #1167b1;
    //background: #f0f0f0;
    font-weight: bold;
  }
`

export const LeftMenuButton = styled(MenuButton)`
  //background: ${({ activeTab }) => (activeTab === 1 ? "white" : "#f0f0f0")};
`
export const RightMenuButton = styled(MenuButton)`
  //background: ${({ activeTab }) => (activeTab === 0 ? "white" : "#f0f0f0")};
`
export const MenuActiveBar = styled.div`
  height: 4px;
  width: 100%;
`
export const MenuActiveLine = styled.div`
  width: 50%;
  height: 4px;
  background: #1167b1;
  margin-left: ${({ activeTab }) => (activeTab === 1 ? "50%" : "0%")};
  transition: margin-left 0.4s ease-in-out 0s;
`
export const TableWrapper = styled.div`
  display: flex;
  justify-content: center;
  //overflow-x: scroll;
  overflow: hidden;
`

export const TabOne = styled.div`
  margin: 20px 10px 50px 10px;

  overflow: hidden;
  /* opacity: ${({ activeTab }) => (activeTab === 0 ? "100%" : "0%")};
  transform: ${({ activeTab }) =>
    activeTab === 0 ? "none" : "translateX(-200%)"};
  transition: all 0.4s ease-in-out 0s; */
  left: 10%;
  width: 80%;
  position: absolute;
`

export const TabTwo = styled.div`
  margin: 20px 10px 50px 10px;
  overflow: hidden;
  opacity: ${({ activeTab }) => (activeTab === 1 ? "100%" : "0%")};
  transform: ${({ activeTab }) =>
    activeTab === 1 ? "none" : "translateX(200%)"};
  transition: all 0.4s ease-in-out 0s;
  right: 10%;
  width: 80%;
  position: absolute;
`

export const Time = styled.div`
  position: absolute;
  left: 0px;
  color: #676767;
  padding: 0 10px;
`
export const Message = styled.div`
  color: #676767;
  position: absolute;
  left: 400px;
  width: 500px;
  max-height: 100px;
  overflow: scroll;
`
export const Address = styled.div`
  color: #676767;
  position: absolute;
  right: 0px;
`
