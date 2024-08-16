import { Routes, Route } from 'react-router-dom';

import RootLayout from './_root/RootLayout';
import { Home, HowItWorks, Missing, DetectObject } from './_root/pages';

import './globals.css';

const App = () => {
    return (
        <main>
            <Routes>
                {/* root routes */}
                <Route element={<RootLayout />}>
                    <Route index element={<Home title="Dog&Cat Detection" description="Detect Dogs and Cats in the image using AI" />} />
                    <Route path='/how-it-works' element={<HowItWorks />} />
                    <Route path='/detect-objects' element={<DetectObject />} />

                    {/* catch other missing routes */}
                    <Route path='/*' element={<Missing />} />
                </Route>
            </Routes>
        </main>
    );
};

export default App;