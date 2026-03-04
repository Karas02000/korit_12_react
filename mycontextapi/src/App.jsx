import MyComponent from "./MyComponent.jsx";
import './App.css';
import AuthContext from "./CreateContext.js";

function App() {
  const username = "Kim0";
  return (
    <AuthContext.Provider value={username}>
      <MyComponent username={username} />
    </AuthContext.Provider>
  );
}

export default App;