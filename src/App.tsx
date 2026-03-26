import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Index from "./pages/Index";
import OngoingProjects from "./pages/OngoingProjects";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/ongoingproject" element={<OngoingProjects />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
