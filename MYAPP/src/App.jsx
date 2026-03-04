import Drink from "./Drink.jsx";
import Hello from "./Hello.jsx";
import MyComponent from "./MyComponent.jsx";

export default function App() {
  return(
    <>
      <MyComponent />
      <Drink drink="coffee" />
      <Hello firstName="Homer" lastName="Simson" />
      <Hello firstName="Marge" lastName="Simson" />
      <Hello firstName="Bart" lastName="Simson" />
      <Hello firstName="Lisa" lastName="Simson" />
      <Hello firstName="Maggie" lastName="Simson" />
    </>
  )
}