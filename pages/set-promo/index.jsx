import Navbar from "../../components/module/AdminDashboardNavbar";
import Layout from "../../components/Layout";
import { Container, Row, Col, Card, Grid, Form, Alert } from "react-bootstrap";
import styles from "../../styles/SetPromo.module.css";
import Footer from "../../components/module/greyFooter";
import { connect } from "react-redux";
import { postPromo } from "redux/actions/promo";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

function setpromo(props) {
  const [formPromo, setFormPromo] = useState({
    promoName: "",
    promoCode: "",
    promoDiscount: "",
    promoDesc: "",
    expireStart: "",
    expireEnd: "",
    minTotalPrice: "",
    maxDiscount: "",
    image: null,
  });
  const [imagePromo, setImagePromo] = useState("");
  const [validate, setValidate] = useState(true);
  const [isImage, setIsImage] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [msgError, setMsgError] = useState("");
  const [msgSuccess, setMsgSuccess] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(Cookies.get("token"));
    if (
      formPromo.promoName === "" ||
      formPromo.promoCode === "" ||
      formPromo.promoDiscount === "" ||
      formPromo.promoDesc === "" ||
      formPromo.expireStart === "" ||
      formPromo.expireEnd === "" ||
      formPromo.minTotalPrice === "" ||
      formPromo.maxDiscount === ""
    ) {
      setValidate(true);
    } else if (formPromo) {
      setValidate(false);
    }
  }, []);

  const inputOpenFileRef = React.createRef();

  const showOpenFileDlg = () => {
    inputOpenFileRef.current.click();
  };

  const handleImage = (event) => {
    setValidate(false);
    event.preventDefault();
    setIsImage(true);
    setImagePromo(URL.createObjectURL(event.target.files[0]));
    setFormPromo({ ...formPromo, image: event.target.files[0] });
  };

  const changeText = (event) => {
    setFormPromo({ ...formPromo, [event.target.name]: event.target.value });
  };

  const handlePost = (event) => {
    event.preventDefault();
    if (formPromo.expireEnd === "" || formPromo.expireStart === "") {
      setIsError(true);
      setMsgError("Please Input From Expire Correctly!");
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    } else {
      const formData = new FormData();
      formData.append("promoName", formPromo.promoName);
      formData.append("promoDiscount", formPromo.promoDiscount);
      formData.append("expireStart", formPromo.expireStart);
      formData.append("expireEnd", formPromo.expireEnd);
      formData.append("minTotalPrice", formPromo.minTotalPrice);
      formData.append("maxDiscount", formPromo.maxDiscount);
      formData.append("promoCode", formPromo.promoCode);
      formData.append("promoDesc", formPromo.promoDesc);
      formData.append("image", formPromo.image);
      props
        .postPromo(formData, token)
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
    }
  };

  const handleCancel = () => {
    setIsImage(false);
    setFormPromo({
      promoName: "",
      promoCode: "",
      promoDiscount: "",
      promoDesc: "",
      expireStart: "",
      expireEnd: "",
      minTotalPrice: "",
      maxDiscount: "",
      image: null,
    });
  };

  return (
    <>
      <Layout title="Set Promo">
        <Navbar />
        <Container>
          <Row className="pt-5">
            <Col lg={4} md={4} sm={12} smPush={12} xs={12} xsPush={12}>
              <span className="d-block">
                Promo {`>`} <span className="fw-bold">Add Promo</span>
              </span>
              <div className="pt-5">
                <div className="pt-3">
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
                  <Card className={`${styles.picturePlaceBackground} mx-auto`}>
                    <img
                      src={
                        isImage ? imagePromo : "/photo-camera-black-tool 4.png"
                      }
                      className={
                        isImage
                          ? `${styles.picturePlace1} mx-auto my-auto`
                          : `${styles.picturePlace} mx-auto my-auto`
                      }
                    ></img>
                  </Card>
                </div>
              </div>
              <div className="pt-4">
                <button
                  className={styles.yellowishButton}
                  onClick={showOpenFileDlg}
                >
                  Choose From Gallery
                </button>
              </div>
              <form>
                <div className="form-group">
                  <label className={styles.boldBrownText1}>
                    Enter the discount:
                  </label>
                  <select
                    className={`${styles.setPromoForm1} w-100 form-control`}
                    name="promoDiscount"
                    value={formPromo.promoDiscount}
                    onChange={(event) => changeText(event)}
                  >
                    <option value="20">20%</option>
                    <option value="30">30%</option>
                    <option value="50">50%</option>
                    <option value="70">70%</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className={styles.boldBrownText1}>
                    Expire date :{" "}
                  </label>
                  <input
                    className={`${styles.setPromoForm1} w-100 form-control`}
                    type="date"
                    name="expireStart"
                    value={formPromo.expireStart}
                    onChange={(event) => changeText(event)}
                  ></input>
                  <input
                    className={`${styles.setPromoForm1} w-100 form-control`}
                    type="date"
                    name="expireEnd"
                    value={formPromo.expireEnd}
                    onChange={(event) => changeText(event)}
                  ></input>
                </div>
              </form>
            </Col>
            <Col lg={7} md={7} sm={12} xs={12}>
              <div className={styles.leftPanel}>
                <form onSubmit={(event) => handlePost(event)}>
                  <div className="form-group">
                    <label className={styles.boldBrownText}>Name: </label>
                    <input
                      className={`${styles.setPromoForm} w-100 form-control`}
                      type="text"
                      placeholder="Type product name min. 50 characters"
                      name="promoName"
                      value={formPromo.promoName}
                      onChange={(event) => changeText(event)}
                      required
                    ></input>
                  </div>
                  <div className="row mt-5">
                    <div className="col">
                      <label className={styles.boldBrownText}>
                        Min Total Price :{" "}
                      </label>
                      <input
                        className={`${styles.setPromoForm} form-control`}
                        type="text"
                        placeholder="Type the min total price"
                        name="minTotalPrice"
                        value={formPromo.minTotalPrice}
                        onChange={(event) => changeText(event)}
                        required
                      ></input>
                    </div>
                    <div className="col">
                      <label className={styles.boldBrownText}>
                        Max Discount :
                      </label>
                      <input
                        className={`${styles.setPromoForm} form-control`}
                        placeholder="Type the max discount"
                        name="maxDiscount"
                        value={formPromo.maxDiscount}
                        onChange={(event) => changeText(event)}
                        required
                      ></input>
                    </div>
                  </div>
                  <div className="form-group mt-5">
                    <label className={styles.boldBrownText}>
                      Input promo code :
                    </label>
                    <input
                      className={`${styles.setPromoForm} w-100 form-control`}
                      type="text"
                      placeholder="Type the promo code"
                      name="promoCode"
                      value={formPromo.promoCode}
                      onChange={(event) => changeText(event)}
                      required
                    ></input>
                  </div>
                  <div className="form-group mt-5">
                    <label className={styles.boldBrownText}>
                      Description:{" "}
                    </label>
                    <input
                      className={`${styles.setPromoForm} w-100 form-control`}
                      type="text"
                      placeholder="Describe your product min. 150 characters"
                      name="promoDesc"
                      value={formPromo.promoDesc}
                      onChange={(event) => changeText(event)}
                      required
                    ></input>
                  </div>
                  <div className="pt-4">
                    <button className={styles.brownButton} type="submit">
                      Save Promo
                    </button>
                  </div>
                  <div className="pt-4">
                    <button className={styles.greyButton}>Cancel</button>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
        <div className={`${styles.greyBackground} mt-5`}>
          <div className="pt-5">
            <Footer />
          </div>
        </div>
      </Layout>
    </>
  );
}
const mapStateToProps = (state) => ({
  promo: state.promo,
});

const mapDispatchToProps = { postPromo };

export default connect(mapStateToProps, mapDispatchToProps)(setpromo);
