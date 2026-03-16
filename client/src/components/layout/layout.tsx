// src/components/layout/layout.tsx

import Header from './header'; // Ajuste les imports selon ta structure
import Footer from './footer';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}