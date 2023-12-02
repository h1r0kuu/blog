import { ForumRounded, MoreVert, ThumbUp } from "@mui/icons-material"
import { Avatar, Box, ButtonBase, Card, IconButton, styled, Typography, useTheme } from "@mui/material"
import React, { FC } from "react"

type PostCardProps = {
  post: {
    postTitle: string
    postImage: string
  }
  // handleMore: (event: MouseEvent<HTMLButtonElement>) => void
}

// styled components
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
  const theme = useTheme()
  return (
    <Card sx={{ padding: 2, mb: 3 }}>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <ImageWrapper>
            <Avatar src="" alt="h1r0ku" />
          </ImageWrapper>

          <Box marginLeft={1}>
            <Typography lineHeight={1}>Martha Hawk</Typography>
            <Typography fontWeight={500} color="text.disabled">
              22 June 2020
            </Typography>
          </Box>
        </Box>
        {/*onClick = {"handleMore"}*/}
        <IconButton>
          <MoreVert fontSize="small" color="disabled" />
        </IconButton>
      </Box>

      <Box marginTop={3}>
        <Typography fontWeight={600}>{post.postTitle}</Typography>

        {post.postImage && (
          <PostImageWrapper>
            <img src={post.postImage} alt="Post One" width="100%" />
          </PostImageWrapper>
        )}

        <Box display="flex" alignItems="center" justifyContent="space-between" my={2}>
          <ButtonBase disableRipple>
            <Box display="flex" alignItems="center">
              <IconButton>
                <ThumbUp />
              </IconButton>
              <Typography color="text.disabled" ml={1}>
                15
              </Typography>
            </Box>
          </ButtonBase>
          <ButtonBase disableRipple>
            <Box display="flex" alignItems="center">
              <IconButton>
                <ForumRounded />
              </IconButton>
              <Typography color="text.disabled" ml={1}>
                25
              </Typography>
            </Box>
          </ButtonBase>
        </Box>
      </Box>
    </Card>
  )
}

export default ProfilePostCard
