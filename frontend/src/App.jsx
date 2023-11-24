import MyNavbar from './components/Navbar';
import Main from './components/Main';
import Footer from './components/Footer';

export default function App() {
    return (
        <>
            <MyNavbar />
            <Main
                title="Dog&Cat Detection"
                description="Detect Dogs and Cats on the image you have selected using AI"
            />
            <Footer />
        </>
    );
}