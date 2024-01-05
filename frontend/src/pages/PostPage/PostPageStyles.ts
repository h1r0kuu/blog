import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';


export const MainBox : SxProps<Theme> = {
    width: '100%',
    height: '100%',
    backgroundColor: '#0a0a0a',
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%' ,
        zIndex: '3',
        paddingTop: '12em',
        gap: 2
};

export const PostInfoBox: SxProps<Theme> = {
         display: 'flex',
         alignSelf: 'center',
         justifyContent: 'center',
         width:"50%",
         maxWidth: '50%',
         flexDirection: 'column',
         alignItems: 'center',
         gap: 2,
         zIndex: '3',
};


export const PostTitle: SxProps<Theme> = {
        fontSize: '24px',
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: '1.4',
        color: '#bfbfbf',
        fontFamily: '-apple-system,BlinkMacSystemFont,Open Sans,Roboto,Helvetica Neue,Helvetica,sans-serif',
};

export const PostDescription: SxProps<Theme> = {
        display: 'flex',
        justifyContent: 'center',
        width:"100%",
        zIndex: '3',
        alignItems: 'center',
        alignSelf: 'center',
        gap: 2
};


export const PostBodyBox: SxProps<Theme> = {
        backgroundColor: '##1c1c1e',
        color: '#bfbfbf',
        width:"50%",
        maxWidth: '50%',
        zIndex: '3',
        borderRadius: 2,
        p: 2,
        mt: 2,
        mb: 2,
        overflowWrap: 'break-word',
        fontSize: '1rem',
        lineHeight: '1.4',
        fontFamily: '-apple-system,BlinkMacSystemFont,Open Sans,Roboto,Helvetica Neue,Helvetica,sans-serif',
};


export const PostRatingBox: SxProps<Theme> = {
    display: 'flex',
    marginTop: '40px',
    backgroundColor: '#252528',
    width:"100%",
    height: '42px',
    borderRadius: '6px',
    color: '#88888f',
    fontSize: '1rem',
    lineHeight: '1.4',
    fontFamily: '-apple-system,BlinkMacSystemFont,Open Sans,Roboto,Helvetica Neue,Helvetica,sans-serif',

};


export const PostRatingBoxContent: SxProps<Theme> = {
    display: 'flex',
    backgroundColor: '#252528',
    width:"100%",
    height: '100%',
    maxHeight: '42px',
    paddingBottom: '16px !important',
    alignItems: 'center',
    margin: '0',
    justifyContent: 'space-between',
    fontSize: '1rem',
    lineHeight: '1.4',
    fontFamily: '-apple-system,BlinkMacSystemFont,Open Sans,Roboto,Helvetica Neue,Helvetica,sans-serif',
};

export const FirstIconsGroup: SxProps<Theme> = {
    display: 'inline-flex',
    gap : '12px',
};

export const SecondIconsGroup: SxProps<Theme> = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
};

export const TagsText: SxProps<Theme> = {
    color: '#bfbfbf',
    fontSize: '1rem',
    lineHeight: '1.4',
    fontFamily: '-apple-system,BlinkMacSystemFont,Open Sans,Roboto,Helvetica Neue,Helvetica,sans-serif',
};

export const EditButtonStyle: SxProps<Theme> = {

};

export const DeleteButtonStyle: SxProps<Theme> = {

};