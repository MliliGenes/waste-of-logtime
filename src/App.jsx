
import setup from "./coalesce";
import { useEffect } from "react";

function Button({txt}){
  return (
    <button className="capitalize">
      {txt}
    </button>
  )
}

function Header()
{
  return (
    <header className="flex justify-between items-center ">
      <div className="text-6xl font-light"><span className="text-primary">Chrono</span>Leet</div>
      <Button txt="add User" />
    </header>
  )
}

function App() {
  
  useEffect(() => {
    setup();
  });

  return (
    <div id="app" className="font-poppins font-normal">
      <div className="content--canvas"></div>
      <main className="absolute mx-auto text-white w-screen px-10 mt-10">
        <Header />
      </main>
    </div>
  );
}

export default App;
