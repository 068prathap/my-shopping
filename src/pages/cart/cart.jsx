import './cart.scss'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/loader';
import { sortCart, removeCart, changeCartCount, setModalOpen } from '../../services/slice';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { Box } from '@mui/material';
import BuyModal from '../buyModal/buyModal';
import { useHistory } from 'react-router-dom';
import CartCard from '../../components/cartCard/cartCard';

function Cart() {
    const cartList = useSelector(state => state.product.cartList)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    // const sorting = useSelector(state => state.product.sorting)
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

    // function sortList(sorting, list = [...cartList]) {
    //     if (sorting === 'Rating') {
    //         list.sort(function (a, b) { return a.rating.rate - b.rating.rate });
    //     }
    //     else if (sorting === 'Price') {
    //         list.sort(function (a, b) { return a.price - b.price });
    //     }
    //     else {
    //         list.sort(function (a, b) { return a.id - b.id });
    //     }
    //     dispatch(sortCart(list))
    //     dispatch(setSorting(sorting))
    // }

    useEffect(() => {
        return ()=>dispatch(setModalOpen(false))
    }, [])

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
                                            <CartCard product={product}/>
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