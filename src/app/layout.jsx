import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import StoreProvider from './StoreProvider';
import AppShell from '@/components/appShell/appShell';
import './globals.scss';

export const metadata = {
    title: {
        default: 'Smart Shopping',
        template: '%s | Smart Shopping',
    },
    description: 'Shop clothing, jewellery and electronics with Smart Shopping.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <AppRouterCacheProvider>
                    <StoreProvider>
                        <AppShell>{children}</AppShell>
                    </StoreProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
