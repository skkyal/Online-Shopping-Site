import React, { useState, useEffect } from "react";
import Rating from "../components/Rating";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { PRODUCT_DETAILS_RESET } from "../constants/productConstants";

import { Link } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Card,
  Image,
  Button,
  Form,
} from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";

const ProductScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
    return () => {
      dispatch({
        type: PRODUCT_DETAILS_RESET,
      });
    };
  }, [match, dispatch]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{product.name}</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>

              <ListGroup.Item>${product.price}</ListGroup.Item>

              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => {
                            setQty(e.target.value);
                          }}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <div className="d-grid gap-2">
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
