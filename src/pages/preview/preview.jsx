import './preview.scss';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Grid from '@mui/system/Unstable_Grid/Grid';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails } from '../../services/thunkFunctions';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useHistory } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Loader from '../../components/loader/loader';
import { getSpecificProducts, getAllProducts } from '../../services/thunkFunctions';

function Preview() {
    const params = useParams()
    const dispatch = useDispatch()
    const [productDetails, setProductDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true)
    const [imgRotate, setImgRotate] = useState('')
    const [activeColor, setActiveColor] = useState('blue')
    const [limit, setLimit] = useState(0)
    const selectedCategory = useSelector(state => state.product.selectedCategory)
    const [productList, setProductList] = useState([])
    const history = useHistory()
    const sorting = useSelector(state => state.product.sorting)
    let tempImgRotate='';

    function changeImgRotate(value) {
        setImgRotate(value);
    }

    function changeActiveColor(value) {
        setActiveColor(value)
    }

    function nextProduct() {
        const index = productList.findIndex(obj => {
            return obj.id === +params.id
        })
        history.push(`/preview/${productList[index + 1].id}`)
    }

    function previousProduct() {
        const index = productList.findIndex(obj => {
            return obj.id === +params.id
        })
        history.push(`/preview/${productList[index - 1].id}`)
    }

    useEffect(() => {
        (async () => {
            let result = await dispatch(getProductDetails(params.id))
            setIsLoading(false)
            setProductDetails(result.payload)

            if (selectedCategory === 'All') {
                result = await dispatch(getAllProducts())
            }
            else {
                let newName = ''
                selectedCategory.split(' ').forEach(namePart => {
                    newName += namePart[0].toLowerCase() + namePart.slice(1) + ' '
                })
                result = await dispatch(getSpecificProducts(newName))
            }
            // setProductList(result.payload)
            sortList([...result.payload])
        })()
    }, [params])

    useEffect(() => {
        const imageRotation=setInterval(() => {
            // console.log('hi',tempImgRotate);
            if (tempImgRotate==='')
            {
                setImgRotate('rotate45')
                tempImgRotate='rotate45';
            }
            else if(tempImgRotate==='rotate45')
            {
                setImgRotate('rotate90')
                tempImgRotate='rotate90';
            }
            else
            {
                setImgRotate('')
                tempImgRotate='';
            }
        }, 5000);

        return ()=>clearInterval(imageRotation);
    }, [])

    function sortList(list) {
        if (sorting === 'Rating') {
            list.sort(function (a, b) { return a.rating.rate - b.rating.rate });
        }
        else if (sorting === 'Price') {
            list.sort(function (a, b) { return a.price - b.price });
        }
        else {
            list.sort(function (a, b) { return a.id - b.id });
        }
        setLimit(list[list.length - 1].id)
        setProductList(list)
    }

    return (
        <>
            <div className='previewPageOuter'>
                <div className='previewPage'>
                    <div className='previewHeadingOuter'>
                        <div className='previewHeading'>
                            <div className='subFlex'>
                                <div className='productDiv'>
                                    <Link to='/shop' className='link'>
                                        <div className='backButton'>
                                            <ArrowBackIcon />
                                            <p className='productText'>Back</p>
                                        </div>
                                    </Link>
                                </div>
                                <div className='shopTitleDiv'>
                                    <h1 className='shopTitle'>Product</h1>
                                </div>
                            </div>
                            <div className='previewHeaderResult'>
                                <div onClick={() => { previousProduct() }} className={`Link ${+params.id === productList[0]?.id ? 'opacity0-5 pointerNone' : ''}`}>
                                    <div className='nextArrow leftArrow'>
                                        <ArrowBackIosIcon />
                                        <p className='skipButton'>Previous</p>
                                    </div>
                                </div>
                                <div onClick={() => { nextProduct() }} className={`Link ${+params.id === limit ? 'opacity0-5 pointerNone' : ''}`}>
                                    <div className='nextArrow rightArrow'>
                                        <p className='skipButton nextSkipButton'>Next</p>
                                        <ArrowForwardIosIcon />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='divider'></div>
                    <div className='productDetailsOuter'>
                        {
                            isLoading ?
                                <div className='shopLoader'>
                                    <Loader />
                                </div>
                                :
                                <div className='productDetails'>
                                    <Grid container spacing={3} sx={{ p: 0 }} className='productDetailsGrid'>
                                        <Grid item xs={4} md={6} lg={4} className=''>
                                            <h1 className='productName'>{productDetails.title}</h1>
                                            <p className='productDis'>{productDetails.description}</p>
                                            <div className='imageList'>
                                                <div className='sampleImage' onClick={() => changeImgRotate('')}>
                                                    <img className='' src={productDetails.image} width={'50px'} height={'50px'} alt="" />
                                                </div>
                                                <div className='sampleImage' onClick={() => changeImgRotate('rotate45')}>
                                                    <img className='rotate45' src={productDetails.image} width={'50px'} height={'50px'} alt="" />
                                                </div>
                                                <div className='sampleImage' onClick={() => changeImgRotate('rotate90')}>
                                                    <img className='rotate90' src={productDetails.image} width={'50px'} height={'50px'} alt="" />
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} md={6} lg={4} className=''>
                                            <div className='imagePart'>
                                                <div className='productImageOuter'>
                                                    <div className='productImage'>
                                                        <div className='imageDiv'>
                                                            <img className={`insideImage ${imgRotate}`} src={productDetails.image} width={'50%'} height={'100%'} alt="" />
                                                        </div>
                                                        <p className='insidePrice'>₹{productDetails.price}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4} md={6} lg={4} className=''>
                                            <div>
                                                <div className='productRating rightSidePart'>
                                                    <p className='productReview'>Review: </p>
                                                    <Rating name="half-rating-read" defaultValue={productDetails.rating.rate} precision={0.5} readOnly size='small' />
                                                    <p className='productCount'>{productDetails.rating.rate} ({productDetails.rating.count})</p>
                                                </div>
                                                <div className='productColor rightSidePart'>
                                                    <p>Color:</p>
                                                    <div className={`colorOuter ${activeColor === 'blue' ? 'blueOuter' : ''}`}>
                                                        <div className='color blue' onClick={() => changeActiveColor('blue')}></div>
                                                    </div>
                                                    <div className={`colorOuter ${activeColor === 'red' ? 'redOuter' : ''}`}>
                                                        <div className='color red' onClick={() => changeActiveColor('red')}></div>
                                                    </div>
                                                    <div className={`colorOuter ${activeColor === 'yellow' ? 'yellowOuter' : ''}`}>
                                                        <div className='color yellow' onClick={() => changeActiveColor('yellow')}></div>
                                                    </div>
                                                    <div className={`colorOuter ${activeColor === 'brown' ? 'brownOuter' : ''}`}>
                                                        <div className='color brown' onClick={() => changeActiveColor('brown')}></div>
                                                    </div>
                                                </div>
                                                <div className='productSize rightSidePart'>
                                                    <p className='sizeTitle'>Size: </p>
                                                    <div>
                                                        <div className='sizeList1'>
                                                            <div className='size'>37</div>
                                                            <div className='size'>38</div>
                                                            <div className='size'>39</div>
                                                        </div>
                                                        <div className='sizeList1'>
                                                            <div className='size'>40</div>
                                                            <div className='size'>41</div>
                                                            <div className='size'>42</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='addCartButton rightSidePart'>
                                                    <p>Add to Cart</p>
                                                </div>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default Preview