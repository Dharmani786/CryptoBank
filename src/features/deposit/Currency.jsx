import { Box, Card, Typography } from '@mui/material'
import React from 'react'

const Currency = (props, cur) => {

    return (
        <div className='deposit-currency_cont'>
            <Card variant="outlined" sx={{
                display: 'flex',
                alignItems: 'center',
                height: '61px',
                width: '329px',
                padding: '0px 10px',
                justifyContent: 'space-between'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <figure style={{
                        height: '33px',
                        width: '33px',
                        marginRight: '15px'
                    }}> <img src={props.logo} alt={props.suffix} /> </figure>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'baseline'
                    }}>
                        <Typography variant='h5' sx={{
                            fontSize: '20px',
                            fontWeight: '700px'
                        }}>{props.abr}</Typography>
                        <Typography variant='caption' sx={{
                            margin: '0px 0px 0px 0px ', fontWeight: '400px'
                        }}>{props.suffix}</Typography>
                    </Box>
                </div>
                <input type='radio' className='deposit-radio' value={props.value} onChange={
                    (e) => {
                        e.preventDefault()
                    }

                } />
            </Card>
        </div>
    )
}

export default Currency
