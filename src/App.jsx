import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './components/Home'
import FindSchool from './components/FindSchool'
import Mission from './components/Mission'
import LogIn from './components/LogIn'
import Contact from './components/Contact'
import InterestForm from './components/InterestForm'
import Match from './components/Match'

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/find-school" element={<FindSchool />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/interest-form" element={<InterestForm />} />
        <Route path="/match" element={<Match />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;