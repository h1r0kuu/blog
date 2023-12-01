import { Avatar, Box, Card, Typography, useTheme } from "@mui/material"
import { FC } from "react"
import { StyledButton } from "../StyledComponents/StyledComponents"

type ProfileFollowCardProps = {
  follower: {
    image: string
    name: string
    following: boolean
  }
}

const ProfileFollowCard: FC<ProfileFollowCardProps> = ({ follower }) => {
  const theme = useTheme()
  const backgroundColor = theme.palette.mode === "light" ? "secondary.200" : "divider"
  const borderColor = theme.palette.mode === "light" ? "secondary.200" : "divider"

  return (
    <Card sx={{ padding: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ display: "flex" }}>
          <Avatar
            src={"/static/avatar/001-man.svg"}
            sx={{
              border: 4,
              width: 42,
              height: 42,
              borderColor: "background.paper",
            }}
          />

          <Box marginLeft={1}>
            <Typography>{follower.name}</Typography>
          </Box>
        </Box>

        {follower.following ? (
          <StyledButton
            sx={{
              backgroundColor,
              "&:hover": { backgroundColor },
            }}
          >
            Following
          </StyledButton>
        ) : (
          <StyledButton
            variant="outlined"
            sx={{
              borderColor,
              "&:hover": { borderColor },
            }}
          >
            Follow
          </StyledButton>
        )}
      </Box>
    </Card>
  )
}

export default ProfileFollowCard
