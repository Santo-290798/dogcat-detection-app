import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyNavbar from './components/Navbar';
import Main from './components/Main';
import DescriptionPage from './components/DescriptionPage';
import Footer from './components/Footer';

export default function App() {
    return (
        <Router>
            <MyNavbar />
            <Routes>
                <Route path="/" element={<Main title="Dog&Cat Detection" description="Detect Dogs and Cats on the image you have selected using AI" />} />
                <Route path="/how-it-works" element={<DescriptionPage />} />
            </Routes>
            <Footer />
        </Router>
    );
};
