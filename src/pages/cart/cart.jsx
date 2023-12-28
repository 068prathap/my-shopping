import './cart.scss'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/loader';
import { setSorting, sortCart, removeCart, changeCartCount, setModalOpen } from '../../services/slice';
import Rating from '@mui/material/Rating';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { IconButton } from '@mui/material';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { Box } from '@mui/material';
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import BuyModal from '../buyModal/buyModal';
import { useHistory } from 'react-router-dom';

function Cart() {
    const cartList = useSelector(state => state.product.cartList)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const sorting = useSelector(state => state.product.sorting)
    // const selectedCategory = useSelector(state => state.product.selectedCategory)
    const count = cartList.length
    const [totalAmount, setTotalAmount] = useState(0)
    const theme = useSelector(state => state.product.theme)
    // const [isOpenModal, setIsOpenModal]=useState(false)
    const history = useHistory()

    useEffect(() => {
        const totalAmount = cartList.reduce((acc, curr) => {
            return acc + curr.totalPrice
        }, 0)
        setTotalAmount(totalAmount.toFixed(2))
    }, [cartList])

    function sortList(sorting, list = [...cartList]) {
        if (sorting === 'Rating') {
            list.sort(function (a, b) { return a.rating.rate - b.rating.rate });
        }
        else if (sorting === 'Price') {
            list.sort(function (a, b) { return a.price - b.price });
        }
        else {
            list.sort(function (a, b) { return a.id - b.id });
        }
        dispatch(sortCart(list))
        dispatch(setSorting(sorting))
    }

    return (
        <>
            <div className='shopPageOuter'>
                <div className='shopPage'>
                    <div className={`shopHeadingOuter ${theme === 'light' ? 'bgColorDark' : 'bgColorLight'}`}>
                        <div className='shopHeading'>
                            <div className='subFlex'>
                                <div className='productDiv'>
                                    <p className='productText'>Total Amount ₹{totalAmount}</p>
                                </div>
                                <div className='shopTitleDiv'>
                                    <h1 className='shopTitle'>Cart</h1>
                                </div>
                            </div>
                            <Box className='shopHeaderResult' sx={{ display: 'flex', justifyContent: 'right' }}>
                                {count ?
                                    <>
                                        <Box className='backButton' onClick={()=>{dispatch(setModalOpen(true))}}>
                                            <p className='productText cartBuyText'>Buy now</p>
                                            <LocalMallIcon />
                                        </Box>
                                    </>
                                    :
                                    <p className='shopResult'>Your cart is empty</p>
                                }
                            </Box>
                        </div>
                    </div>
                    <div className='divider'></div>
                    <div className='productsList'>
                        {
                            isLoading ?
                                <div className='shopLoader'>
                                    <Loader />
                                </div>
                                :
                                <Grid container spacing={{ lg: 0, xl: 0 }} sx={{ overflowY: 'scroll', p: 0, mt: { xs: '0px' } }} className='productListGrid'>
                                    {cartList.map(product => {
                                        return (
                                            <Grid item xs={4} md={12} lg={12} className='productGrid' key={product.id} sx={{ display: 'flex', justifyContent: 'center' }}>
                                                {/* <ProductCard product={product} pageType={'cart'} /> */}

                                                <div className='cartProduct'>
                                                    <div className='cartImageOuter'>
                                                        <img className='cartImage' src={product.image} alt="" />
                                                    </div>
                                                    <div className='cartProductDetails'>
                                                        <div className='cartSelectedDetails'>
                                                            <h2 className='productName cartProductName'>{product.title}</h2>
                                                            <div className='productRating CartProductRating'>
                                                                <p className='productReview'>Review: </p>
                                                                <Rating name="half-rating-read" defaultValue={product.rating.rate} precision={0.5} readOnly size='small' />
                                                                <p className='productCount'>{product.rating.rate} ({product.rating.count})</p>
                                                            </div>
                                                            <p className='cartProductColor'>Color: {product.color}</p>
                                                            <p className='cartProductSize'>Size: {product.size}</p>
                                                        </div>
                                                        <div className='cartQtyDetails'>
                                                            <div>
                                                                <div className='quantityHandle'>
                                                                    <IconButton color='inherit' onClick={() => { product.count > 1 && dispatch(changeCartCount({ id: product.id, value: product.count - 1 })) }}>
                                                                        <RemoveCircleIcon />
                                                                    </IconButton>
                                                                    <p className='cartQtyCount'>
                                                                        Quantity:
                                                                        <input className='qtyInput' type="text" value={product.count} onChange={(e) => { dispatch(changeCartCount({ id: product.id, value: +e.target.value })) }} />
                                                                        {/* <Box sx={{display:'flex'}}>
                                                                            <CheckCircleOutlineSharpIcon />
                                                                        </Box> */}
                                                                    </p>
                                                                    <IconButton color='inherit' onClick={() => { dispatch(changeCartCount({ id: product.id, value: product.count + 1 })) }}>
                                                                        <AddCircleIcon />
                                                                    </IconButton>
                                                                </div>
                                                                <div>
                                                                    <p className='cartTotalPrice'>Total Price: {product.totalPrice.toFixed(2)} </p>
                                                                </div>
                                                            </div>
                                                            <div className='addCartButton cartRemoveButton' onClick={() => { dispatch(removeCart(product.id)) }}>
                                                                <p>Remove Item</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                        }
                    </div>
                </div>
            </div>
            <BuyModal/>
        </>
    )
}
export default Cart