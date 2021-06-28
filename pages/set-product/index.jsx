import Layout from "components/Layout";
import NavBar from "components/module/AdminDashboardNavbar";
import Footer from "components/module/Footer";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import styles from "../../styles/NewProduct.module.css";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { postProduct } from "redux/actions/product";
import Cookies from "js-cookie";
import { authPage } from "middleware/authorizationPage";

export async function getServerSideProps(context) {
  const data = await authPage(context);

  return {
    props: {},
  };
}

function newProduct(props) {
  const [isClickSize, setIsClickSize] = useState(false);
  const [isClickCoffee, setIsClickCoffee] = useState(false);
  const [validate, setValidate] = useState(false);
  const [isImage, setIsImage] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [msgError, setMsgError] = useState("");
  const [msgSuccess, setMsgSuccess] = useState("");
  const [token, setToken] = useState("");
  const [imageProduct, setImageProduct] = useState("");
  const [formProduct, setFormProduct] = useState({
    productName: "",
    productPrice: "",
    productCategory: "",
    productSize: "",
    productDesc: "",
    image: null,
  });

  useEffect(() => {
    setToken(Cookies.get("token"));
    if (
      formProduct.productName === "" &&
      formProduct.productPrice === "" &&
      formProduct.productCategory === "" &&
      formProduct.productSize === "" &&
      formProduct.productDesc === ""
    ) {
      setValidate(true);
    } else {
      setValidate(false);
    }
  }, []);

  const handleClickSizeCoffee = () => {
    setValidate(false);
    setIsClickCoffee(true);
    setIsClickSize(false);
    setFormProduct({ ...formProduct, productSize: "A" });
  };

  const handleClickSizeFood = () => {
    setValidate(false);
    setIsClickSize(true);
    setIsClickCoffee(false);
    setFormProduct({ ...formProduct, productSize: "B" });
  };

  const inputOpenFileRef = React.createRef();

  const showOpenFileDlg = () => {
    inputOpenFileRef.current.click();
  };

  const handleImage = (event) => {
    event.preventDefault();
    setIsImage(true);
    setImageProduct(URL.createObjectURL(event.target.files[0]));
    setFormProduct({ ...formProduct, image: event.target.files[0] });
  };

  const changeText = (event) => {
    setFormProduct({
      ...formProduct,
      [event.target.name]: event.target.value,
    });
  };

  const handleCancel = () => {
    setValidate(true);
    setIsImage(false);
    setFormProduct({
      productName: "",
      productPrice: "",
      productCategory: "",
      productSize: "",
      productDesc: "",
      image: null,
    });
  };

  const handlePost = () => {
    const formData = new FormData();
    formData.append("productName", formProduct.productName);
    formData.append("productPrice", formProduct.productPrice);
    formData.append("productCategory", formProduct.productCategory);
    formData.append("productSize", formProduct.productSize);
    formData.append("productDesc", formProduct.productDesc);
    formData.append("image", formProduct.image);
    props
      .postProduct(formData, token)
      .then((res) => {
        setIsSuccess(true);
        setMsgSuccess(res.action.payload.data.msg);
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
        handleCancel();

        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setIsImage(false);
        setIsError(true);
        setMsgError(err.response.data.msg);
        setTimeout(() => {
          setIsError(false);
        }, 3000);
      });
  };

  return (
    <Layout title="Add Product">
      <NavBar />
      <Container>
        <p className={styles.titleProduct}>
          Product &gt;<span className={styles.page}>Add product</span>
        </p>
        <Row>
          <Col sm={5}>
            <input
              ref={inputOpenFileRef}
              type="file"
              style={{ display: "none" }}
              onChange={(event) => handleImage(event)}
            />
            {isError && (
              <Alert variant="danger" className={styles.alert}>
                {msgError}
              </Alert>
            )}
            {isSuccess && (
              <Alert variant="success" className={styles.alert}>
                {msgSuccess}
              </Alert>
            )}
            <Card className={isImage ? styles.cardImgProduct : styles.forImg}>
              <img
                alt=""
                src={isImage ? imageProduct : "/camera.png"}
                className={isImage ? styles.imageProduct : styles.camera}
              />
            </Card>
            <Button className={styles.btnGalery} onClick={showOpenFileDlg}>
              Choose from gallery
            </Button>
            <Button
              className={styles.btnSave}
              onClick={handlePost}
              disabled={validate}
            >
              Save Product
            </Button>
            {validate && (
              <p className={styles.validate}>Please Input All Field</p>
            )}
            <Button className={styles.btnCancel} onClick={handleCancel}>
              Cancel
            </Button>
          </Col>
          <Col sm={7} className={styles.formInput}>
            <Form>
              <Form.Group controlId="formText">
                <Form.Label className={styles.nameLabel}>Name :</Form.Label>

                <Form.Control
                  type="text"
                  placeholder="Type product name min. 50 characters"
                  className={styles.controlInput}
                  name="productName"
                  value={formProduct.productName}
                  onChange={(event) => changeText(event)}
                />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group controlId="formGridEmail">
                    <Form.Label className={styles.nameLabel}>
                      Price :
                    </Form.Label>

                    <Form.Control
                      type="text"
                      placeholder="Type the price"
                      className={styles.controlInput}
                      name="productPrice"
                      value={formProduct.productPrice}
                      onChange={(event) => changeText(event)}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="formGridPassword">
                    <Form.Label className={styles.nameLabel}>
                      Category :
                    </Form.Label>
                    <Form.Control
                      as="select"
                      className={styles.controlInput}
                      name="productCategory"
                      value={formProduct.productCategory}
                      onChange={(event) => changeText(event)}
                    >
                      <option value="">Select category</option>
                      <option value="fav">Favorite Product</option>
                      <option value="coffee">Coffee</option>
                      <option value="noncoffee">Non Coffee</option>
                      <option value="foods">Foods</option>
                      <option value="addon">Add-on</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="formEmail">
                <Form.Label className={styles.nameLabel}>
                  Description :
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Describe your product min. 150 characters"
                  className={styles.controlInput}
                  name="productDesc"
                  value={formProduct.productDesc}
                  onChange={(event) => changeText(event)}
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label className={styles.nameLabel}>
                  Input product size :
                </Form.Label>
                <br />
                <Form.Text className="text-muted">
                  Click size you want to use for this product
                </Form.Text>
              </Form.Group>
            </Form>
            <Row className={styles.rowCardCategory}>
              <Col xs={2} className={styles.col2}>
                <Card
                  className={isClickCoffee ? styles.click : styles.unClick}
                  onClick={handleClickSizeCoffee}
                >
                  R
                </Card>
              </Col>{" "}
              <Col xs={2} className={styles.col2}>
                <Card
                  className={isClickCoffee ? styles.click : styles.unClick}
                  onClick={handleClickSizeCoffee}
                >
                  L
                </Card>
              </Col>{" "}
              <Col xs={2} className={styles.col2}>
                <Card
                  className={isClickCoffee ? styles.click : styles.unClick}
                  onClick={handleClickSizeCoffee}
                >
                  XL
                </Card>
              </Col>{" "}
              <Col xs={2} className={styles.col2}>
                <Card
                  className={isClickSize ? styles.click : styles.unClick}
                  onClick={handleClickSizeFood}
                >
                  250
                  <br /> gr
                </Card>
              </Col>{" "}
              <Col xs={2} className={styles.col2}>
                <Card
                  className={isClickSize ? styles.click : styles.unClick}
                  onClick={handleClickSizeFood}
                >
                  300
                  <br /> gr
                </Card>
              </Col>{" "}
              <Col xs={2} className={styles.col2}>
                <Card
                  className={isClickSize ? styles.click : styles.unClick}
                  onClick={handleClickSizeFood}
                >
                  500
                  <br /> gr
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Layout>
  );
}
const mapStateToProps = (state) => ({
  product: state.product,
});

const mapDispatchToProps = { postProduct };

export default connect(mapStateToProps, mapDispatchToProps)(newProduct);
