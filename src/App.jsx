import setup from "./coalesce";
import { useEffect } from "react";

function Button({ txt, icon }) {
  return (
    <button className="capitalize px-4 py-2 text-base bg-primary rounded-md flex items-center gap-2 transition-transform duration-100 active:scale-95 active:shadow-inner">
      {icon && <span>{icon}</span>}
      {txt}
    </button>
  );
}

function Header() {
  return (
    <header className="flex justify-between items-center">
      <div className="text-4xl font-light">
        <span className="text-primary">Chrono</span>Leet
      </div>
    </header>
  );
}

function App() {



  
  useEffect(() => {
    setup();
  }, []);

  return (
    <div id="app" className="font-poppins font-normal">
      <div className="content--canvas"></div>
      <main className="absolute mx-auto text-white w-screen px-16 mt-10">
        <Header />
      </main>
    </div>
  );
}

export default App;