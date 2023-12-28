import './buyModal.scss'
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setModalOpen } from '../../services/slice';
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { IconButton } from '@mui/material';
import { padding } from '@mui/system';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: '25px'
};

export default function BuyModal() {
    const open = useSelector(state => state.product.modalOpen)
    // const [open, setOpen]=React.useState(true)
    const dispatch = useDispatch()
    //   const handleOpen = () => setOpen(true);
    //   const handleClose = () => setOpen(false);
    const sateCodeList = []
    const [buyStep, setBuyStep] = React.useState(2)
    const [dateList, setDateList] = React.useState([])

    function removeDate(index) {
        dateList.splice(index, 1)
        console.log(dateList);
        setDateList([...dateList])
    }

    function addDate(date) {
        if(dateList.length===3)
        {
            dateList.shift();
        }
        dateList.push(date)
        setDateList([...dateList])
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                // onClose={() => { dispatch(setModalOpen(false)) }}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Box sx={{ textAlign: 'right' }}>
                            <Button sx={{ fontWeight: 'bold' }}>Cancel</Button>
                        </Box>
                        {
                            buyStep === 1 &&
                            <>
                                <h3>Delivery Information</h3>
                                <Box sx={{ display: 'flex' }}>
                                    <Box sx={{ width: '50%', p: '15px 10px' }}>
                                        <p>Name</p>
                                        <TextField id="outlined-basic" variant="outlined" placeholder='Enter your name' size='small' sx={{ width: '100%' }} />
                                    </Box>
                                    <Box sx={{ width: '50%', p: '15px 10px' }}>
                                        <p>Mobile Number</p>
                                        <TextField id="outlined-basic" variant="outlined" placeholder='Enter your mobile number' size='small' sx={{ width: '100%' }} />
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex' }}>
                                    <Box sx={{ width: '50%', p: '15px 10px' }}>
                                        <p>Email</p>
                                        <TextField id="outlined-basic" variant="outlined" placeholder='Enter your email' size='small' sx={{ width: '100%' }} />
                                    </Box>
                                    <Box sx={{ width: '50%', p: '15px 10px' }}>
                                        <p>Country</p>
                                        <TextField id="outlined-basic" variant="outlined" placeholder='Enter your country' size='small' sx={{ width: '100%' }} />
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex' }}>
                                    <Box sx={{ width: '50%', p: '15px 10px' }}>
                                        <p>State</p>
                                        <TextField id="outlined-basic" variant="outlined" placeholder='Enter your state' size='small' sx={{ width: '100%' }} />
                                    </Box>
                                    <Box sx={{ display: 'flex', width: '50%' }}>
                                        <Box sx={{ width: '50%', p: '15px 10px' }}>
                                            <p>City</p>
                                            <TextField id="outlined-basic" variant="outlined" placeholder='Enter your city' size='small' sx={{ width: '100%' }} />
                                            {/* <FormControl sx={{ m: 1, minWidth: 120 }}>
                                            <Select
                                                value={age}
                                                onChange={handleChange}
                                                displayEmpty
                                                inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                            <FormHelperText>Without label</FormHelperText>
                                        </FormControl> */}
                                        </Box>
                                        <Box sx={{ width: '50%', p: '15px 10px' }}>
                                            <p>Zip</p>
                                            <TextField id="outlined-basic" variant="outlined" placeholder='Enter zip code' size='small' sx={{ width: '100%' }} />
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex' }}>
                                    <Box sx={{ width: '100%', p: '15px 10px' }}>
                                        <p>Address</p>
                                        <TextField id="outlined-basic" variant="outlined" placeholder='Enter your address' size='small' sx={{ width: '100%' }} />
                                    </Box>
                                </Box>
                            </>
                        }
                        {
                            buyStep === 2 &&
                            <>
                                <h3>Schedule Delivery</h3>
                                <Box sx={{ display: 'flex' }}>
                                    <Box sx={{ width: '100%', p: '15px 10px' }}>
                                        <p>Dates</p>
                                        <Box sx={{ display: 'flex' }}>
                                            {/* <TextField id="outlined-basic" variant="outlined" size='small' sx={{ width: '100%' }} InputProps={{ readOnly: true}} disabled value={dateList} className='dateListInput' /> */}
                                            <Box sx={{ height: '40px', width: '100%', border: '1px solid rgba(0, 0, 0, 0.23)', borderRight: '0px', borderTopLeftRadius: '4px', borderBottomLeftRadius: '4px', display: 'flex', alignItems: 'center', overflowX:'scroll', whiteSpace:'nowrap' }} className='dateList'>
                                                {dateList.map((date, index) => {
                                                    return (
                                                        <Box sx={{ display: 'flex', alignItems: 'center', px: '5px', bgcolor: 'lightgrey', width: 'fit-content', borderRadius: '100px', height: '30px', mx: '5px' }} key={index}>
                                                            <p style={{ paddingLeft: '5px' }}>{date}</p>
                                                            <IconButton onClick={() => { removeDate(index) }}>
                                                                <CloseRoundedIcon />
                                                            </IconButton>
                                                        </Box>
                                                    )
                                                })}
                                            </Box>
                                            <TextField id="outlined-basic" type='date' variant="outlined" size='small' sx={{ width: '48px', borderRight: '0px' }} className='dateselectInput' onChange={(e) => { addDate(e.target.value) }} />
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{ display: 'flex' }}>
                                    <Box sx={{ width: '100%', p: '15px 10px' }}>
                                        <p>Note</p>
                                        <TextField id="outlined-basic" variant="outlined" placeholder='Enter your note' size='small' sx={{ width: '100%' }} />
                                    </Box>
                                </Box>
                            </>
                        }
                        <Box sx={{ justifyContent: 'space-between', px: '10px', display: 'flex' }}>
                            <Button sx={{ fontWeight: 'bold' }} onClick={() => { setBuyStep(state => state - 1) }}><ArrowBackIcon /> Previous</Button>
                            <Button sx={{ fontWeight: 'bold' }} onClick={() => { setBuyStep(state => state + 1) }}>Next <ArrowForwardIcon /></Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}