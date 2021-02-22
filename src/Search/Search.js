import React, { Component } from "react";
import axios from "axios";
import {
  TextField,
  Paper,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  TablePagination,
} from "@material-ui/core";
import ReactPaginate from "react-paginate";
import classes from "./Search.css";
import Book from "./Book/Book";
import { Link } from "react-router-dom";
import * as actionTypes from "../store/actions";
import { connect } from "react-redux";
import Pagination from "../Pagination/Pagination";
import photo from "../photos/biblioteka.jpeg";

class Search extends Component {
  state = {
    searchingTerm: "",
    noResult: false,
    books: [],
    start: true,
    message: "",
    booksPerPage: 5,
    currentPage: 1,
    currentBooks: [],
  };

  componentDidMount() {
    console.log("componentDidMount");
    if (this.props.books.length != 0) {
      //let booksFromRed = this.props.books;
      this.setState({ start: false });
    }
    console.log("books from redux: ", this.props.books);
  }
  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  setSearchingTerm = (value) => {
    this.setState({ searchingTerm: value });
    //console.log("term: ", this.state.searchingTerm);
  };

  searchForBook = () => {
    let term = this.state.searchingTerm;
    this.setState({ start: false, message: "wait..." });
    //str.replace("Microsoft", "W3Schools");
    term.replace(" ", "+");
    let url = "http://openlibrary.org/search.json?q=" + term + "/";
    axios
      .get(url)
      .then((response) => {
        console.log("search->response: ", response);
        if (response.data.docs.length == 0) {
          console.log("array empty");
          this.setState({ noResult: true, message: "NO RESULTS" });
        }
        console.log("response: ", response.data.docs);
        let array = response.data.docs;
        let pgs = array.length / 10;
        // if (array.length % 10 > 0) {
        //   pgs++;
        // }
        //list.slice(0, size)
        this.setState({ noResult: false, pageNums: pgs });
        //get books for current 'page'

        this.props.setBooks(array);
      })
      .catch((error) => {
        console.log("search->error: ", error);
        this.setState({ noResult: true });
      });
  };

  //change page
  paginate = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  render() {
    //get books for current 'page'
    let indexOfLastBook = this.state.currentPage * this.state.booksPerPage;
    let indexOfFirtsBook = indexOfLastBook - this.state.booksPerPage;
    let currentBooks = null;
    if (this.props.books.length != 0) {
      currentBooks = this.props.books.slice(indexOfFirtsBook, indexOfLastBook);
    }
    return (
      <div>
        <img
          style={{ backgroundColor: "green" }}
          src={photo}
          className={classes.photo}
        />
        <h1 style={{ backgroundColor: "#F8F8FF" }}>Montecha Library</h1>
        <br />
        <TextField
          id="outlined-basic"
          label="Insert title"
          variant="outlined"
          onChange={(event) => this.setSearchingTerm(event.target.value)}
          value={this.state.searchingTerm}
        >
          Book
        </TextField>
        <br />
        <button onClick={this.searchForBook}>Search</button>

        {this.state.start ? (
          <p>Wellcome! Please enter book title you want to find.</p>
        ) : this.props.books.length != 0 ? (
          <Paper className={classes.Root}>
            {currentBooks.map((book) => {
              //console.log("book: ", book.title);
              // <p>res:{book.title}</p>;
              return (
                <Link
                  key={book.key}
                  style={{ color: "#FFF", width: "500px" }}
                  to="/book"
                  onClick={() => this.props.setCurrentBook(book)}
                >
                  <br />

                  <Card key={book.key} className={classes.Root}>
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        {book.title}
                      </Typography>

                      <Typography variant="body2" component="p">
                        <br />
                        Author: {book.author_name}
                      </Typography>
                    </CardContent>

                    <Button className={classes.Button} size="small">
                      Learn More
                    </Button>
                    <br />
                  </Card>
                  <br />
                  <br />
                </Link>
              );

              //content.push(b);
            })}

            <Pagination
              booksPerPage={this.state.booksPerPage}
              totalBooks={this.props.books.length}
              paginate={this.paginate}
            />
          </Paper>
        ) : (
          <p>{this.state.message}</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.books,
    currentBook: state.currentBook,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBooks: (books) =>
      dispatch({ type: actionTypes.SET_BOOKS, books: books }),
    setCurrentBook: (book) =>
      dispatch({ type: actionTypes.SET_CURRENT_BOOK, currentBook: book }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
