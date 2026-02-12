import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './components/Home'
import FindSchool from './components/FindSchool'
import Mission from './components/Mission'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import InterestForm from './components/InterestForm'

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/find-school" element={<FindSchool />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/interest-form" element={<InterestForm />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;