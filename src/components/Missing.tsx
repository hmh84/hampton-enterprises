import { styled } from '@mui/material/styles';

const LoadingRoot = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: '3em',
});

const LoadingWrapper = styled('div')({
    textAlign: 'center',
    opacity: 0.8,
    margin: '0 1em',
});

interface LoadingProps {
    text?: string;
}

export default function Missing({ text = 'Nothing exists here yet...' }: LoadingProps) {
    return (
        <LoadingRoot sx={{ mb: 2 }}>
            <LoadingWrapper aria-live="polite">
                <div>{text}</div>
            </LoadingWrapper>
        </LoadingRoot>
    );
}
