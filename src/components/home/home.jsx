'use client';

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import Box from '@mui/material/Box';
import HomeShoppingImage from '@/assets/homeshoppingImage.png'
import MensClothing from '@/assets/mensClothing.png'
import Jewellery from '@/assets/jewellery.png'
import Electronics from '@/assets/electronics.png'
import AppleIcon from '@/assets/appleIcon.png'
import Walmart from '@/assets/walmartIcon.png'
import AdidasIcon from '@/assets/adidasIcon.png'
import NikeIcon from '@/assets/nikeIcon.png'
import reebok from '@/assets/reebokIcon.png'
import XboxIcon from '@/assets/xboxIcon.png'
import PumaIcon from '@/assets/pumaIcon.png'
import './home.scss'

const bannerSlides = [
    { image: HomeShoppingImage, alt: 'Shopping bags and products' },
    { image: MensClothing, alt: "Men's clothing" },
    { image: Jewellery, alt: 'Jewellery' },
    { image: Electronics, alt: 'Electronics' },
];

const partnerLogos = [
    { image: AdidasIcon, alt: 'Adidas', width: 60 },
    { image: XboxIcon, alt: 'Xbox', width: 45 },
    { image: NikeIcon, alt: 'Nike', width: 80 },
    { image: PumaIcon, alt: 'Puma', width: 50 },
    { image: reebok, alt: 'Reebok', width: 90 },
    { image: AppleIcon, alt: 'Apple', width: 60 },
    { image: Walmart, alt: 'Walmart', width: 80 },
];

function Home() {
    const [activeStep, setActiveStep] = useState(0);
    const pageTheme = useSelector(state => state.product.theme)

    useEffect(() => {
        const imageRotation = setInterval(() => {
            setActiveStep(step => (step + 1) % bannerSlides.length);
        }, 3000);

        return () => clearInterval(imageRotation)
    }, [])

    const slide = bannerSlides[activeStep];

    return (
        <>
            <div>
                <div className='homeContent'>
                    <div className='homeTextContent'>
                        <div>
                            <h1 className='bannerContent'>Greatest journey with your shopping assistant</h1>
                        </div>
                        <div className='adminLogin'>
                            <label htmlFor='adminEmail' className='adminTitle'>Admin Login</label>
                            <div className='adminLoginForm'>
                                <input id='adminEmail' type="email" className='adminInput' />
                                <button className='adminLoginButton'>Submit</button>
                            </div>
                        </div>
                    </div>
                    <div className='homeBannerImageDiv'>
                        <Box sx={{ maxWidth: 400, flexGrow: 1, position: 'relative' }}>
                            <Image
                                src={slide.image}
                                alt={slide.alt}
                                className='homeBannerImage'
                                sizes="400px"
                                priority={activeStep === 0}
                            />
                            <div className='imageBg'></div>
                        </Box>
                    </div>
                </div>
            </div>
            <div className='homeBottomOuter'>
                <div className={`homeBottom  ${pageTheme === 'light' ? 'bgColorDark' : 'bgColorLight'}`}>
                    <div>
                        <p className='partnerCount'>1800+</p>
                        <p className='partnerText'>Trusted partners</p>
                    </div>
                    <div className='horizondalLine'></div>
                    <div className={`bottomIcons`}>
                        {partnerLogos.map(logo => (
                            <Image key={logo.alt} src={logo.image} alt={logo.alt} width={logo.width} style={{ height: 'auto' }} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home
