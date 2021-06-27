import Layout from "components/Layout";
import NavBar from "components/module/NavBar";
import Footer from "components/module/footer";
import { Container, Row, Col, Card, Modal, Button } from "react-bootstrap";
import styles from "../../styles/HistoryCust.module.css";
import { useState, useEffect } from "react";
import { authPage } from "middleware/authorizationPage";
import Cookie from "js-cookie";

import { connect } from "react-redux";
import { getOrder, deleteOrder } from "redux/actions/order";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const data = await authPage(context);

  return {
    props: {},
  };
}

function historyCust(props) {
  const [dataHistory, setDataHistory] = useState([]);
  const [isClick, setIsClick] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [orderId, setOrderId] = useState(0);

  useEffect(() => {
    getHistory();
  }, []);

  const handleClick = () => {
    setIsClick(true);
  };

  const handleCloseClick = () => {
    setIsClick(false);
  };

  const handleDelete = (id) => {
    setOrderId(id);
    setIsDelete(true);
  };

  const handleCloseDelete = () => {
    setIsDelete(false);
  };

  const getHistory = () => {
    props
      .getOrder(Cookie.get("userId"), Cookie.get("token"))
      .then((res) => {
        setDataHistory(res.value.data.data);
      })
      .catch((err) => {
        alert(err.response.data.msg);
      });
  };

  const handleDeleteOrder = () => {
    console.log(orderId);
    props
      .deleteOrder(orderId, Cookie.get("token"))
      .then((res) => {
        handleCloseDelete();
        getHistory();
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

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

  return (
    <Layout title="History Customer">
      <Modal
        show={isDelete}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className={styles.modal}
        onHide={handleCloseDelete}
      >
        <Modal.Body className={styles.modalBody}>
          <p className={styles.textDelete}>
            Are you sure want to delete the selected items?
          </p>
          <Button onClick={handleCloseDelete} className={styles.btnClose}>
            Close
          </Button>
          <Button onClick={handleDeleteOrder} className={styles.btnDelete}>
            Delete
          </Button>
        </Modal.Body>
      </Modal>

      <NavBar />
      <Container fluid className={styles.mainContainer}>
        <Container className={styles.container}>
          <h1 className={styles.text}>Let’s see what you have bought!</h1>
          <p className={styles.noteText}>Long press to delete item</p>
          <Row className={styles.rowCardHistory}>
            {dataHistory.map((item, index) => {
              return (
                <Col key={index} sm={6} md={4} className={styles.colHistory}>
                  {isClick ? (
                    <Card className={styles.cardHistoryClick}>
                      <img
                        alt=""
                        src="/Ellipse 15.png"
                        className={styles.forDelete}
                        onClick={() => {
                          handleDelete(item.order_id);
                        }}
                      />
                      <img
                        alt=""
                        src="/Ellipse 183.png"
                        className={styles.forCancel}
                        onClick={handleCloseClick}
                      />
                      <img
                        alt=""
                        src="/Vector (6).png"
                        className={styles.imgDelete}
                        onClick={() => {
                          handleDelete(item.order_id);
                        }}
                      />
                      <img
                        alt=""
                        src="/x.png"
                        className={styles.imgCancel}
                        onClick={handleCloseClick}
                      />
                      <Row className={styles.rowInfo}>
                        <Col xs={4} className={styles.colImg}>
                          <img
                            alt=""
                            src={
                              item.product_image
                                ? `${process.env.IMAGE_URL}/${item.product_image}`
                                : "/makanan3.png"
                            }
                            className={styles.imgHistory}
                          />
                        </Col>
                        <Col xs={8} className={styles.colInfo}>
                          <h1 className={styles.nameHistory}>
                            {item.invoice_number}
                          </h1>
                          <p className={styles.priceHistory}>
                            IDR {convertToRupiah(item.total_price)}
                          </p>
                          <p className={styles.statusHistory}>
                            {item.order_status}
                          </p>
                        </Col>
                      </Row>
                    </Card>
                  ) : (
                    <Card className={styles.cardHistory} onClick={handleClick}>
                      <Row className={styles.rowInfo}>
                        <Col xs={4} className={styles.colImg}>
                          <img
                            alt=""
                            src={
                              item.product_image
                                ? `${process.env.IMAGE_URL}/${item.product_image}`
                                : "/makanan3.png"
                            }
                            className={styles.imgHistory}
                          />
                        </Col>
                        <Col xs={8} className={styles.colInfo}>
                          <h1 className={styles.nameHistory}>
                            {item.invoice_number}
                          </h1>
                          <p className={styles.priceHistory}>
                            IDR {convertToRupiah(item.total_price)}
                          </p>
                          <p className={styles.statusHistory}>
                            {item.order_status}
                          </p>
                        </Col>
                      </Row>
                    </Card>
                  )}
                </Col>
              );
            })}
          </Row>
        </Container>
      </Container>
      <Footer />
    </Layout>
  );
}

const mapDispatchToProps = { getOrder, deleteOrder };
export default connect(null, mapDispatchToProps)(historyCust);
