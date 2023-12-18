import { ReactElement, useEffect, useState, useRef } from "react"
import { Box, Card, CardContent, Tab, Button, TextField, Tabs, Autocomplete } from "@mui/material";
import { EditorWrapper } from './PostCreationPageStyles';
import { visuallyHidden } from '@mui/utils';
import Header from "../../components/Header/Header"
import * as Styles from './PostCreationPageStyles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PostService from "../../services/PostService"
import { TagDto } from "../../models/post/TagDto"
import { PostCreationRequest } from "../../models/post/PostCreationRequest"
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';



const PostCreationPage = (): ReactElement => {

  const [value, setValue] = useState(0);
  const [tags, setTags] = useState<{ id: number, title: string }[]>([]);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());


  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const tagsRef = useRef<{ id: number, title: string }[]>([]);
  const fileRef = useRef<File | null>(null);

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };

  useEffect(() => {
      const fetchTags = async () => {
        const response = await PostService.getAllTags();
        const tagTitles = response.data.map(tag => ({ id: tag.id, title: tag.name }));
        setTags(tagTitles);
      };

      fetchTags();
  }, []);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        fileRef.current = event.target.files[0] as File;
      }
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //if (tagsRef.current.length === 0) return alert('Please select at least one tag.');
    if (!fileRef.current) return alert('Please upload a poster.');
    const title = titleRef.current?.value;
    const description = descriptionRef.current?.value;
    const tags = tagsRef.current;
    const file = fileRef.current;
    const body = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    const tagDtos: TagDto[] = tags.map(tag => ({ id: tag.id, name: tag.title }));

    const postRequest: PostCreationRequest = {
      title: title || '',
      body: body || '',
      description: description || '',
      tags: tagDtos,
      creatorUsername: 'MeZerius',
      poster: file || undefined
    };

    console.log(postRequest);
    PostService.create(postRequest)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });

  };

  return (
    <Box sx={Styles.MainBox}>
        <Header />
        <Box sx={Styles.MainContentBox}>
          <Tabs sx={Styles.TabsBox} value={value} onChange={handleChange}>
            <Tab label="General" />
            <Tab label="Post Body" />
          </Tabs>
          {value === 0 && (
            <Box sx={Styles.FormBox}>
              <form onSubmit={handleSubmit}>
                <TextField
                    sx={Styles.InputBox}
                    label="Post Title"
                    required
                    inputProps={{ minLength: 6 }}
                    name="title"
                    inputRef={titleRef}
                />
                <TextField
                  sx={Styles.InputBox}
                  label="Post Description"
                  required
                  multiline
                  inputProps={{ minLength: 250, maxLength: 550 }}
                  name="description"
                  inputRef={descriptionRef}
                />
                <Autocomplete
                  sx={Styles.InputBox}
                  multiple
                  options={tags}
                  getOptionLabel={(option: { id: number, title: string }) => option.title}
                  onChange={(event, newValue) => {
                    tagsRef.current = newValue;
                  }}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Tags" placeholder="Tags" />
                  )}
                />
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                  Upload Poster
                  <input type="file" onChange={handleFileChange} style={visuallyHidden} />
                </Button>
                <Button sx={Styles.SubmitButton} variant="outlined" type="submit">CREATE</Button>
              </form>
            </Box>
          )}
        {value === 1 && (
          <Box>
            <EditorWrapper>
                <Editor
                    editorState={editorState}
                    onEditorStateChange={onEditorStateChange}
                    editorClassName="demo-editor"
                />
            </EditorWrapper>
            <Button sx={Styles.SubmitButton} variant="outlined" type="submit">CREATE</Button>
          </Box>
        )}
        </Box>
    </Box>
  );
};

export default PostCreationPage;