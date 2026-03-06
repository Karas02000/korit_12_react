export default function MyForm() {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Form submitted!");
  };
    return (
    <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter your name" />
        <input type="submit" value="Submit" />
    </form>
  );
}