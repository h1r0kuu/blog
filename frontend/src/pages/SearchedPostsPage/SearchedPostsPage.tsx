import {ReactElement, useEffect, useState} from "react"
import Header from "../../components/Header/Header"
import Feed from "../../components/Feed/Feed"
import { useAuth } from "../../context/AuthContext"
import {Box, Card, CardActions, CardContent, CardMedia, Chip, Typography} from "@mui/material";
import {PostDto} from "../../models/post/PostDto";
import {Link} from "react-router-dom";
import {POST} from "../../constants/pathConstants";
import {Label as TagsIcon, ThumbsUpDown as MarksIcon, Visibility as ViewsIcon} from "@mui/icons-material";
import {formatDistanceToNow} from "date-fns";
import { useLocation, useNavigate } from 'react-router-dom';
import PostService from "../../services/PostService";


const SearchedPostsPage = (): ReactElement => {
    const { user } = useAuth()
    const location = useLocation();
    const navigate = useNavigate()
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || null;
    const tagsParam = params.get('tags');
    const tags = tagsParam ? tagsParam.split(',') : null;
    const [posts, setPosts] = useState<PostDto[]>([])


    useEffect(() => {
        const fetchPosts = async () => {
            if (query) {
                const response = await PostService.findByQuery(query)
                setPosts(response.data)
            }
            if(tags){
                const response = await PostService.findByTags(tags)
                setPosts(response.data)
            }
        }
        fetchPosts()
    }, [query])




    return (
        <>
            <Header />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center', marginTop: 4 }}>
                <Box>
                    {query && tags === null && <Typography variant="h5" sx={{ mb: '6px', }} color="grey">Search results for: {query}</Typography>}
                    {tags && query === null && <Typography variant="h5" sx={{ mb: '6px', }} color="grey">Search results for tags: {tags.join(', ')}</Typography>}
                    {tags && query &&
                        <>
                            <Typography variant="h5" sx={{ mb: '6px', }} color="grey">Search results for: {query}</Typography>
                            <Typography variant="h5" sx={{ mb: '6px', }} color="grey">Tags: {tags.join(', ')}</Typography>
                        </>
                    }
                </Box>
                {posts && posts.map((post: PostDto, index: number) => (
                        <Card key={index} sx={{ display: 'flex', flexDirection: 'column', border: '1px solid grey', borderRadius: 4, maxWidth: 600, width: '100%' }}>
                            <Link to={`${POST}/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: '100%', objectFit: 'cover', aspectRatio: '10 / 3', }}
                                    image={post.posterUrl}
                                    alt={post.title}
                                />
                            </Link>
                                <CardContent>
                                <Box sx={{ display: 'flex', mb: '6px', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                                    <TagsIcon />
                                    {post.tags.map((tag, tagIndex) => (
                                        <Chip
                                            key={tagIndex}
                                            label={tag.name}
                                            variant="outlined"
                                            onClick={(event) => {
                                                navigate(`/posts/search?tags=${tag.name}`);
                                            }}
                                        />
                                    ))}
                                </Box>
                                    <Link to={`${POST}/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>

                                        <Typography variant="h6" sx={{ mb: '6px', }} color="text.primary">{post.title}</Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ overflowWrap: 'break-word' }}>{post.description}</Typography>
                                    </Link>
                                </CardContent>
                            <Link to={`${POST}/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>

                                <CardActions disableSpacing sx={{
                                    justifyContent: 'space-between',
                                    padding: '0 16px 16px 16px',
                                }}>
                                    <Box sx={{ display: 'flex', gap: '12px'}}>
                                        <Box sx={{ display: 'flex', gap: '12px' }}>
                                            <ViewsIcon />
                                            <Typography variant="body2">{post.views}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', gap: '12px' }}>
                                            <MarksIcon />
                                            <Typography variant="body2">{post.mark}</Typography>
                                        </Box>
                                    </Box>
                                    <Typography variant="body2">{formatDistanceToNow(new Date(post.createdAt))} ago</Typography>
                                </CardActions>
                            </Link>
                        </Card>
                ))}
            </Box>
        </>
    )
}

export default SearchedPostsPage
