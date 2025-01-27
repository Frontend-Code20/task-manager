import { Route, Routes, BrowserRouter } from "react-router";

// Importing reusable components 
import Layout from "./components/Layout/layout"; 
import Dashboard from "./components/Layout/dashboard"; 
import CreateTask from "./components/Task/createTask"; 
import CreateList from "./components/List/createList"; 
import Authentication from "./components/Account/authentication"; 
import ViewTasks from "./components/viewTasks"; 
import ViewTask from "./components/viewTask"; 
import ViewList from "./components/List/viewList"; 
import CreateTaskBoundary from "./components/ErrorBoundraies/createTaskBoundary"; 
import DashboardBoundary from "./components/ErrorBoundraies/dashboardBoundary"; 
import SearchResult from "./components/searchResults"; 

// Bootstrap files
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'

// custom css file
import './css/custom.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Authentication roote */}
        <Route path="/login" element={<Authentication />} />
        
        {/* App structure rootes */}
        <Route element={<Layout />}>
          <Route index element={<DashboardBoundary><Dashboard /></DashboardBoundary>} />
          <Route path="/create/:taskId" element={<CreateTaskBoundary><CreateTask /></CreateTaskBoundary>} />
          <Route path="/create-list/:listName" element={<CreateList />} />
          <Route path="/view-list/:listName" element={<ViewList />} />
          <Route path="/tasks/:data" element={<ViewTasks />} />
          <Route path="/task/:taskId" element={<ViewTask />} />
          <Route path="/search/:search" element={<SearchResult />} />
        </Route>  
      </Routes>
    </BrowserRouter>
  );
}

export default App;
