import LinksPage from "./pages/LinksPage.jsx";
import CreateLinkModal from "./components/modals/CreateLinkModal.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import EditLinkModal from "./components/modals/EditLinkModal.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import DeleteLinkModal from "./components/modals/DeleteLinkModal.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import StatisticsLinkModal from "./components/modals/StatisticsLinkModal.jsx";
import HomePage from "./pages/HomePage.jsx";
import {Toaster} from "react-hot-toast";
import ProfilePage from "./pages/ProfilePage.jsx";
import BasePage from "./pages/BasePage.jsx";

function App() {

  return (
    <>
        <Toaster position="bottom-center"/>

        <BrowserRouter>
            <Routes>
                <Route path="/:shortURL" element={<BasePage/>}/>

                <Route path="/" element={<HomePage/>}/>

                <Route path="/account/links" element={<LinksPage/>}/>
                <Route path="/account/links/create" element={<CreateLinkModal/>} />
                <Route path="/account/links/:_id/edit" element={<EditLinkModal/>}/>
                <Route path="/account/links/:_id/delete" element={<DeleteLinkModal/>}/>
                <Route path="/account/links/:_id/statistics" element={<StatisticsLinkModal/>}/>

                <Route path="/account/login" element={<LoginPage/>}/>
                <Route path="/account/register" element={<RegisterPage/>}/>

                <Route path="/account" element={<ProfilePage/>}/>
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
