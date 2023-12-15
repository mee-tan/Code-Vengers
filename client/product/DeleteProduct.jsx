import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import auth from "./../lib/auth-helper";
import { remove } from "./api-product.js";
import { read } from "./api-product.js";
import { Navigate } from "react-router-dom";

export default function DeleteProduct(props) {
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [product, setProduct] = useState({});

  const jwt = auth.isAuthenticated();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await read({ productId: props.productId });
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchData();
  }, [props.productId]);

  const clickButton = () => {
    setOpen(true);
  };
  const deleteProduct = () => {
    remove(
      {
        productId: props.productId,
      },
      { t: jwt.token }
    ).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        auth.clearJWT(() => console.log("deleted"));
        setRedirect(true);
      }
    });
  };
  const handleRequestClose = () => {
    setOpen(false);
  };

  if (redirect) {
    return <Navigate to="/products" />;
  }
  return (
    <span>
      <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
        <DeleteIcon />
      </IconButton>
      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>
          {"Delete " + (product && product.name ? product.name : "product")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your product{" "}
            {product && product.name ? product.name : "product"}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={deleteProduct}
            color="secondary"
            autoFocus="autoFocus"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}
DeleteProduct.propTypes = {
  productId: PropTypes.object.isRequired,
};
