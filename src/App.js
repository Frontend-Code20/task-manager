import Layout from "./components/layout";
import { Route, Routes, BrowserRouter } from "react-router";
import Content from "./components/content";
import CreateTask from "./components/createTask";
import CreateList from "./components/createList";
import Authentication from "./components/authentication";
import ViewTasks from "./components/viewTasks";
import { BarProvider } from "./components/globalState";
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/custom.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Authentication />} />
        <Route element={<BarProvider><Layout /></BarProvider>}>
          <Route index element={<Content />} />
          <Route path="create" element={<CreateTask />} />
          <Route path="create-list" element={<CreateList />} />
          <Route path="tasks" element={<ViewTasks />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
