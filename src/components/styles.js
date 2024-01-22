// styles.js
import { styled } from '@mui/system';

export const StyledContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: 4,
  position: 'relative',
});

export const StyledBox = styled('div')({
  width: '100%',
  marginBottom: 2,
  textAlign: 'center',
});

export const StyledGeneratedLinkBox = styled('div')({
  width: '100%',
  marginTop: 2,
  marginBottom: 2,
  textAlign: 'center',
  border: '1px solid #ddd',
  padding: 10,
  borderRadius: 5,
  backgroundColor: '#f9f9f9',
});

export const StyledDetailsBox = styled('div')({
  position: 'absolute',
  bottom: 10,
  right: 10,
  textAlign: 'right',
  padding: 10,
  border: '1px solid #ddd',
  borderRadius: 5,
  backgroundColor: '#f9f9f9',
  zIndex: 1,
});
