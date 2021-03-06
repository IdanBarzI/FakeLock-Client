import React, { Suspense } from "react";
import { Layout, LoadingSpinner, ProtectedRoute } from "./UIKit";
import { Route, Routes } from "react-router-dom";

const Welcome = React.lazy(() => import("./pages/Welcome/Welcome"));
const Profile = React.lazy(() => import("./pages/Profile/Profile"));
const Friends = React.lazy(() => import("./pages/Friends/Friends"));
const Posts = React.lazy(() => import("./pages/Posts/Posts"));
const Map = React.lazy(() => import ("./pages/Map/Map"))
const NotFound = React.lazy(() => import("./pages/NotFound/NotFound"));

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
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/friends" element={<Friends />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/map" element={<Map/>}/>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;
