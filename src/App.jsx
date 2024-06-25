import Dictionary from "./Component/Dictionary";
import Nav from "./Component/Nav";

const App = () => {
  return (
    <>
      <main className="dictionary">
        <Nav />
        <Dictionary />
      </main>
    </>
  );
};

export default App;
