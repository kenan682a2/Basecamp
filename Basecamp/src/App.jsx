import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/User/Home/index.jsx';
import UserLogin from './Pages/User/Login/index.jsx'
import UserRoot from './Pages/User/UserRoot.jsx';
import UserRootNavless from './Pages/User/UserRootNavless.jsx';
import UserSignUp from './Pages/User/SignUp/index.jsx'
import AllProjects from './Pages/User/Projects/All Projects/index.jsx'
import AddProjectUser from './Pages/User/Projects/Add Project/index.jsx'
import EditProjectForm from './Pages/User/Projects/Edit Project/index.jsx';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<UserRootNavless />}>
          <Route index element={<Home />} />
          <Route path='login' element={<UserLogin />} />
          <Route path='signup' element={<UserSignUp />} />
          <Route path='projects' element={<UserRoot />} >
            <Route index element={<AllProjects />} />
            <Route path='add' element={<AddProjectUser />} />
            <Route path=':projectId/edit' element={<EditProjectForm />} />
          </Route>
          <Route path='*' element={<UserLogin />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;