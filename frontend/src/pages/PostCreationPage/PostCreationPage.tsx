import React, { ReactElement, useEffect, useState } from "react"
import { Box,Tab, Button, TextField, Tabs, Autocomplete } from "@mui/material";
import { EditorWrapper, ImageUploadBox, ImageUploadText } from './PostCreationPageStyles';
import { visuallyHidden } from '@mui/utils';
import Header from "../../components/Header/Header"
import * as Styles from './PostCreationPageStyles';
import PostService from "../../services/PostService"
import { TagDto } from "../../models/post/TagDto"
import { PostCreationRequest } from "../../models/post/PostCreationRequest"
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import {useAuth} from "../../context/AuthContext";
import { postCreationSchema } from "../../schemas/validationSchemas";
import {ValidationError} from "yup";
import { groupBy } from 'lodash';
import { useNavigate } from "react-router-dom";


const PostCreationPage = (): ReactElement => {
  const [tabNumber, setTabNumber] = useState(0);
  const [tags, setTags] = useState<TagDto[]>([]);
  const [selectedTags, setSelectedTags] = useState<TagDto[]>([]);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [file, setFile] = useState<FileList | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const { isAuthenticated, user } = useAuth()
  const [ errors, setErrors ] = useState<any>({});


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tagIds, setTagIds] = useState<number[]>([]);
  const [body, setBody] = useState('');


  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

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

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
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

    const postRequest: PostCreationRequest = {
      title,
      description,
      tagIds,
      body,
      creatorUsername: user?.username || '',
      poster: file || undefined,
    };

    console.log(postRequest)

    try {
      await postCreationSchema.validate(postRequest, {abortEarly: false});
      let response = await PostService.create(postRequest);
      let createdPostId = response.data as number;
      navigate('/posts/' + createdPostId);
    } catch (e) {
      if (e instanceof ValidationError) {
        console.log(e)
        const fieldErrors = groupBy(e.inner, 'path')
        setErrors(fieldErrors)
        console.log(fieldErrors)
      }
    }
  };

  return (
      <Box sx={Styles.MainBox}>
        <Header />
        <Box sx={Styles.backgroundImageBox} style={{backgroundImage: `url(${uploadedImageUrl})`}} />

        <Box sx={Styles.MainContentBox}>

          <Tabs sx={Styles.TabsBox} value={tabNumber} onChange={handleChange}>
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
                        setTagIds(newValue.map(tag => tag.id));
                      }}
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
            <Button sx={Styles.SubmitButton} variant="outlined" type="submit">CREATE</Button>
          </Box>
        </Box>
      </Box>
  );
};

export default PostCreationPage;