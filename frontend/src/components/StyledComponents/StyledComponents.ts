import { alpha, Box, Button, Card, styled, Tab, TextField, TextFieldProps, Theme } from "@mui/material"
import { TabList, TabPanel } from "@mui/lab"

export const ContentWrapper = styled(Box)(() => ({
  display: "flex",
  top: -20,
  alignItems: "center",
  position: "relative",
}))

export const StyledCard = styled(Card)(() => ({
  position: "relative",
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
}))

export const StyledTab = styled(Tab)(({ theme }) => ({
  fontSize: 13,
  color: theme.palette.text.primary,
}))

export const StyledTabList = styled(TabList)(({ theme }) => ({
  [theme.breakpoints.down(780)]: {
    width: "100%",
    "& .MuiTabs-flexContainer": {
      justifyContent: "space-between",
    },
    marginBottom: 20,
  },
  [theme.breakpoints.up("sm")]: {
    "& .MuiTabs-flexContainer": {
      minWidth: 400,
      justifyContent: "space-between",
    },
  },
}))

export const StyledTabPanel = styled(TabPanel)(() => ({
  padding: 0,
}))

export const IconWrapper = styled(Box)<{ color?: string }>(({ theme, color }) => ({
  width: 40,
  height: 40,
  color: "white",
  display: "flex",
  borderRadius: "4px",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: color ? color : theme.palette.primary.main,
}))

export const FollowWrapper = styled(Box)(() => ({
  maxWidth: 300,
  margin: "auto",
  paddingTop: 32,
  paddingBottom: 32,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}))

export const StyledButton = styled(Button)(({ theme }) => ({
  width: 83,
  padding: 0,
  height: 25,
  fontSize: 10,
  fontWeight: 500,
  borderRadius: "11px",
  color: theme.palette.text.disabled,
}))

export const ButtonWrapper = styled(Box)(({ theme }) => ({
  width: 100,
  height: 100,
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor:
    theme.palette.mode === "light" ? theme.palette.secondary.main[200] : alpha(theme.palette.primary.main, 0.1),
}))

export const UploadButton = styled(Box)(({ theme }) => ({
  width: 50,
  height: 50,
  display: "flex",
  borderRadius: "50%",
  border: "2px solid",
  alignItems: "center",
  justifyContent: "center",
  borderColor: theme.palette.background.paper,
  backgroundColor:
    theme.palette.mode === "light" ? theme.palette.secondary.main[400] : alpha(theme.palette.background.paper, 0.9),
}))

export const SwitchWrapper = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  marginTop: 10,
}))

export const StyledTextField = styled(TextField)<TextFieldProps>(({ theme }) => ({
  "& .MuiOutlinedInput-input": {
    fontWeight: 500,
    color: theme.palette.text.primary,
    "&:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px #121212 inset",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "8px",
    border: "2px solid",
    borderColor:
      theme.palette.mode === "light" ? theme.palette.secondary.main[300] : alpha(theme.palette.primary.main, 0.1),
  },
  "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.secondary.main[300],
  },
}))
