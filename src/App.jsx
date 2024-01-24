import { useState, useEffect } from "react";
import "./App.css";
import { AgGridReact } from "ag-grid-react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


import AddBook from "./AddBook";

function App() {
  const [books, setBooks] = useState([]);

  const columnDefs = [
    { field: "title", sortable: true, filter: true },
    { field: "author", sortable: true, filter: true },
    { field: "year", sortable: true, filter: true },
    { field: "isbn", sortable: true, filter: true },
    { field: "price", sortable: true, filter: true },
    { 
      headerName: '',
      field: 'id',
      width: 90,
      cellRenderer: params => 
      <IconButton onClick={() => deleteBook(params.value)} size="small" color="error">
        <DeleteIcon />
      </IconButton> 
    }
  ];

  useEffect(() => {
    fetchBooks();
  }, []);

  // fetch all
  const fetchBooks = async () => {
    const response = await fetch(
      "https://bookstore-d38de-default-rtdb.europe-west1.firebasedatabase.app/books/.json"
    );
    const data = await response.json();
    if (data) {
      addKeys(data);
    }
  };


  const addBook = async (newBook) => {
    await fetch(
      "https://bookstore-d38de-default-rtdb.europe-west1.firebasedatabase.app/books/.json",
      {
        method: "POST",
        body: JSON.stringify(newBook),
      }
    );
    fetchBooks();
  };


  const addKeys = (data) => {
    const keys = Object.keys(data); // get the keys
    const values = Object.values(data);
    const valueKeys = values.map((value, index) => {
      Object.defineProperty(value, 'id', { value: keys[index] });
      return value;
    });
    setBooks(valueKeys);
  }

  const deleteBook = async (id) => {
    await fetch(
      `https://bookstore-d38de-default-rtdb.europe-west1.firebasedatabase.app/books/${id}/.json`,
      {
        method: "DELETE",
      }
    );
    fetchBooks();
  }




  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">Bookstore</Typography>
        </Toolbar>
      </AppBar>

      <AddBook addBook={addBook} />
      
      <div className="ag-theme-material" style={{ height: 400, width: 1100 }}>
        <AgGridReact rowData={books} columnDefs={columnDefs} />
      </div>
    </>
  );
}

export default App;
