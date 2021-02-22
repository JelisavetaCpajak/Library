import React, { Component } from "react";
import { connect } from "react-redux";
import photo from "../../photos/biblioteka.jpeg";
import {
  Paper,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import classes from "./Book.css";

class Book extends Component {
  state = {
    title: "",
    type: "",
    k: "",
    author_name: "",
    first_publish_year: "",
  };

  componentDidMount() {
    let book = this.props.currentBook;
    this.setState({
      title: book.title,
      type: book.type,
      k: book.key,
      author_name: book.author_name,
      first_publish_year: book.first_publish_year,
    });
  }

  render() {
    return (
      <div className={classes.Wrapper}>
        <img
          style={{ backgroundColor: "green" }}
          src={photo}
          className={classes.photo}
        />
        <h1 style={{ backgroundColor: "#F8F8FF" }}>Montecha Library</h1>
        <Paper>
          <Card className={classes.Root}>
            <CardContent>
              <Typography variant="h5" component="h2">
                Title: {this.state.title}
              </Typography>
              <Typography variant="h5" component="h4">
                Author: {this.state.author_name}
              </Typography>
              <Typography
                className={classes.Title}
                color="textSecondary"
                gutterBottom
              >
                First time published: {this.state.first_publish_year}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                Type of book: {this.state.type}
              </Typography>
            </CardContent>
          </Card>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentBook: state.currentBook,
  };
};

export default connect(mapStateToProps)(Book);
