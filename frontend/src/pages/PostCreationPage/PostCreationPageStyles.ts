import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';
import { styled } from '@mui/system';


export const MainBox : SxProps<Theme> = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#0a0a0a',
};

export const MainContentBox: SxProps<Theme> = {
        display: 'flex',
        margin: 'auto',
        backgroundColor: '#1f1f1f',
        color: '#bfbfbf',
        borderRadius: 2,
        padding: 3,
        flexDirection: 'column',
        width:"50%",
        maxWidth: '50%',
        gap: 2
};

export const TabsBox: SxProps<Theme> = {
    display: 'flex',
    alignSelf: 'center',
};

export const FormBox: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    width: '100%',
};

export const InputBox: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    pb: 3,
};

export const SubmitButton: SxProps<Theme> = {
    display: 'inline-flex',
};

export const EditorWrapper = styled('div')({
    border: '1px solid #444',
    borderRadius: '5px',
    backgroundColor: '#222',
    color: '#fff',
    padding: '15px',
    minHeight: '200px',
    '& .public-DraftEditor-content': {
        minHeight: '180px',
    },
    '& .rdw-editor-toolbar': {
        color: '#fff',
    },
});