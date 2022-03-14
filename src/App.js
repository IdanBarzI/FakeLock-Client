import React, { Suspense } from "react";
import { Layout, LoadingSpinner } from "./UIKit";
import { Route, Routes } from "react-router-dom";

const Welcome = React.lazy(() => import("./pages/Welcome"));

const App = () => {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Welcome />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;
