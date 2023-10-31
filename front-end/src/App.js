import './App.css';
import Menu from './components/ChatPage/SideBar/Menu';
import LoginForm from './components/LoginForm/LoginForm';
import SignUpForm from './components/SignUpForm/SignUpForm';
import ChatPage from './components/ChatPage/ChatPage';
import Setting from './components/Setting/Setting';
function App() {
  return (
    <div className="App">
      {/* <LoginForm/>  */}
      {/* <SignUpForm/> */}
       <ChatPage/> 
      {/* <Setting/> */}
      {/* <Menu/>  */}
    </div>
  );
}

export default App;
