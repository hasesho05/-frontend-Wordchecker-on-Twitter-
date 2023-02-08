import { Button } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import { auth, twitterProvider } from '../../config';
import { signInWithPopup, TwitterAuthProvider } from 'firebase/auth';

const TwitterLoginButton = () => { 
  const TwitterLogin = () => {
    signInWithPopup(auth, twitterProvider).then( async (result) => {
      const credential = TwitterAuthProvider.credentialFromResult(result)
      const token = credential?.accessToken
      const secret = credential?.secret
      const user = result.user
      console.log(user);
      
    }).catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      const email = error.email
      const credential = TwitterAuthProvider.credentialFromError(error)
    })
  } 
  return (
  <Button color="primary" variant="contained" startIcon={<TwitterIcon />}  onClick={TwitterLogin} >
    Twitterで認証
  </Button>
  );
}

export default TwitterLoginButton;