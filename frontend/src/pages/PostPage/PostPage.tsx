import { ReactElement, useEffect, useState, Fragment } from "react"
import { formatDistanceToNow } from 'date-fns';
import { useParams, useNavigate } from "react-router-dom"
import { Box, Typography, Card, CardContent, Avatar } from "@mui/material";
import Header from "../../components/Header/Header"
import * as Styles from './PostPageStyles'
import VisibilityIcon from '@mui/icons-material/Visibility';
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import ThumbDownAltRoundedIcon from '@mui/icons-material/ThumbDownAltRounded';
import SellIcon from '@mui/icons-material/Sell';
import PostService from "../../services/PostService"
import { PostDto } from "../../models/post/PostDto"


const PostPage = (): ReactElement => {
    const [post, setPost] = useState<PostDto>()
    const { id } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
      const fetchPosts = async () => {
        try {
            const response = await PostService.getPostById(Number(id))
            setPost(response.data)
        } catch (error) {
          navigate('*');
        }
      }
      fetchPosts()
    }, [id, navigate])

    if (!post) {
      return <></>;
    }


  return (
    <Box sx={Styles.MainBox}>
    <Header />
       <Box sx={Styles.backgroundImageBox} style={{backgroundImage: `url(${post.posterUrl})`}} />

       <Box sx={Styles.MainContentBox}>
            <Box sx={Styles.PostInfoBox}>
                <Typography variant="h5" sx={Styles.PostTitle}>
                    {post?.title}
                </Typography>
                <Typography sx={Styles.TagsText}>
                   <SellIcon />
                  {post.tags.map((tag, tagIndex) => (
                    <Fragment key={tagIndex}>
                      {tag.name}
                      {tagIndex !== post.tags.length - 1 && ', '}
                    </Fragment>
                  ))}
                </Typography>
                <Box sx={Styles.PostDescription}>
                    <Avatar src={post.creator.avatar} />
                    <Typography color="#448aff" variant="body1">{post?.creator.username}</Typography>
                    <Typography color="rgb(126, 126, 132)" variant="body2">{formatDistanceToNow(new Date(post.createdAt))} ago</Typography>
                </Box>
            </Box>
            <Card sx={Styles.PostBodyBox}>
              <CardContent>
                <Typography variant="body1">
                    {post?.body}
                </Typography>
                <Card sx={Styles.PostRatingBox}>
                  <CardContent sx={Styles.PostRatingBoxContent}>
                    <Box sx={Styles.FirstIconsGroup}>
                        <VisibilityIcon />
                            <Typography>
                                {post?.views}
                            </Typography>
                        <ChatBubbleRoundedIcon />
                            <Typography>
                                0
                            </Typography>
                    </Box>
                    <Box sx={Styles.SecondIconsGroup}>
                        <ThumbUpAltRoundedIcon />
                        <Typography color="#4baf50">
                            {post?.positiveMarks}
                        </Typography>
                        |
                        <Typography color="#ba6163">
                            -{post?.negativeMarks}
                        </Typography>
                        <ThumbDownAltRoundedIcon />
                    </Box>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </Box>
    </Box>
  );
};

export default PostPage;