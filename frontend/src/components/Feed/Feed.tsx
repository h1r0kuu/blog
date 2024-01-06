import { ReactElement, useEffect, useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { Box, Card, CardContent, CardActions, Typography, CardMedia, Chip } from "@mui/material"
import { Visibility as ViewsIcon, ThumbsUpDown as MarksIcon, Label as TagsIcon } from "@mui/icons-material"
import { Link } from "react-router-dom"
import PostService from "../../services/PostService"
import { PostDto } from "../../models/post/PostDto"
import { POST } from "../../constants/pathConstants"

const Feed = (): ReactElement => {
  const [posts, setPosts] = useState<PostDto[]>([])

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await PostService.getAllPosts()
      if (response) setPosts(response.data)
    }
    fetchPosts()
  }, [])

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center", marginTop: 4 }}>
      {posts &&
        posts.map((post: PostDto, index: number) => (
          <Link to={`${POST}/${post.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <Card
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid grey",
                borderRadius: 4,
                maxWidth: 600,
                width: "100%",
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: "100%", objectFit: "cover", aspectRatio: "10 / 3" }}
                image={post.posterUrl}
                alt={post.title}
              />
              <CardContent>
                <Box sx={{ display: "flex", mb: "6px", flexDirection: "row", alignItems: "center", gap: 1 }}>
                  <TagsIcon />
                  {post.tags.map((tag, tagIndex) => (
                    <Chip key={tagIndex} label={tag.name} variant="outlined" />
                  ))}
                </Box>
                <Typography variant="h6" sx={{ mb: "6px" }} color="text.primary">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ overflowWrap: "break-word" }}>
                  {post.description}
                </Typography>
              </CardContent>
              <CardActions
                disableSpacing
                sx={{
                  justifyContent: "space-between",
                  padding: "0 16px 16px 16px",
                }}
              >
                <Box sx={{ display: "flex", gap: "12px" }}>
                  <Box sx={{ display: "flex", gap: "12px" }}>
                    <ViewsIcon />
                    <Typography variant="body2">{post.views}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: "12px" }}>
                    <MarksIcon />
                    <Typography variant="body2">{post.mark}</Typography>
                  </Box>
                </Box>
                <Typography variant="body2">{formatDistanceToNow(new Date(post.createdAt))} ago</Typography>
              </CardActions>
            </Card>
          </Link>
        ))}
    </Box>
  )
}

export default Feed
