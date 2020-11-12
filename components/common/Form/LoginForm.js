import firebase from 'firebase/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

// Configure FirebaseUI.
const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [{
    provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    defaultCountry: 'ID'
  }]
};


const LoginForm = ({ onSuccess }) => (
  <StyledFirebaseAuth
    uiConfig={{
      ...uiConfig,
      callbacks: {
        signInSuccess() {
          if (onSuccess) onSuccess();
          return false;
        }
      }
    }}
    firebaseAuth={firebase.auth()}
  />
)

export default LoginForm;