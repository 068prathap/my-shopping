'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import ThemeButton from '../themeButton/themeButton';
import './header.scss';

const navTabs = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About' },
];

function Header() {
    const pathname = usePathname()
    const theme = useSelector(state => state.product.theme)
    const cartList = useSelector(state => state.product.cartList)
    const [profileAnchor, setProfileAnchor] = useState(null)

    const isActive = (href) => href === '/' ? pathname === '/' : pathname.startsWith(href)
    const textColor = theme === 'light' ? 'colorBlack' : 'colorWhite'

    return (
        <header className='homeHeader'>
            <Link href='/' className='homeHeaderLogo Link' aria-label='Smart Shopping home'>
                <ShoppingCartRoundedIcon className='shoppingIcon' />
                <div>
                    <p className='shoppingIconTitle1'>Smart</p>
                    <p className='shoppingIconTitle2'>Shopping</p>
                </div>
            </Link>

            <nav className='homeHeaderTabs' aria-label='Main'>
                {navTabs.map(tab => (
                    <Link
                        key={tab.href}
                        href={tab.href}
                        className={`headerHomeTab ${isActive(tab.href) ? 'activeTab' : ''} ${textColor}`}
                        aria-current={isActive(tab.href) ? 'page' : undefined}
                    >
                        {tab.label}
                    </Link>
                ))}
            </nav>

            <div className='headerIcons'>
                <ThemeButton />
                <Link href='/cart' className={`Link headerSideIcon ${isActive('/cart') ? 'activeTab' : ''}`} aria-label={`Cart, ${cartList.length} items`}>
                    <Badge badgeContent={cartList.length} color="primary">
                        <ShoppingCartIcon />
                    </Badge>
                </Link>
                <Link href='/wishlist' className={`Link headerSideIcon ${isActive('/wishlist') ? 'activeTab' : ''}`} aria-label='Wishlist'>
                    <Box sx={{ display: 'flex' }}>
                        <FavoriteRoundedIcon />
                    </Box>
                </Link>
                <button
                    type='button'
                    className='headerSideIcon profileTab iconButton'
                    aria-label='Account'
                    aria-haspopup='true'
                    onClick={(e) => setProfileAnchor(e.currentTarget)}
                >
                    <AccountCircleRoundedIcon />
                </button>
                <Popover
                    open={Boolean(profileAnchor)}
                    anchorEl={profileAnchor}
                    onClose={() => setProfileAnchor(null)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                >
                    <Typography sx={{ p: 2 }}>Hi, Prathap</Typography>
                </Popover>
            </div>
        </header>
    )
}
export default Header
