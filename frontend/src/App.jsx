import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyNavbar from './components/Navbar';
import HomePage from './components/HomePage';
import DescriptionPage from './components/DescriptionPage';
import DetectObject from './components/DetectObject';
import Footer from './components/Footer';

export default function App() {
    return (
        <Router>
            <MyNavbar />
            <Routes>
                <Route path="/" element={<HomePage title="Dog&Cat Detection" description="Detect Dogs and Cats in the image using AI" />} />
                <Route path="/how-it-works" element={<DescriptionPage />} />
                <Route path="/detect-objects" element={<DetectObject />} />
            </Routes>
            <Footer />
        </Router>
    );
};
