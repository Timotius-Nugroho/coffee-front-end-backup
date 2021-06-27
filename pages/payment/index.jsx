import Layout from "components/Layout";
import Footer from "components/module/footer";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import styles from "../../styles/Payment.module.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { authPage } from "middleware/authorizationPage";
import axiosApiIntances from "utils/axios";
import { useRouter } from "next/router";
import NavBar from "components/module/NavBar";

export async function getServerSideProps(context) {
  const { productId } = context.query;
  const data = await authPage(context);
  const user = await axiosApiIntances
    .get(`user/${data.userId}`, {
      headers: {
        Authorization: "Bearer " + data.token,
      },
    })
    .then((res) => {
      return res.data.data[0];
    })
    .catch((err) => {
      console.log(err.response);
      return {};
    });

  const product = await axiosApiIntances
    .get(`product/${productId}`, {
      headers: {
        Authorization: "Bearer " + data.token,
      },
    })
    .then((res) => {
      return res.data.data[0];
    })
    .catch((err) => {
      return {};
    });

  return {
    props: { user, product },
  };
}

export default function payment(props) {
  const router = useRouter();
  const [orderItem, setOrderItem] = useState([]);
  const [dataCoupons, setDataCoupons] = useState([]);
  const [useCoupun, setUseCoupon] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [subTotal, setSubtotal] = useState(0);

  useEffect(() => {
    if (Cookies.get("coupon")) {
      setDataCoupons([JSON.parse(Cookies.get("coupon"))]);
    }
    if (Cookies.get("item")) {
      setOrderItem(JSON.parse(Cookies.get("item")));
    }
  }, []);

  useEffect(() => {
    let total = 0;
    for (const key in orderItem) {
      total += orderItem[key][2];
    }
    setSubtotal(total);
  }, [orderItem]);

  const convertToRupiah = (amount) => {
    let number_string = amount.toString(),
      sisa = number_string.length % 3,
      rupiah = number_string.substr(0, sisa),
      ribuan = number_string.substr(sisa).match(/\d{3}/g);

    if (ribuan) {
      let separator = sisa ? "." : "";
      return (rupiah += separator + ribuan.join("."));
    }
  };

  const handleCoupon = () => {
    const option = document.getElementById("dropdown");
    const oneCoupon = option.value.split(",")[0];
    setUseCoupon(parseInt(oneCoupon));
    setPromoCode(option.value.split(",")[1]);
  };

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method);
  };

  const handleConfirm = () => {
    if (!paymentMethod) {
      alert("Select Payment method");
    } else {
      const setData = {
        userId: Cookies.get("userId"),
        invoicePromoCode:
          dataCoupons.length > 0
            ? dataCoupons[0].promoCode
            : "No Coupon Selected",
        invoiceSubtotal:
          useCoupun != undefined
            ? subTotal <= useCoupun
              ? 0
              : subTotal - useCoupun
            : subTotal,
        paymentMethod,
      };
      setData.orders = orderItem.map((item) => {
        return {
          productId: props.product.product_id,
          size: item[0],
          qty: item[1],
          totalPrice: item[2],
        };
      });

      axiosApiIntances
        .post("/invoice/create", setData, {
          headers: {
            Authorization: "Bearer " + Cookies.get("token"),
          },
        })
        .then((res) => {
          Cookies.remove("coupon");
          Cookies.remove("item");
          if (paymentMethod == "Midtrans") {
            window.open(res.data.data);
          }
          alert("Pesanan berhasil");
          router.push("product-cust");
        })
        .catch((err) => {
          alert(err.response.data.msg);
        });
    }
  };

  return (
    <Layout title="Payment & Delivery">
      <NavBar />
      <Container fluid className={styles.mainBackground}>
        <Container className={styles.mainContainer}>
          <Row>
            <Col sm={6}>
              <h1 className={styles.title}>
                Checkout your <br />
                item now!
              </h1>
              <Card className={styles.invoice}>
                <h1 className={styles.titleInvoice}>Order Summary</h1>

                <Card className={styles.cardOrder}>
                  <Row className={styles.rowCardOrder}>
                    <Col sm={3} className={styles.colCardOrderImg}>
                      <img
                        alt=""
                        src={`http://localhost:3005/backend5/api/${props.product.product_image}`}
                        className={styles.imgOrder}
                      />
                    </Col>
                    <Col sm={6} className={styles.colCardOrder}>
                      <p className={styles.Order}>
                        {props.product.product_name}
                      </p>
                      {orderItem.map((item, index) => {
                        return (
                          <div key={index}>
                            <p className={styles.Order}>
                              x{item[1]} {item[0]}
                            </p>
                          </div>
                        );
                      })}
                    </Col>
                    <Col sm={4} className={styles.colPriceOrder}>
                      <p className={styles.priceOrder}>
                        IDR {convertToRupiah(subTotal)}
                      </p>
                    </Col>
                  </Row>
                </Card>

                <hr />

                {dataCoupons.map((item, index) => {
                  return (
                    <select
                      id="dropdown"
                      onChange={handleCoupon}
                      className={styles.dropdown}
                      key={index}
                    >
                      <option value={[0, "No Select Coupon"]}>
                        No Select Coupon
                      </option>
                      <option value={[item.maxDiscount, item.promoCode]}>
                        {item.name}
                      </option>
                    </select>
                  );
                })}
                <hr />
                <Row className={styles.rowCount}>
                  <Col className={styles.countInvoice}>DISCOUNT</Col>
                  <Col className={styles.nominal}>
                    IDR{" "}
                    {useCoupun === undefined || !useCoupun
                      ? 0
                      : convertToRupiah(useCoupun)}
                  </Col>
                </Row>
                <Row className={styles.rowCount}>
                  <Col className={styles.countInvoice}>SUBTOTAL</Col>

                  <Col className={styles.nominal}>
                    IDR {convertToRupiah(subTotal)}
                  </Col>
                </Row>
                <Row className={styles.rowCountTotal}>
                  <Col className={styles.countTotal} sm={6}>
                    TOTAL
                  </Col>

                  <Col className={styles.nominalTotal} sm={6}>
                    IDR{" "}
                    {useCoupun != undefined
                      ? subTotal <= useCoupun
                        ? 0
                        : convertToRupiah(subTotal - useCoupun)
                      : convertToRupiah(subTotal)}
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col sm={6} className={styles.colDetails}>
              <Col>
                <h1 className={styles.textDetails}>Address details</h1>
              </Col>

              <Card className={styles.cardAddress}>
                <p className={styles.address}>
                  <strong>Delivery</strong>
                </p>
                <hr />
                <p className={styles.addressDetails}>
                  {props.user.user_address}
                </p>
                <hr />
                <p className={styles.phone}>{props.user.user_phone}</p>
              </Card>
              <h1 className={styles.method}>Payment method</h1>
              <Card className={styles.cardMethod}>
                <Form>
                  <Form.Group>
                    <Form.Check>
                      <Form.Check.Input
                        type="radio"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                        className={styles.radio}
                        onClick={() => handlePaymentMethod("Midtrans")}
                      />
                      <Form.Check.Label>
                        <Row>
                          <Col>
                            <img
                              alt=""
                              src="/Rectangle 13.png"
                              className={styles.recMidtrans}
                            />
                            <img
                              alt=""
                              src="/Vector (7).png"
                              className={styles.logoMidtrans}
                            />
                          </Col>
                          <Col className={styles.midtrans}>Midtrans</Col>
                        </Row>
                      </Form.Check.Label>
                    </Form.Check>
                    <hr />
                    <Form.Check>
                      <Form.Check.Input
                        type="radio"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"
                        className={styles.radio}
                        onClick={() => handlePaymentMethod("Cash on delivery")}
                      />
                      <Form.Check.Label>
                        {" "}
                        <Row>
                          <Col xs={3}>
                            <img
                              alt=""
                              src="/Rectangle 12.png"
                              className={styles.recCod}
                            />
                            <img
                              alt=""
                              src="/fast-delivery 3.png"
                              className={styles.logoCod}
                            />
                          </Col>
                          <Col className={styles.cod} xs={9}>
                            Cash on delivery
                          </Col>
                        </Row>
                      </Form.Check.Label>
                    </Form.Check>
                  </Form.Group>
                </Form>
              </Card>
              <Button className={styles.btnConfirm} onClick={handleConfirm}>
                Confirm and Pay
              </Button>
            </Col>
          </Row>
        </Container>
      </Container>
      <Footer />
    </Layout>
  );
}
