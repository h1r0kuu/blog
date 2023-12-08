import { Avatar, Box, Button, Card, Typography, useTheme } from "@mui/material"
import { FC, useState } from "react"
import { StyledButton } from "../StyledComponents/StyledComponents"
import { FollowResponse, UserResponse } from "../../models/user/UserResponse"
import UserService from "../../services/UserService"
import { Link } from "react-router-dom"
import { PROFILE } from "../../constants/pathConstants"

type ProfileFollowCardProps = {
  follower: FollowResponse
}

const ProfileFollowCard: FC<ProfileFollowCardProps> = ({ follower }) => {
  const theme = useTheme()
  const backgroundColor = theme.palette.mode === "light" ? "secondary.200" : "divider"
  const borderColor = theme.palette.mode === "light" ? "secondary.200" : "divider"
  const [isMyProfileSubscribed, setIsMyProfileSubscribed] = useState<boolean>(follower.isMyProfileSubscribed)

  const handleFollow = () => {
    if (follower.isMyProfileSubscribed) {
      UserService.unfollowUser(follower.username).then((res) => {
        setIsMyProfileSubscribed(false)
      })
    } else {
      UserService.followUser(follower.username).then((res) => {
        setIsMyProfileSubscribed(true)
      })
    }
  }

  return (
    <Card sx={{ padding: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link to={`${PROFILE}/${follower.username}`} style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={follower.avatar}
            sx={{
              border: 4,
              width: 60,
              height: 60,
              borderColor: "background.paper",
            }}
          />

          <Box marginLeft={1}>
            <Typography mb={1}>{follower.username}</Typography>
          </Box>
        </Link>

        {isMyProfileSubscribed ? (
          <Button
            sx={{
              backgroundColor,
              "&:hover": { backgroundColor },
            }}
            onClick={() => handleFollow()}
          >
            Unfollow
          </Button>
        ) : (
          <Button
            variant="outlined"
            sx={{
              borderColor,
              "&:hover": { borderColor },
            }}
            onClick={() => handleFollow()}
          >
            Follow
          </Button>
        )}
      </Box>
    </Card>
  )
}

export default ProfileFollowCard
