import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import { useState } from 'react';

const AddBook = ({ addBook }) => {

  const [open, setOpen] = useState(false); // control the dialog
  const [book, setBook] = useState({ title: '', author: '', year: '', isbn: '', price: '' }); // control the form

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const inputChanged = (event) => {
    setBook({ ...book, [event.target.name]: event.target.value });
  }

  const handleSave = () => {
    addBook(book);
    handleClose();
  }

  return(
    <>
    <Button variant="outlined" onClick={handleOpen}>
        Add book
      </Button>
      <Dialog open={open}> 
        <DialogTitle>New Book</DialogTitle>

        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            value={book.title}
            onChange={inputChanged}
            label="Title"
            fullWidth
          />
          <TextField
            margin="dense"
            name="author"
            value={book.author}
            onChange={inputChanged}
            label="Author"
            fullWidth
          />
          <TextField
            margin="dense"
            name="year"
            value={book.year}
            onChange={inputChanged}
            label="Year"
            fullWidth
          />
          <TextField
            margin="dense"
            name="isbn"
            value={book.isbn}
            onChange={inputChanged}
            label="ISBN"
            fullWidth
          />
          <TextField
            margin="dense"
            name="price"
            value={book.price}
            onChange={inputChanged}
            label="Price"
            fullWidth
          />
        </DialogContent>

        <DialogActions>
        <Button color="primary" onClick={handleClose}>Cancel</Button>
          <Button color="primary" onClick={handleSave}>Save</Button>

        </DialogActions>
      </Dialog> 
    </>
  )
}

AddBook.propTypes = {
  addBook: PropTypes.func.isRequired
}

export default AddBook;