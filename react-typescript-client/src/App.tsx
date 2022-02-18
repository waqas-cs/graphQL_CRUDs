import React from "react";
import "./App.css";
import Book from "./pages/book";
import Person from "./pages/person";
import Home from "./pages/home";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function App() {
  // const [year, setYear] = useState("");
  // const inputRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  return (
    <>
      {/* <input type="text" ref={inputRef} />
      <button onClick={() => setYear(inputRef.current.value)}>submit</button> */}
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/person">Persons</Link>
              </li>
              <li>
                <Link to="/book">Books</Link>
              </li>
              {/* <li>
                <Link to="/mutation">mutation</Link>
              </li> */}
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/person" element={<Person year={year} />} /> */}
            <Route path="/person" element={<Person />} />
            <Route path="/book" element={<Book />} />
            {/* <Route path="/mutation" element={<Mutation />} /> */}
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
