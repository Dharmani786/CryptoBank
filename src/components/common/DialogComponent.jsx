import React from 'react';
// import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';

const DialogComponent = ({ dialogData, open, handleClose, dialogPosition }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      // className='diolg'
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...dialogPosition, // Apply custom dialog position
      }}
    >
      <DialogTitle>Choose an Option</DialogTitle>
      <List sx={{ pt: 0 }}>
        {dialogData.map((item) => (
          <Link key={item.link} to={item.link} style={{ textDecoration: 'none' }} onClick={handleClose}>
            <ListItem button>
              <ListItemAvatar>
                <Avatar alt="Option 1" src={item.logo} />
              </ListItemAvatar>
              <ListItemText
                primary={item.text}
                secondary={item.description}
                sx={{
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'none',
                  },
                }}
              />
            </ListItem>
          </Link>
        ))}
      </List>
    </Dialog>
  );
};

// DialogComponent.propTypes = {
//   dialogData: PropTypes.array.isRequired,
//   open: PropTypes.bool.isRequired,
//   handleClose: PropTypes.func.isRequired,
//   dialogPosition: PropTypes.object,
// };

export default DialogComponent;
