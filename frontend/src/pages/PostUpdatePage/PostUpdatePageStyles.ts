import { SxProps } from '@mui/system';
import {Box, Theme, Typography} from '@mui/material';
import { styled } from '@mui/system';


export const MainBox : SxProps<Theme> = {
    width: '100%',
    backgroundColor: '#0a0a0a',
    paddingBottom: '12em',
};


export const backgroundImageBox: SxProps<Theme> = {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundPosition: 'center !important',
    backgroundSize: 'cover !important',
    backgroundRepeat: 'no-repeat !important',
    '&::before': {
        boxSizing: 'border-box',
        background: 'radial-gradient(circle at center -100%,rgba(10,10,10,.5) 0,#0A0A0A 80%)',
        content: '""',
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        zIndex: '2',
    },
};

export const MainContentBox: SxProps<Theme> = {
    position: 'relative',
    display: 'flex',
    margin: 'auto',
    backgroundColor: '#1f1f1f',
    color: '#bfbfbf',
    borderRadius: 2,
    padding: 3,
    marginTop: '12em',
    flexDirection: 'column',
    width:"50%",
    maxWidth: '50%',
    gap: 2,
    zIndex: '3',
};

export const TabsBox: SxProps<Theme> = {
    display: 'flex',
    alignSelf: 'center',
    zIndex: '3',
};

export const FormBox: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    width: '100%',
    zIndex: '3',
};

export const InputBox: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    pb: 1,
    zIndex: '3',
};

export const SubmitButton: SxProps<Theme> = {
    display: 'flex',
    alignSelf: 'end',
    aspectRatio: '5 / 2',
    width: '120px',
    zIndex: '3',
};

export const EditorWrapper = styled('div')({
    border: '1px solid #444',
    borderRadius: '5px',
    backgroundColor: '#222',
    color: '#fff',
    minHeight: '200px',
    theme: 'gray',
    zIndex: 2001,
    '& .public-DraftEditor-content': {
        minHeight: '180px',
    },
    '& .rdw-editor-toolbar': {
        color: 'black',
    },
});

export const ImageUploadBox = styled(Box)(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    aspectRatio: '10 / 3',
    borderRadius: '5px',
    border: '1px solid',
    borderColor: theme.palette.grey[800],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    cursor: 'pointer',
    margin: 'auto',
    zIndex: '3',
}));

export const ImageUploadText = styled(Typography)(({ theme }) => ({
    position: 'absolute',
    display: 'flex',
    justifySelf: 'center',
    alignSelf: 'center',
    overflowWrap: 'normal',
    color: theme.palette.grey[500],
    fontWeight: 'bold',
    fontSize: '1.5rem',
    zIndex: '3',
}));