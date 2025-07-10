
import setup from "./coalesce";
import { useEffect } from "react";

function Header()
{
  return (
    <header>
      <div className="text-6xl"><span className="text-primary">Chrono</span>Leet</div>
    </header>
  )
}

function App() {
  useEffect(() => {
    setup();
  });
  return (
    <div id="app font-poppins font-thin">
      <div className="content--canvas"></div>
      <main className="container text-white ">
        <Header />
      </main>
    </div>
  );
}

export default App;
