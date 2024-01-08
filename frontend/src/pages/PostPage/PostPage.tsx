import { ReactElement, useEffect, useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { useParams, useNavigate, Link } from "react-router-dom"
import { Box, Typography, Card, CardContent, Avatar, IconButton, Button } from "@mui/material"
import Header from "../../components/Header/Header"
import * as Styles from "./PostPageStyles"
import VisibilityIcon from "@mui/icons-material/Visibility"
import ThumbUpAltRoundedIcon from "@mui/icons-material/ThumbUpAltRounded"
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded"
import SellIcon from "@mui/icons-material/Sell"
import PostService from "../../services/PostService"
import { PostDto } from "../../models/post/PostDto"
import { useAuth } from "../../context/AuthContext"
import UserService from "../../services/UserService"
import { StyledButton } from "../../components/StyledComponents/StyledComponents"
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined"
import { PROFILE } from "../../constants/pathConstants"

const PostPage = (): ReactElement => {
  const [post, setPost] = useState<PostDto>()
  const { id } = useParams()
  const navigate = useNavigate()
  const [markStatus, setMarkStatus] = useState<boolean | null>(null)
  const [positiveMarks, setPositiveMarks] = useState<number>(0)
  const [negativeMarks, setNegativeMarks] = useState<number>(0)
  const { isAuthenticated, user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [isFollowed, setIsFollowed] = useState<boolean | null>(false)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true)
        const response = await PostService.getPostById(Number(id))
        setPost(response.data)
        setIsLoading(false)
        if (!isLoading && !post) {
          navigate("*")
        }
        setMarkStatus(response.data.markStatus)
        setIsFollowed(response.data.isMyProfileSubscribed)
        setPositiveMarks(response.data.positiveMarks ?? 0)
        setNegativeMarks(response.data.negativeMarks ?? 0)
      } catch (error) {
        navigate("*")
      }
    }
    fetchPosts()
  }, [id, navigate])

  const handleFollow = async () => {
    if (!isAuthenticated()) {
      return
    }
    try {
      if (isFollowed) {
        await UserService.unfollowUser(post?.creator.username || "")
      } else {
        await UserService.followUser(post?.creator.username || "")
      }
      setIsFollowed(!isFollowed)
    } catch (error) {
      console.error("Error toggling follow status:", error)
    }
  }

  const handleMarkUpdate = async (newStatus: boolean | null) => {
    try {
      setMarkStatus(newStatus)
      const response = await PostService.updateMark({ status: newStatus, postId: post?.id || 0 })
      setPositiveMarks(response.data.positiveMarks ?? 0)
      setNegativeMarks(response.data.negativeMarks ?? 0)
    } catch (error) {
      console.error(error)
    }
  }

  const handleLikeClick = async () => {
    if (!isAuthenticated()) {
      return
    }
    const newStatus = markStatus === true ? null : true
    await handleMarkUpdate(newStatus)
  }

  const handleDislikeClick = async () => {
    if (!isAuthenticated()) {
      return
    }
    const newStatus = markStatus === false ? null : false
    await handleMarkUpdate(newStatus)
  }

  const handleDeleteClick = async () => {
    if (!isAuthenticated() || user.username !== post?.creator.username) {
      return
    } else {
      await PostService.delete(Number(id))
      navigate(`/`)
    }
  }

  const handleEditClick = () => {
    if (!isAuthenticated() || user.username !== post?.creator.username) {
      return
    } else {
      navigate(`update`, { state: { post } })
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  } else {
  }

  return (
    <Box sx={Styles.MainBox}>
      <Header />
      <Box sx={Styles.backgroundImageBox} style={{ backgroundImage: `url(${post?.posterUrl || ""})` }} />
      {post && (
        <Box sx={Styles.MainContentBox}>
          <Box sx={Styles.PostInfoBox}>
            <Typography variant="h5" sx={Styles.PostTitle}>
              {post?.title || ""}
            </Typography>
            <Typography sx={Styles.TagsText}>
              <SellIcon />{" "}
              {post?.tags?.map((tag, tagIndex) => (
                <Link to={`/posts/search?tags=${tag.name}`} style={{ textDecoration: "none", color: "inherit" }}>
                  {`${tag.name}${tagIndex !== post?.tags.length - 1 ? ", " : ""}`}
                </Link>
              ))}
            </Typography>
            <Box sx={Styles.PostDescription}>
              <Link to={`${PROFILE}/${post?.creator.username}`} style={{ display: "flex", alignItems: "center" }}>
                <Avatar src={post?.creator.avatar || ""} />
                <Typography color="#448aff" variant="body1" ml={2}>
                  {post?.creator.username || ""}
                </Typography>
              </Link>
              {isAuthenticated() && user.username !== post?.creator.username && (
                <StyledButton variant={isFollowed ? "outlined" : "contained"} onClick={handleFollow}>
                  {isFollowed ? "Unfollow" : "Follow"}
                </StyledButton>
              )}
              <Typography color="rgb(126, 126, 132)" variant="body2">
                {formatDistanceToNow(new Date(post?.createdAt || Date.now()))} ago
              </Typography>{" "}
            </Box>
          </Box>
          <Card sx={Styles.PostBodyBox}>
            <CardContent>
              <Typography variant="body1" dangerouslySetInnerHTML={{ __html: post?.body || "" }} />{" "}
              <Card sx={Styles.PostRatingBox}>
                <CardContent sx={Styles.PostRatingBoxContent}>
                  <Box sx={Styles.FirstIconsGroup}>
                    <VisibilityIcon />
                    <Typography>{post?.views || 0}</Typography>
                  </Box>
                  <Box sx={Styles.SecondIconsGroup}>
                    {isAuthenticated() && user.username === post?.creator.username && (
                      <>
                        <Button
                          onClick={handleDeleteClick}
                          variant="outlined"
                          color="error"
                          startIcon={<DeleteOutlineOutlinedIcon />}
                        >
                          DELETE
                        </Button>
                        <Button
                          onClick={handleEditClick}
                          variant="outlined"
                          color="info"
                          startIcon={<EditNoteOutlinedIcon />}
                        >
                          EDIT
                        </Button>
                      </>
                    )}
                  </Box>
                  <Box sx={Styles.ThirdIconsGroup}>
                    <IconButton onClick={handleLikeClick}>
                      <ThumbUpAltRoundedIcon sx={{ color: markStatus === true ? "green" : "inherit" }} />
                    </IconButton>
                    <Typography color="#4baf50">{positiveMarks}</Typography>|
                    <Typography color="#ba6163">-{negativeMarks}</Typography>
                    <IconButton onClick={handleDislikeClick}>
                      <ThumbDownAltRoundedIcon sx={{ color: markStatus === false ? "red" : "inherit" }} />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  )
}

export default PostPage
