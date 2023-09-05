// import React, { useState } from 'react';
// import Button from '@mui/material/Button';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemText from '@mui/material/ListItemText';
// import Avatar from '@mui/material/Avatar';
// import { Link, Navigate } from 'react-router-dom';
// import './common.css'

// function LoanDialog() {
//     const [open, setOpen] = useState(false);

//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };


//     const dialogData = [
//         {
//             logo: '/static/images/17-Loan.png',
//             text: 'Apply Loan',
//             description: 'Lorem ipsum dolor sit amet,',
//             link: '/applyloan'

//         },
//         {
//             logo: '/static/images/qoer.png',
//             text: 'Active Loan',
//             description: 'Lorem ipsum dolor sit amet,',
//             link: '/activeloan'
//         },
//         {
//             logo: '/static/images/loan (3) 1.png',
//             text: 'Requested Loan',
//             description: 'Lorem ipsum dolor sit amet,',
//             link: '/requestedloan'
//         }
//     ]

//     return (
//         <div>
//             <Button variant="contained" onClick={handleClickOpen}>
//                 Open Dialog
//             </Button>
//             <Dialog
//                 open={open}
//                 onClose={handleClose}
//                 sx={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                 }}
//             >
//                 <DialogTitle>Choose an Option</DialogTitle>
//                 {
//                     dialogData.map((item) => (
//                         <List sx={{ pt: 0 }}>
//                             <Link to={item.link}><ListItem button>
//                                 <ListItemAvatar>
//                                     <Avatar alt="Option 1" src={item.logo} />
//                                 </ListItemAvatar>
//                                 <ListItemText primary={item.text} secondary={item.description} sx={{
//                                     textDecoration: 'none',
//                                     '&:hover': {
//                                         textDecoration: 'none',
//                                     },
//                                 }} />
//                             </ListItem>
//                             </Link>
//                         </List>
//                     ))
//                 }
//             </Dialog>
//         </div>
//     );
// }
// export default LoanDialog
