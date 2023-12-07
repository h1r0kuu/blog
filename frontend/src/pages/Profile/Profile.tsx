import { TabContext } from "@mui/lab"
import { Avatar, Box, Grid, Typography } from "@mui/material"

import { ReactElement, SyntheticEvent, useEffect, useState } from "react"
import useTitle from "../../hooks/useTitle"
import { useAuth } from "../../context/AuthContext"
import Header from "../../components/Header/Header"
import {
  ContentWrapper,
  StyledButton,
  StyledCard,
  StyledTab,
  StyledTabList,
  StyledTabPanel,
} from "../../components/StyledComponents/StyledComponents"
import SearchInput from "../../components/SearchInput/SearchInput"
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo"
import ProfileFollowCard from "../../components/ProfileFollowCard/ProfileFollowCard"
import { useParams } from "react-router-dom"
import UserService from "../../services/UserService"
import { UserResponse } from "../../models/user/UserResponse"

const Profile = (): ReactElement => {
  useTitle("User Profile")
  const { username } = useParams()
  const { user } = useAuth()
  const [value, setValue] = useState("1")
  const [profile, setProfile] = useState<UserResponse>({} as UserResponse)
  const [followers, setFollowers] = useState<UserResponse[]>([])
  const [following, setFollowings] = useState<UserResponse[]>([])
  const [followingsLoaded, setFollowingsLoader] = useState<boolean>(false)
  const [isFollowed, setIsFollowed] = useState<boolean>(false)

  useEffect(() => {
    if (username !== undefined) {
      UserService.getUserByUsername(username).then((res) => {
        const data = res.data
        setProfile(data)
        setIsFollowed(data.isMyProfileSubscribed)
      })
    }
  }, [username])

  const loadUserFollowers = () => {
    if (username !== undefined) {
      UserService.getUserFollowers(username).then((res) => {
        setFollowers(res.data.content)
      })
    }
  }

  const handleFollow = () => {
    if (isFollowed) {
      UserService.unfollowUser(profile.username).then((res) => {
        setIsFollowed(false)
      })
    } else {
      UserService.followUser(profile.username).then((res) => {
        setIsFollowed(true)
      })
    }
  }

  const loadUserFollowings = () => {
    if (username !== undefined) {
      UserService.getUserFollowings(username).then((res) => {
        setFollowings(res.data.content)
        setFollowingsLoader(true)
      })
    }
  }

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    switch (newValue) {
      case "3": {
        loadUserFollowers()
        break
      }
      case "4": {
        loadUserFollowings()
        break
      }
    }
    setValue(newValue)
  }

  return (
    <>
      <Header />
      <Box pt={2} pb={4}>
        <TabContext value={value}>
          <StyledCard>
            <Box sx={{ height: 200, width: "100%", overflow: "hidden" }}>
              <img
                src="/static/background/user-cover-pic.png"
                alt="User Cover"
                height="100%"
                width="100%"
                style={{ objectFit: "cover" }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                padding: "0 2rem",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <ContentWrapper>
                <Avatar
                  src={profile.avatar}
                  sx={{
                    border: 4,
                    width: 100,
                    height: 100,
                    borderColor: "background.paper",
                  }}
                />

                <Box
                  marginLeft={3}
                  marginTop={3}
                  sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
                >
                  <Typography
                    component="h3"
                    sx={{
                      fontSize: "18px",
                      fontWeight: "600",
                      lineHeight: "1.5",
                    }}
                    mb={1.5}
                  >
                    {profile.username}
                  </Typography>
                  {user.username !== profile.username &&
                    (isFollowed ? (
                      <StyledButton variant="outlined" onClick={() => handleFollow()}>
                        Unfollow
                      </StyledButton>
                    ) : (
                      <StyledButton variant="contained" onClick={() => handleFollow()}>
                        Follow
                      </StyledButton>
                    ))}
                </Box>
              </ContentWrapper>

              <StyledTabList onChange={handleChange}>
                <StyledTab label="Profile" value="1" />
                <StyledTab label="Comments" value="2" />
                <StyledTab label={`Followers ${profile.followersSize}`} value="3" />
                <StyledTab label={`Following ${profile.followingsSize}`} value="4" />
              </StyledTabList>
            </Box>
          </StyledCard>

          <Box marginTop={3}>
            <StyledTabPanel value="1">
              <ProfileInfo followersCount={profile.followersSize} followingCount={profile.followingsSize} />
            </StyledTabPanel>
            <StyledTabPanel value="2">{/*<ProfileInfo />*/}</StyledTabPanel>
            <StyledTabPanel value="3">
              <Typography>Followers</Typography>
              <SearchInput placeholder="Search Followers..." sx={{ my: 2 }} />

              <Grid container spacing={3}>
                {followers.map((item, index) => (
                  <Grid item lg={4} sm={6} xs={12} key={index}>
                    <ProfileFollowCard follower={item} />
                  </Grid>
                ))}
              </Grid>
            </StyledTabPanel>

            <StyledTabPanel value="4">
              <Typography>Followings</Typography>
              {followingsLoaded === true ? (
                <>
                  <SearchInput placeholder="Search Followings..." sx={{ my: 2 }} />
                  <Grid container spacing={3}>
                    {following.map((item, index) => (
                      <Grid item lg={4} sm={6} xs={12} key={index}>
                        <ProfileFollowCard follower={item} />
                      </Grid>
                    ))}
                  </Grid>
                </>
              ) : (
                <>Loading</>
              )}
            </StyledTabPanel>

            <StyledTabPanel value="4">{/*<Gallery />*/}</StyledTabPanel>
          </Box>
        </TabContext>
      </Box>
    </>
  )
}

const followers = [
  {
    image: "",
    name: "Mr. Breast",
    following: true,
  },
  {
    image: "",
    name: "Ethan Drake",
    following: true,
  },
  {
    image: "",
    name: "Selena Gomez",
    following: false,
  },
  {
    image: "",
    name: "Sally Becker",
    following: true,
  },
  {
    image: "",
    name: "Dua Lipa",
    following: false,
  },
  {
    image: "",
    name: "Joe Murry",
    following: true,
  },
  {
    image: "",
    name: "Mr. Breast",
    following: true,
  },
  {
    image: "",
    name: "Ethan Drake",
    following: true,
  },
  {
    image: "",
    name: "Selena Gomez",
    following: false,
  },
  {
    image: "",
    name: "Sally Becker",
    following: true,
  },
  {
    image: "",
    name: "Dua Lipa",
    following: false,
  },
  {
    image: "",
    name: "Joe Murry",
    following: true,
  },
]
export default Profile
