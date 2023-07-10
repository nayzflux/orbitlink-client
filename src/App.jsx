import LinksPage from "./pages/LinksPage.jsx";
import Header from "./components/headers/Header.jsx";
import CreateLinkModal from "./components/modals/CreateLinkModal.jsx";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import EditLinkModal from "./components/modals/EditLinkModal.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import DeleteLinkModal from "./components/modals/DeleteLinkModal.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import StatisticsLinkModal from "./components/modals/StatisticsLinkModal.jsx";

function App() {

  return (
    <>
        <Header/>

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<p>Root Page</p>}/>

                <Route path="/account/links" element={<LinksPage/>}/>
                <Route path="/account/links/create" element={<CreateLinkModal/>} />
                <Route path="/account/links/:_id/edit" element={<EditLinkModal/>}/>
                <Route path="/account/links/:_id/delete" element={<DeleteLinkModal/>}/>
                <Route path="/account/links/:_id/statistics" element={<StatisticsLinkModal/>}/>

                <Route path="/account/login" element={<LoginPage/>}/>
                <Route path="/account/register" element={<RegisterPage/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
