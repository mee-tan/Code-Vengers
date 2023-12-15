import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import { list } from "./api-product.js";
import { Link as RouterLink, Navigate } from "react-router-dom";
import Link from "@material-ui/core/Link";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import ArrowForward from "@material-ui/icons/ArrowForward";
import Dialog from "@material-ui/core/Dialog"; // Import Dialog
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 700,
    margin: "auto",
    marginTop: theme.spacing(5),
    color: "#444444",
    backgroundColor: "#D9D9D6",
  },
  textField: {},
  error: {},
  submit: {},
  title: {
    fontSize: 18,
    fontFamily: "Oswald, sans-serif",
  },
  root: {},
  editButton: {
    color: theme.palette.primary.main,
  },
  deleteButton: {
    color: theme.palette.error.main,
  },
}));

export default function Products() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        setProducts(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const classes = useStyles();

  const handleOpen = (productId) => {
    setSelectedProductId(productId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    console.log("Deleting product with ID:", selectedProductId);
    setOpen(false);
  };

  const handleEdit = () => {
    console.log("Editing product with ID:", selectedProductId);
    setOpen(false);
  };

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        Our Products
      </Typography>
      <List dense>
        {products.map((item, i) => {
          return (
            <Link component={RouterLink} to={"/product/" + item._id} key={i}>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar></Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.name} />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => handleOpen(item._id)}>
                    <ArrowForward />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Link>
          );
        })}
      </List>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete or Edit?</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="primary" variant="contained" onClick={handleDelete}>
            Delete
          </Button>
          <Button color="primary" variant="contained" onClick={handleEdit}>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
