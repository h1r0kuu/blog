import { ForumRounded, MoreVert, ThumbsUpDown as MarksIcon, ThumbUp } from "@mui/icons-material"
import { Avatar, Box, Button, ButtonBase, Card, IconButton, styled, Typography } from "@mui/material"
import React, { FC } from "react"
import { PostDto } from "../../models/post/PostDto"
import { POST } from "../../constants/pathConstants"
import { Link } from "react-router-dom"

type PostCardProps = {
  post: PostDto
  // handleMore: (event: MouseEvent<HTMLButtonElement>) => void
}

const ImageWrapper = styled(Box)(() => ({
  width: 48,
  height: 48,
  overflow: "hidden",
  borderRadius: "50%",
}))

const PostImageWrapper = styled(Box)(() => ({
  width: "100%",
  marginTop: 16,
  overflow: "hidden",
  borderRadius: "8px",
}))

const ProfilePostCard: FC<PostCardProps> = ({ post }) => {
  return (
    <Link to={`${POST}/${post.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <Card sx={{ padding: 2, mb: 3 }}>
        <Box marginTop={3}>
          <Typography fontWeight={600}>{post.title}</Typography>

          {post.posterUrl && (
            <PostImageWrapper>
              <img src={post.posterUrl} alt="Post One" width="100%" />
            </PostImageWrapper>
          )}

          <Box display="flex" alignItems="center" justifyContent="space-between" my={2}>
            <Box display="flex" alignItems="center">
              <IconButton>
                <MarksIcon />
              </IconButton>
              <Typography variant="body2">{post.mark}</Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </Link>
  )
}

export default ProfilePostCard
