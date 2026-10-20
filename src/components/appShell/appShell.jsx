'use client';

import { useSelector } from 'react-redux';
import Header from '../header/header';

function AppShell({ children }) {
    const theme = useSelector(state => state.product.theme)

    return (
        <div className={`homePage ${theme === 'light' ? 'bgDark' : 'bgLight'}`}>
            <div className="homeBannerOuter">
                <div className="homeBanner">
                    <Header />
                    <main>{children}</main>
                </div>
            </div>
        </div>
    )
}
export default AppShell
