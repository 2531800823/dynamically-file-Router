import { Routes, Route, useNavigate } from "react-router-dom";
import React, { Suspense, useEffect, useState } from "react";

function App() {
  const [count, setCount] = useState<string[]>(() => {
    return [];
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/files")
      .then((res) => res.json())
      .then((res) => {
        setCount(res);
      });
  }, []);

  return (
    <div>
      <header
        style={{ height: 40, border: "1px solid red", padding: "0 10px" }}
      >
        <button
          style={{ height: "100%", marginRight: "4px" }}
          onClick={() => {
            navigate("/");
          }}
        >
          首页
        </button>
        {count.map((item) => {
          const str = item.replace(".tsx", "");

          return (
            <button
              style={{ height: "100%", margin: "0 4px" }}
              onClick={() => {
                navigate("/" + str);
              }}
              key={str}
            >
              {str}
            </button>
          );
        })}
      </header>
      <Routes>
        {count.map((item) => {
          const str = item.replace(".tsx", "");

          const Component = React.lazy(() => import(`./pages/${str}.tsx`));
          console.log(str);
          return (
            <Route
              key={str}
              path={"/" + str}
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Component />
                </Suspense>
              }
            />
          );
        })}
      </Routes>
    </div>
  );
}

export default App;
