import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import './productCard.scss'
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Box } from '@mui/system';
import { addCart } from '../../services/slice';
import { useDispatch } from 'react-redux';

function ProductCard({ product }) {
    const [rating, setRating] = useState(product.rating.rate)
    const dispatch = useDispatch()

    return (
        <>
            <Card sx={{ borderRadius: '50px', p: '10px', height: '100%', position: 'relative', textAlign: 'center', boxFlexGroup: 'rgba(255, 255, 255, 0.1)' }}>
                <CardHeader
                    avatar={
                        <IconButton>
                            <Link to={`/preview/${product.id}`}>
                                <div className='headerIcon'>
                                    <ZoomOutMapIcon />
                                </div>
                            </Link>
                        </IconButton>
                    }
                    action={
                        <IconButton className='addCartIcon' onClick={() => { dispatch(addCart(product)) }}>
                            <div className='headerIcon'>
                                <LocalMallIcon />
                            </div>
                        </IconButton>
                    }
                />
                <div className='cardImageDiv'>
                    {/* <div className='cardBackground1'></div>
                    <div className='cardBackground2'></div> */}
                    <CardMedia
                        component="img"
                        height="150"
                        image={product.image}
                        alt="Paella dish"
                        sx={{ objectFit: 'contain', zIndex: 1, position: 'absolute' }}
                        className='shopcardImage'
                    />
                </div>
                <Box sx={{ height: '150px' }}></Box>
                <Rating name="half-rating-read" defaultValue={rating} precision={0.5} readOnly size='small' sx={{ paddingTop: '16px' }} />
                <CardContent sx={{ pt: 0 }}>
                    <Typography variant="h6" color="black" textAlign={'center'}>
                        <p className='productTitle'>{product.title}</p>
                        <p className='productPrice'>₹{product.price}</p>
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}
export default ProductCard