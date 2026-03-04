import Drink from "./Drink.jsx";
import Hello from "./Hello.jsx";
import MyComponent from "./MyComponent.jsx";
import MyComponent2 from "./MyComponent2.jsx";
import MyComponent3 from "./MyComponent3.jsx";

export default function App() {
  return(
    <>
      <MyComponent />
      <MyComponent2 isLoggedin={true} />
      <MyComponent2 isLoggedin={false} />
      <MyComponent3 isLoggedin={true} />
      <MyComponent3 isLoggedin={false} />
      <Drink drink="coffee" />
      <Hello firstName="Homer" lastName="Simson" />
      <Hello firstName="Marge" lastName="Simson" />
      <Hello firstName="Bart" lastName="Simson" />
      <Hello firstName="Lisa" lastName="Simson" />
      <Hello firstName="Maggie" lastName="Simson" />
    </>
  )
}