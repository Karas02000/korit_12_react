import { useState } from "react";

export default function MyComponent() {
  const [ firstName, setFirstName ] = useState('Ned');
  const [ lastName, setLastName ] = useState('Flanders');

  return(
    <>
      <div>Hello {firstName} {lastName}</div>
    </>
  );
}