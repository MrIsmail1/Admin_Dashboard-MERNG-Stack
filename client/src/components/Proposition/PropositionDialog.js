import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import {useState} from 'react';
import PropositionForm from './PropositionForm';
import { DeleteOutlined } from '@material-ui/icons';

export default function PropositionDialog() {
	const [open,setOpen] = useState(); 
    const handleClose = () => {
	setOpen(false);
  };
    const handleClickOpen = () => {
	setOpen(true);
  };
	
	return (
		<>
		<IconButton variant="contained" color="primary" onClick={handleClickOpen}>
        <DeleteOutlined></DeleteOutlined>
      </IconButton>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle onClose={handleClose}>
		<Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
          <IconButton
		  onClick={handleClose}
		  >
		  <CloseIcon/>
		  </IconButton>
		  </Box>
      <Typography color="primary">Delete user?</Typography>
        </DialogTitle>
        <DialogContent dividers>
        <Button autoFocus  color="primary">
          Cancel
        </Button>
        <Button  color="primary">
          Ok
        </Button>
        </DialogContent>
      </Dialog>
	</>
	)
}
