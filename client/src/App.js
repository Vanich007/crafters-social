import './App.css';
import HeaderContainer from './components/Header/HeaderContainer';
import Footer from './components/Footer/Footer';
import Nav from './components/Nav/Nav';
import { BrowserRouter as Router, Route,Redirect } from 'react-router-dom'
import s from './App.module.css';
import SignUp from './components/Nav/Signup';
import  UsersContainer from './components/Content/UsersContainer';
import UserByIdContainer from './components/Content/UserById.jsx';
import ProfileContainer from './components/Profile/Profile'
import PhotoContainer from './components/Profile/Photos'
import DialogsContainer from './components/Dialogs/Dialogs';
import DialogByUserIdContainer from './components/Dialogs/DialogByUserId'
import SearchedPostsContainer from './components/Posts/SearchPosts'
import ProjectsContainer from './components/Projects/Projects'
import ProjectByIdContainer from './components/Projects/ProjectById'
import PostByIdContainer from './components/Profile/PostById'
import SearchPostsContainer from './components/Search/Search'
import LentaContainer from './components/Lenta/Lenta'

function App() {
  
  return (
    <Router>
      <div className={s.wrapper}>
    <div className={s.App}>
      <div className={s.Header}> 
      <HeaderContainer />
      </div>
      <div className={s.Main}>
        <div className={s.Nav}>
          <Nav /></div>
        <div className={s.Content}>
            
            {/* <Route path='/users/:id'
            render={{ match } => {
              const { id } = match.params;
              return <User1ById userId={id}  />

              }}> 
             </Route> */}
            <Route exact path='/'><Redirect to ='/profile'/></Route>
             <Route  path='/search' component={SearchPostsContainer}> 
              </Route>  
             <Route path='/users/:userId' component={UserByIdContainer}>
            </Route> 
            <Route  path='/dialogs/:userId' component={DialogByUserIdContainer}> 
            </Route> 
             <Route  path='/tags/:tag' component={SearchedPostsContainer}> 
              </Route>  
              <Route path='/projects/:projectId' component={ProjectByIdContainer}> 
              </Route> 
              <Route  path='/posts/:postId' component={PostByIdContainer}> 
              </Route> 
             
           

          <Route exact path='/users/' >
                <UsersContainer /> </Route>  
               <Route exact path='/lenta/' >
              <LentaContainer /> </Route>  
            
            <Route exact path='/signup/' >
            <SignUp /> </Route>  
          
            
            {/* <Route  path='/users/:userId' component={UserByIdContainer}> </Route>    */}
            <Route exact path='/profile/' >
              <ProfileContainer /> </Route>  
              <Route exact path='/gallery/' >
              
              <PhotoContainer /> </Route>    
              <Route exact path='/dialogs/' >
                <DialogsContainer /> </Route>    
<Route exact path='/projects/' >
              <ProjectsContainer /> </Route>                
                               
        </div>
          </div>
          <div className={s.Footer}>
      <Footer />
      </div>
</div></div>
      </Router>
  );
}

export default App;
