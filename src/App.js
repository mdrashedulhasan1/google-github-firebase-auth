import './App.css';
import app from './firebase.init';
import { getAuth, signOut, GoogleAuthProvider, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { useState } from 'react';
function App() {
  const [user, setUser] = useState({});
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const gitHubProvider = new GithubAuthProvider();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        console.log(user)
        setUser(user)
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(errorCode);
      });
  };
  const handleGitHubSignIn = () => {
    signInWithPopup(auth, gitHubProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        console.log(user)
        setUser(user)
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        console.log(errorCode);
      });
  };
  const handleSignOut = () => {
    signOut(auth).then(() => {
      setUser({})
    }).catch((error) => {
      setUser({})
    });
  }
  return (
    <div className="App">
      {
        user.displayName ? <button onClick={handleSignOut}>SignOut</button> :
          <div>
            <button onClick={handleGoogleSignIn}>GoogleSignIn</button>
            <button onClick={handleGitHubSignIn}>GitHubSignIn</button>
          </div>
      }
      <h1>{user.displayName}</h1>
      <p>{user.email}</p>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
