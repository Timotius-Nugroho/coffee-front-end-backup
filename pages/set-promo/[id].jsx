import Navbar from "../../components/module/AdminDashboardNavbar";
import Layout from "../../components/Layout";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import styles from "../../styles/SetPromo.module.css";
import Footer from "../../components/module/greyFooter";
import React, { useEffect, useState } from "react";
import { authPage } from "middleware/authorizationPage";
import axiosApiIntances from "utils/axios";
import Cookies from "js-cookie";
import { connect } from "react-redux";
import { updatePromo, deletePromo } from "redux/actions/promo";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const data = await authPage(context);

  const { id } = context.query;

  const promo = await axiosApiIntances
    .get(`/promo/${id}`, {
      headers: {
        Authorization: `Bearer ${data.token || ""}`,
      },
    })
    .then((res) => {
      return res.data.data[0];
    });
  return {
    props: { data: promo },
  };
}
function updatepromo(props) {
  const router = useRouter();
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
  const [token, setToken] = useState("");
  const [isImage, setIsImage] = useState(false);
  const [validate, setValidate] = useState(true);
  const [imagePromo, setImagePromo] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [msgError, setMsgError] = useState("");
  const [msgSuccess, setMsgSuccess] = useState("");
  const inputOpenFileRef = React.createRef();

  const showOpenFileDlg = () => {
    inputOpenFileRef.current.click();
  };

  const handleImage = (event) => {
    event.preventDefault();
    setIsImage(true);
    setImagePromo(URL.createObjectURL(event.target.files[0]));
    setFormPromo({ ...formPromo, image: event.target.files[0] });
  };

  const changeText = (event) => {
    setFormPromo({ ...formPromo, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    const id = props.data.promo_id;
    axiosApiIntances.get(`promo/${id}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token") || ""}`,
      },
    });
    setFormPromo({
      promoName: props.data.promo_name,
      promoCode: props.data.promo_code,
      promoDiscount: props.data.promo_discount,
      promoDesc: props.data.promo_desc,
      expireStart: props.data.expire_start.substring(0, 10),
      expireEnd: props.data.expire_end.substring(0, 10),
      minTotalPrice: props.data.min_total_price,
      maxDiscount: props.data.max_discount,
      image: props.data.promo_image,
    });
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

  const handleCancel = () => {
    setIsImage(false);
    setFormPromo({
      promoName: props.data.promo_name,
      promoCode: props.data.promo_code,
      promoDiscount: props.data.promo_discount,
      promoDesc: props.data.promo_desc,
      expireStart: props.data.expire_start,
      expireEnd: props.data.expire_end,
      minTotalPrice: props.data.min_total_price,
      maxDiscount: props.data.max_discount,
      image: props.data.promo_image,
    });
  };

  const updateData = (event) => {
    event.preventDefault();
    const id = props.data.promo_id;
    const formData = new FormData();
    formData.append("promoName", formPromo.promoName);
    formData.append("promoCode", formPromo.promoCode);
    formData.append("promoDiscount", formPromo.promoDiscount);
    formData.append("promoDesc", formPromo.promoDesc);
    formData.append("expireStart", formPromo.expireStart);
    formData.append("expireEnd", formPromo.expireEnd);
    formData.append("minTotalPrice", formPromo.minTotalPrice);
    formData.append("maxDiscount", formPromo.maxDiscount);
    if (typeof formPromo.image === "object") {
      formData.append("image", formPromo.image);
    }
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    props
      .updatePromo(id, formData, token)
      .then((res) => {
        setIsSuccess(true);
        setMsgSuccess(res.action.payload.data.msg);
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
        router.push("/product-admin");
      })
      .catch((err) => {
        setIsError(true);
        setMsgError(err.response.data.msg);
        setTimeout(() => {
          setIsError(false);
        }, 3000);
      });
  };

  const handleDelete = (event) => {
    event.preventDefault();
    const id = props.data.promo_id;
    props.deletePromo(id, token).then((res) => {
      router.push("/product-admin");
    });
  };

  return (
    <>
      <Layout title="Update Promo">
        <Navbar />
        <Container>
          <Row className="pt-5">
            <Col lg={4} md={4} sm={12} xs={12}>
              <span className="d-block">
                Promo {`>`} <span className="fw-bold">Update Promo</span>
              </span>
              <div className="pt-5">
                <div className="pt-3">
                  {isError && (
                    <Alert variant="danger" className={styles.alert}>
                      {msgError}
                    </Alert>
                  )}
                  {isSuccess && (
                    <Alert variant="success" className={styles.alert}>
                      Success Update Data
                    </Alert>
                  )}
                  <Card className={`${styles.picturePlaceBackground} mx-auto`}>
                    <input
                      ref={inputOpenFileRef}
                      type="file"
                      style={{ display: "none" }}
                      onChange={(event) => handleImage(event)}
                    />
                    <img
                      alt=""
                      src={
                        isImage
                          ? imagePromo
                          : `http://localhost:3005/backend5/api/${props.data.promo_image}`
                      }
                      className={styles.camera}
                    />
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
                    Enter the discount:{" "}
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
                <form onSubmit={(event) => updateData(event)}>
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
                  <Row>
                    <Col>
                      <div className="pt-4">
                        <button className={styles.brownButton} type="submit">
                          Update Promo
                        </button>
                      </div>
                    </Col>
                    <Col>
                      <div className="pt-4">
                        <button
                          className={styles.redButton}
                          onClick={(event) => handleDelete(event)}
                        >
                          Delete Promo
                        </button>
                      </div>
                    </Col>
                  </Row>

                  <div className="pt-4">
                    <button
                      className={styles.greyButton}
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
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

const mapDispatchToProps = { updatePromo, deletePromo };

export default connect(mapStateToProps, mapDispatchToProps)(updatepromo);
