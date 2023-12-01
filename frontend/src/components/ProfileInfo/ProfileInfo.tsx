import { Box, Card, Divider, Grid, Typography } from "@mui/material"
import { ReactElement } from "react"
import { FollowWrapper, IconWrapper } from "../StyledComponents/StyledComponents"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserPlus, faUsers } from "@fortawesome/free-solid-svg-icons"
import ProfilePostCard from "../ProfilePostCard/ProfilePostCard"

const ProfileInfo = (): ReactElement => {
  return (
    <Grid container spacing={3}>
      <Grid item md={5} xs={12}>
        <Card>
          <FollowWrapper>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconWrapper>
                <FontAwesomeIcon icon={faUserPlus} />
              </IconWrapper>
              <Box marginLeft={1.5}>
                <Typography color="text.disabled" lineHeight={1}>
                  Following
                </Typography>
                <Typography lineHeight={1} mt={0.6}>
                  93,675
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconWrapper color="#FF9777">
                <FontAwesomeIcon icon={faUsers} />
              </IconWrapper>
              <Box marginLeft={1.5}>
                <Typography color="text.disabled" lineHeight={1}>
                  Followers
                </Typography>
                <Typography lineHeight={1} mt={0.6}>
                  82,469
                </Typography>
              </Box>
            </Box>
          </FollowWrapper>

          <Divider />

          <Box padding={3}>
            <Typography component="h4" fontWeight={600}>
              About
            </Typography>
            <Typography sx={{ display: "block", lineHeight: "1.9" }} mt={1}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...
            </Typography>
          </Box>
        </Card>
      </Grid>

      <Grid item md={7} xs={12}>
        <ProfilePostCard post={{ postTitle: "das", postImage: "das" }} />
        <ProfilePostCard post={{ postTitle: "das", postImage: "das" }} />
        <ProfilePostCard post={{ postTitle: "das", postImage: "das" }} />
        <ProfilePostCard post={{ postTitle: "das", postImage: "das" }} />
      </Grid>
    </Grid>
  )
}

export default ProfileInfo
