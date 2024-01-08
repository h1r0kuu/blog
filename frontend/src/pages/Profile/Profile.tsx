import { TabContext } from "@mui/lab"
import { Avatar, Box, Grid, Typography } from "@mui/material"

import { ChangeEvent, ReactElement, SyntheticEvent, useEffect, useState } from "react"
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
import { FollowResponse, UserProfileResponse, UserResponse } from "../../models/user/UserResponse"
import Loader from "../../components/Loader/Loader"

const Profile = (): ReactElement => {
  useTitle("User Profile")
  const { username } = useParams()
  const { user, isAuthenticated } = useAuth()
  const [value, setValue] = useState("1")
  const [profile, setProfile] = useState<UserProfileResponse>({} as UserProfileResponse)
  const [isProfileLoading, setProfileLoading] = useState<boolean>(true)

  const [followers, setFollowers] = useState<FollowResponse[]>([])
  const [followings, setFollowings] = useState<FollowResponse[]>([])
  const [filteredFollowers, setFilteredFollowers] = useState<FollowResponse[]>([])
  const [filteredFollowings, setFilteredFollowings] = useState<FollowResponse[]>([])

  const [followingsLoaded, setFollowingsLoader] = useState<boolean>(false)
  const [isFollowed, setIsFollowed] = useState<boolean>(false)

  useEffect(() => {
    if (username !== undefined) {
      loadUserProfile(username)
      setValue("1")
    }
  }, [username])

  const loadUserProfile = async (username: string) => {
    try {
      const res = await UserService.getUserByUsername(username)
      const data = res.data
      setProfile(data)
      setIsFollowed(data.isMyProfileSubscribed)
      setProfileLoading(false)
    } catch (error) {
      console.error("Error loading user profile:", error)
    }
  }

  const handleFollow = async () => {
    try {
      if (isFollowed) {
        await UserService.unfollowUser(profile.username)
      } else {
        await UserService.followUser(profile.username)
      }
      setIsFollowed(!isFollowed)
    } catch (error) {
      console.error("Error toggling follow status:", error)
    }
  }

  const loadUserFollowers = async () => {
    try {
      if (username !== undefined) {
        const res = await UserService.getUserFollowers(username)
        setFollowers(res.data.content)
        setFilteredFollowers(res.data.content)
      }
    } catch (error) {
      console.error("Error loading user followers:", error)
    }
  }

  const loadUserFollowings = async () => {
    try {
      if (username !== undefined) {
        const res = await UserService.getUserFollowings(username)
        setFollowings(res.data.content)
        setFilteredFollowings(res.data.content)
        setFollowingsLoader(true)
      }
    } catch (error) {
      console.error("Error loading user followings:", error)
    }
  }

  const handleChange = (_: SyntheticEvent, newValue: string) => {
    switch (newValue) {
      case "3":
        loadUserFollowers()
        break
      case "4":
        loadUserFollowings()
        break
    }
    setValue(newValue)
  }

  const filterBySearch = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: "followers" | "followings",
  ) => {
    const query = event.target.value
    if (type === "followers") {
      let updatedList = [...followers]
      updatedList = updatedList.filter((follower) => {
        return follower.username.toLowerCase().indexOf(query.toLowerCase()) !== -1
      })
      setFilteredFollowers(updatedList)
    } else if (type === "followings") {
      let updatedList = [...followings]
      updatedList = updatedList.filter((following) => {
        return following.username.toLowerCase().indexOf(query.toLowerCase()) !== -1
      })
      setFilteredFollowings(updatedList)
    }
  }

  return (
    <>
      <Header />
      <Box pt={2} pb={4}>
        {isProfileLoading ? (
          <Loader />
        ) : (
          <TabContext value={value}>
            <StyledCard>
              <Box sx={{ height: 200, width: "100%", overflow: "hidden" }}>
                <img
                  src={profile.cover}
                  alt="User Cover"
                  height="100%"
                  width="100%"
                  style={{ backgroundSize: "cover" }}
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
                    {isAuthenticated() &&
                      user.username !== profile.username &&
                      (isFollowed ? (
                        <StyledButton variant="outlined" onClick={() => handleFollow()}>
                          Unfollow
                        </StyledButton>
                      ) : (
                        <StyledButton
                          variant="contained"
                          sx={{ color: (theme) => theme.palette.common.black }}
                          onClick={() => handleFollow()}
                        >
                          Follow
                        </StyledButton>
                      ))}
                  </Box>
                </ContentWrapper>

                <StyledTabList onChange={handleChange}>
                  <StyledTab label="Profile" value="1" />
                  <StyledTab label={`Followers ${profile.followersSize}`} value="3" />
                  <StyledTab label={`Following ${profile.followingsSize}`} value="4" />
                </StyledTabList>
              </Box>
            </StyledCard>

            <Box marginTop={3}>
              <StyledTabPanel value="1">
                <ProfileInfo
                  followersCount={profile.followersSize}
                  followingCount={profile.followingsSize}
                  about={profile.about}
                  username={profile.username}
                />
              </StyledTabPanel>
              <StyledTabPanel value="2">{/*<ProfileInfo />*/}</StyledTabPanel>
              <StyledTabPanel value="3">
                <Box m={2}>
                  <Typography>Followers</Typography>
                  <SearchInput
                    placeholder="Search Followers..."
                    sx={{ my: 2 }}
                    onChange={(e) => filterBySearch(e, "followers")}
                  />

                  <Grid container spacing={3}>
                    {filteredFollowers.map((item, index) => (
                      <Grid item lg={4} sm={6} xs={12} key={index}>
                        <ProfileFollowCard follower={item} />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </StyledTabPanel>

              <StyledTabPanel value="4">
                <Box m={2}>
                  {followingsLoaded ? (
                    <>
                      <Typography>Followings</Typography>
                      <SearchInput
                        placeholder="Search Followings..."
                        sx={{ my: 2 }}
                        onChange={(e) => filterBySearch(e, "followings")}
                      />
                      <Grid container spacing={3}>
                        {filteredFollowings.map((item, index) => (
                          <Grid item lg={4} sm={6} xs={12} key={index}>
                            <ProfileFollowCard follower={item} />
                          </Grid>
                        ))}
                      </Grid>
                    </>
                  ) : (
                    <Loader />
                  )}
                </Box>
              </StyledTabPanel>
            </Box>
          </TabContext>
        )}
      </Box>
    </>
  )
}

export default Profile
