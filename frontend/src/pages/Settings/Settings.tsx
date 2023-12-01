import { Container } from "@mui/material"
import { ReactElement, SyntheticEvent, useState } from "react"
import { StyledTab, StyledTabList, StyledTabPanel } from "../../components/StyledComponents/StyledComponents"
import Header from "../../components/Header/Header"
import { TabContext } from "@mui/lab"
import ChangePassword from "../../components/ChangePassword/ChangePassword"
import GeneralSettings from "../../components/GeneralSettings/GeneralSettings"

const Settings = (): ReactElement => {
  const [value, setValue] = useState("1")
  const handleChange = (_: SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }
  return (
    <>
      <Header />
      <Container>
        <TabContext value={value}>
          <StyledTabList onChange={handleChange}>
            <StyledTab label="General" value="1" />
            <StyledTab label="Notifications" value="2" />
            <StyledTab label="Security" value="3" />
          </StyledTabList>
          <StyledTabPanel value="1">
            <GeneralSettings />
          </StyledTabPanel>
          <StyledTabPanel value="3">
            <ChangePassword />
          </StyledTabPanel>
        </TabContext>
      </Container>
    </>
  )
}

export default Settings
