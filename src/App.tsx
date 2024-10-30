import "./App.css";
import Character from "./character/Character";

function App() {
  // Add character functionality not implemented yet
  // const addCharacter = () => {

  // }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise - William Yi</h1>
      </header>
      <section className="App-section">
        <button>Add Character</button>
        <button>Save Characters</button>
        <div>{<Character />}</div>
      </section>
    </div>
  );
}

export default App;
