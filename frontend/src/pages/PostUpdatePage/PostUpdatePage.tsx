import React, { ReactElement, useEffect, useState } from "react"
import { Box,Tab, Button, TextField, Tabs, Autocomplete } from "@mui/material";
import { EditorWrapper, ImageUploadBox, ImageUploadText } from './PostUpdatePageStyles';
import { visuallyHidden } from '@mui/utils';
import Header from "../../components/Header/Header"
import * as Styles from './PostUpdatePageStyles';
import PostService from "../../services/PostService"
import { TagDto } from "../../models/post/TagDto"
import { PostUpdateRequest } from "../../models/post/PostUpdateRequest"
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import {useAuth} from "../../context/AuthContext";
import { postUpdateSchema } from "../../schemas/validationSchemas";
import {ValidationError} from "yup";
import { groupBy } from 'lodash';
import {useNavigate, useLocation, useParams} from "react-router-dom";
import {PostDto} from "../../models/post/PostDto";

const PostUpdatePage = (): ReactElement => {
    const [post, setPost] = useState<PostDto | undefined>(useLocation().state?.post);
    const [tabNumber, setTabNumber] = useState(0);
    const [tags, setTags] = useState<TagDto[]>([]);
    const [selectedTags, setSelectedTags] = useState<TagDto[]>([]);
    const [file, setFile] = useState<FileList | null>(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
    const { isAuthenticated, user } = useAuth()
    const [ errors, setErrors ] = useState<any>({});
    const { id } = useParams()
    const [ isAllowed, setIsAllowed ] = useState<boolean>(false)

    const [editorState, setEditorState] = useState(() => {
        const blocksFromHtml = htmlToDraft(post?.body || '');
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        return EditorState.createWithContent(contentState);
    });

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [tagIds, setTagIds] = useState<number[]>([]);
    const [body, setBody] = useState('');
    const navigate = useNavigate();



    const fetchTags = async () => {
        const response = await PostService.getAllTags();
        setTags(response.data);
        const correspondingTags = response.data.filter(tag => post?.tags.some((t: TagDto) => t.id === tag.id));
        setSelectedTags(correspondingTags);
    };

    useEffect(() => {
        if (!isAuthenticated() || !post || user.username !== post.creator.username) {
            navigate('*');

        }else {
            setFile(null)
            setTitle(post.title);
            setDescription(post.description);
            setBody(post.body);
            setUploadedImageUrl(post.posterUrl);
            setIsAllowed(true);

            fetchTags();
        }

    }, [post, isAuthenticated, navigate, isAllowed, user]);

    const onEditorStateChange = (editorState: EditorState) => {
        setEditorState(editorState);
        setBody(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    };

    useEffect(() => {
        const fetchTags = async () => {
            const response = await PostService.getAllTags();
            setTags(response.data);
        };

        fetchTags();
    }, []);

    useEffect(() => {
        setTagIds(selectedTags.map((tag: TagDto) => tag.id));
    }, [selectedTags]);

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setTabNumber(newValue);
    };

    const handleFileChange = (fileList: FileList | null) => {
        if (fileList && fileList.length > 0) {
            setFile(fileList);
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImageUrl(reader.result as string);
            };
            reader.readAsDataURL(fileList[0]);
        }
    };

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const postRequest: PostUpdateRequest = {
            title,
            description,
            tagIds,
            body,
            poster: file || null,
        };

        try {
            await postUpdateSchema.validate(postRequest, {abortEarly: false});
            await PostService.update(Number(id) ,postRequest);
            navigate(`/posts/${id}`);
        } catch (e) {
            if (e instanceof ValidationError) {
                const fieldErrors = groupBy(e.inner, 'path')
                setErrors(fieldErrors)
            }
        }
    };

    if(!isAllowed) {
        return <></>;
    }

    return (
        <Box sx={Styles.MainBox}>
            <Header />
            <Box sx={Styles.backgroundImageBox} style={{backgroundImage: `url(${uploadedImageUrl})`}} />

            <Box sx={Styles.MainContentBox}>

                <Tabs sx={Styles.TabsBox} value={tabNumber} onChange={handleTabChange}>
                    <Tab label="General" />
                    <Tab label="Post Body" />
                </Tabs>

                <Box component="form" sx={Styles.FormBox} onSubmit={onSubmit}>
                    {tabNumber === 0 && (
                        <Box sx={Styles.FormBox}>
                            <ImageUploadBox
                                component="label"
                                style={{
                                    backgroundImage: uploadedImageUrl ? `url(${uploadedImageUrl})` : undefined,
                                }}
                            >
                                {!uploadedImageUrl && <ImageUploadText>Click To Upload Poster</ImageUploadText>}
                                <input type="file" style={visuallyHidden} onChange={(e) => handleFileChange(e.target.files)} /> </ImageUploadBox>
                            {errors["poster"] && <p style={{ color: "red" }}>{errors["poster"][0].message}</p>}

                            <TextField
                                sx={Styles.InputBox}
                                label="Post Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            {errors["title"] && <p style={{ color: "red" }}>{errors["title"][0].message}</p>}
                            <TextField
                                sx={Styles.InputBox}
                                label="Post Description"
                                multiline
                                inputProps={{maxLength: 550 }}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            {errors["description"] && <p style={{ color: "red" }}>{errors["description"][0].message}</p>}

                            <Autocomplete
                                sx={Styles.InputBox}
                                multiple
                                options={tags}
                                value={selectedTags}
                                getOptionLabel={(option) => option.name}
                                onChange={(event, newValue: TagDto[]) => {
                                    setSelectedTags(newValue);
                                }}
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                                renderInput={(params) => (
                                    <TextField {...params} variant="outlined" label="Tags" placeholder="Tags" />
                                )}
                            />
                            {errors["tagIds"] && <p style={{ color: "red" }}>{errors["tagIds"][0].message}</p>}

                        </Box>
                    )}
                    {tabNumber === 1 && (
                        <Box>
                            <EditorWrapper>
                                <Editor
                                    editorState={editorState}
                                    onEditorStateChange={onEditorStateChange}
                                    editorClassName="demo-editor"
                                />
                            </EditorWrapper>
                            {errors["body"] && <p style={{ color: "red" }}>{errors["body"][0].message}</p>}
                        </Box>
                    )}
                    <Button sx={Styles.SubmitButton} variant="outlined" type="submit">APPLY</Button>
                </Box>
            </Box>
        </Box>
    );
};

export default PostUpdatePage;