
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Trends from './pages/Trends';
import Summarize from './pages/Summarize';
import Register from './pages/Register';
import LoginPage from './pages/LoginPage';
import FlashCard from './pages/FlashCard';
import PeerUpdate from './pages/PeerUpdate';
import PageNotFound from './pages/PageNotFound';
import Account from './pages/Account';
import { MenuProvider } from './components/Context/MenuProvider';
import PressPivot from './pages/PressPivot';
import YouTubePage from './pages/YouTubePage';
import SeoGuruPage from './pages/SeoGuruPage';
import EditorMosaicPage from './pages/EditorMosaicPage';
import OpinionPage from './pages/OpinionPage';
import AccountReset from './components/acccountFeatures/AccountReset';
import AccountForm from './components/acccountFeatures/AccountForm';
import CustomGptPage from './pages/CustomGptPage';
import FederalBotPage from './pages/FederalBotPage';
import FederalAssist from './components/Custom_GPT/CustomGptSubMenu/FederalAssist'
import FederalEditorial from './components/Custom_GPT/CustomGptSubMenu/FederalEditorial'

function App() {
  return (
    <MenuProvider>
     <Router>
      <Routes>
        <Route path="/register" element={<Register/>} />
        <Route path="/" element={<LoginPage/>} />
        <Route path="/trends" element={<Trends/>} />
        <Route path="/summary" element={<Summarize  />} />
        <Route path="/flashcard" element={<FlashCard  />} />
        <Route path="/peer" element={<PeerUpdate />} />
        <Route path="/press-pivot" element={<PressPivot />} />
        <Route path="/youtube-script" element={<YouTubePage />} />
        <Route path="/seo-guru" element={<SeoGuruPage />} />
        <Route path="/editor-mosaic" element={<EditorMosaicPage />} />
        <Route path="/option-junction" element={<OpinionPage />} />
        {/* <Route path="/custom-gpt" element={<CustomGptPage />} /> */}
        <Route path="/federal-bot" element={<FederalBotPage />} />
        <Route path="/account" element={<Account />} >
             <Route index element={<AccountForm/>} /> 
             <Route path='reset' element={<AccountReset/>} /> 
        </Route>
        <Route path="/custom-gpt" element={<CustomGptPage />} >
             <Route  path="federal-assist"  element={<FederalAssist/>} /> 
             <Route path='federal-editorial' element={<FederalEditorial/>} /> 
        </Route>
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </Router>
    </MenuProvider>
  )
}

export default App
