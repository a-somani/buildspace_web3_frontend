import React, { useState, forwardRef } from "react"
import { useSwipeable } from "react-swipeable"
import {
  RightMenuButton,
  LeftMenuButton,
  MenuActiveBar,
  MenuActiveLine,
  Container,
  TabOne,
  TabTwo,
  TableWrapper,
} from "./DisplayMessagesElements"
import useWeb3Context from "../../Web3StateManagement/Web3Context"
import MaterialTable from "material-table"

import AddBox from "@material-ui/icons/AddBox"
import ArrowDownward from "@material-ui/icons/ArrowDownward"
import Check from "@material-ui/icons/Check"
import ChevronLeft from "@material-ui/icons/ChevronLeft"
import ChevronRight from "@material-ui/icons/ChevronRight"
import Clear from "@material-ui/icons/Clear"
import DeleteOutline from "@material-ui/icons/DeleteOutline"
import Edit from "@material-ui/icons/Edit"
import FilterList from "@material-ui/icons/FilterList"
import FirstPage from "@material-ui/icons/FirstPage"
import LastPage from "@material-ui/icons/LastPage"
import Remove from "@material-ui/icons/Remove"
import SaveAlt from "@material-ui/icons/SaveAlt"
import Search from "@material-ui/icons/Search"
import ViewColumn from "@material-ui/icons/ViewColumn"

const DisplayMessages = () => {
  const [activeTab, setActiveTab] = useState(0)
  const {
    state: { allWaves, totalWaveCount, userWaveCount, userWaves },
  } = useWeb3Context()

  const rightTab = () => {
    console.log("rightTAB")
    setActiveTab(1)
  }
  const leftTab = () => {
    console.log("leftTAB")
    setActiveTab(0)
  }

  const handlers = useSwipeable({
    //onSwiped: (eventData) => console.log("User Swiped!", eventData),
    onSwipedLeft: () => {
      activeTab === 0 && rightTab()
    },
    onSwipedRight: () => {
      activeTab === 1 && leftTab()
    },
    delta: 20, // min distance(px) before a swipe starts. *See Notes*
    preventDefaultTouchmoveEvent: true, // call e.preventDefault *See Details*
    trackTouch: true, // track touch input
    trackMouse: false, // track mouse input
  })

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  }

  return (
    <Container>
      <div {...handlers}>
        <LeftMenuButton activeTab={activeTab} onClick={() => setActiveTab(0)}>
          All messages
        </LeftMenuButton>
        <RightMenuButton activeTab={activeTab} onClick={() => setActiveTab(1)}>
          Your messages
        </RightMenuButton>
        <MenuActiveBar>
          <MenuActiveLine activeTab={activeTab} />
        </MenuActiveBar>
        {allWaves.length > 1 && (
          <TableWrapper>
            <TabOne activeTab={activeTab}>
              <MaterialTable
                //style={{ minWidth: "100%" }}
                title={`All Messages (${totalWaveCount})`}
                columns={[
                  { title: "Index", field: "index", defaultSort: "desc" },
                  { title: "Time", field: "timestamp", sorting: false },
                  { title: "Message", field: "message", sorting: false },
                  {
                    title: "Address",
                    field: "formatted_address",
                    sorting: false,
                    cellStyle: {
                      color: "#1167b1",
                      textDecoration: "underline",
                    },
                  },
                ]}
                data={allWaves}
                options={{ search: true }}
                icons={tableIcons}
                onRowClick={(event, selectedRow) => {
                  const clicked = event.target.innerText
                  //console.log(clicked)
                  if (clicked.includes("...") && clicked.includes("0x")) {
                    window.open(
                      `//rinkeby.etherscan.io/address/${selectedRow.address}`
                    )
                  }
                }}
              />
            </TabOne>
            <TabTwo activeTab={activeTab}>
              <MaterialTable
                //style={{ minWidth: "100%" }}
                title={
                  userWaveCount
                    ? `Your Messages (${userWaveCount})`
                    : "You have 0 messages!"
                }
                columns={[
                  {
                    title: "Index",
                    field: "index",
                    defaultSort: "desc",
                    width: "1%",
                  },

                  { title: "Message", field: "message", sorting: false },
                  {
                    title: "Time",
                    field: "timestamp",
                    sorting: false,
                    width: "1%",
                  },
                ]}
                data={userWaves}
                options={{ search: true }}
                icons={tableIcons}
              />
            </TabTwo>
          </TableWrapper>
        )}
      </div>
    </Container>
  )
}

export default DisplayMessages

/* {allWaves ? (
          allWaves.map((wave, index) => {
            const { address, timestamp, message } = wave
            let convertedAddress = String(address)
            convertedAddress =
              convertedAddress.substring(0, 6) +
              "..." +
              convertedAddress.substring(
                convertedAddress.length - 4,
                convertedAddress.length
              )
            let convertedTime = timestamp.toString()
            const shortenIndex = convertedTime.indexOf(" (")
            if (shortenIndex > 0) {
              convertedTime = convertedTime.substr(0, shortenIndex)
            }

            return (
              <TabOne activeTab={activeTab} key={index}>
                <Time>Time: {convertedTime}</Time>
                <Message>Message: {message}</Message>
                <Address>
                  Address:{" "}
                  <a
                    href={`//rinkeby.etherscan.io/address/${address}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {convertedAddress}
                  </a>
                </Address>
              </TabOne>
            )
          })
        ) : (
          <>hello</>
        )} */
