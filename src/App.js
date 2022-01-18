import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./pages/auth/Register/Register";
import Login from "./pages/auth/Login/Login";
import VerifyEmail from "./pages/auth/VerifyEmail/VerifyEmail";
import CompleteVerify from "./pages/auth/CompleteVerify/CompleteVerify";
import ForgotPassword from "./pages/auth/ForgotPassword/ForgotPassword";
import ConfirmPassCode from "./pages/auth/ConfirmPasscode/ConfirmPassCode";
import CreateNewPassword from "./pages/auth/CreateNewPassword/CreateNewPassword";
import ResetSuccess from "./pages/auth/ResetSucess/ResetSuccess";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/profile/Profile";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import SocialAuth from "./pages/auth/SocialAuth";
import ProfileAccount from "./pages/profile/ProfileAccount";
import ProfileNotification from "./pages/profile/ProfileNotification";
import Video from "./pages/video/Video";
import VideoList from "./pages/video/VideoList";


function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/' component={Landing} exact />
          <Route path='/sign-up' component={Register} exact />
          <Route path='/login' component={Login} exact />
          <Route path='/verify' component={VerifyEmail} exact />
          <Route path='/verify-complete' component={CompleteVerify} exact />
          <Route path='/forgot' component={ForgotPassword} exact />
          <Route path='/confirm-code' component={ConfirmPassCode} exact />
          <Route path='/reset-password' component={CreateNewPassword} exact />
          <Route path='/reset-successfull' component={ResetSuccess} exact />

          <Route path='/dashboard' component={Dashboard} exact />
          <Route path='/profile' component={Profile} exact />
          <Route path='/profile/account' component={ProfileAccount} exact />
          <Route path='/profile/notification' component={ProfileNotification} exact />
          <Route path='/video' component={Video} exact />
          <Route path='/video/video-list' component={VideoList} exact />
          <Route path='/privacy-policy' component={Privacy} exact />
          <Route path='/terms-service' component={Terms} exact />
          <Route path='/login/social' component={SocialAuth} exact />
        </Switch>
      </Router>

    </>
  );
}

export default App;
