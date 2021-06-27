import Layout from "../../components/Layout";
import Navbar from "../../components/module/AdminDashboardNavbar";
import { Container, Row, Col, Card, Modal, Button } from "react-bootstrap";
import styles from "../../styles/ManageOrderAdmin.module.css";
import Footer from "../../components/module/footer";
import axiosApiIntances from "utils/axios";
import { authPage } from "middleware/authorizationPage";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { connect } from "react-redux";
import { updateStatus } from "redux/actions/invoice";

export async function getServerSideProps(context) {
  const data = await authPage(context);

  const limit = 1;

  const res = await axiosApiIntances
    .get(`invoice/pending?limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${data.token || ""}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response;
    });

  return {
    props: { data: res },
  };
}

function manageOrderAdmin(props) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [token, setToken] = useState("");
  const [pagination, setPagination] = useState({});
  const [isDone, setIsDone] = useState(false);
  const [isError, setIsError] = useState(false);
  const [msgError, setMsgError] = useState("");

  useEffect(() => {
    setToken(Cookies.get("token"));
  }, []);

  useEffect(() => {
    console.log(page);
    const limit = 1;
    axiosApiIntances
      .get(`invoice/pending?limit=${limit}&page=${page}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token") || ""}`,
        },
      })
      .then((res) => {
        console.log(res);
        setData(res.data.data);
        setPagination(res.data.pagination);
      });
  }, [page]);

  const getData = () => {
    const limit = 1;
    axiosApiIntances.get(`invoice/pending?limit=${limit}&page=${page}`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token") || ""}`,
      },
    });
  };

  const formatRupiah = (money) => {
    return new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 0,
    }).format(money);
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setPage(selectedPage);
  };

  const handleDone = (event) => {
    event.preventDefault();
    const id = data[0].invoice_id;
    console.log(id);
    props
      .updateStatus(id, token)
      .then((res) => {
        setIsDone(true);
        getData();
        setPage(1);
      })
      .catch((err) => {
        setIsError(true);
        setMsgError(err.response.data.msg);
        console.log(err);
      });
  };

  const handleClose = () => {
    setIsDone(false);
  };

  return (
    <>
      <Layout title="Admin Order Manage">
        <Navbar />
        <div className={styles.pageBackground}>
          <Container className="pb-5">
            <Row>
              <Col lg={5} md={5} sm={12} className="mt-5">
                <h4 className={`fw-bold ${styles.customerOrderStyle}`}>
                  Finish your
                </h4>
                <h4 className={`fw-bold ${styles.customerOrderStyle}`}>
                  customer order now.
                </h4>
                {data.map((item, index) => {
                  return (
                    <Card className={`mt-5 ${styles.bigCard}`} key={index}>
                      <div className="px-4">
                        <h3 className="fw-bold text-center mt-5 mb-2">
                          Delivery Order
                        </h3>
                        <span className="d-block text-center">
                          for {item.user_name}
                        </span>
                        {item.list_order.map((item, index) => {
                          if (item.size === "R") {
                            item.size = "Reguler";
                          } else if (item.size === "L") {
                            item.size = "Large";
                          } else if (item.size === "XL") {
                            item.size = "Extra Large";
                          }

                          return (
                            <div
                              className="d-flex justify-content-between mt-5 mb-3"
                              key={index}
                            >
                              <img
                                src={`http://localhost:3005/backend5/api/${item.product_image}`}
                                className={styles.productImg}
                              ></img>
                              <div className="row px-4">
                                <span>{item.product_name}</span>
                                <span>x {item.qty}</span>
                                <span>{item.size}</span>
                              </div>
                              <span className="my-auto">
                                IDR {formatRupiah(item.total_price)}
                              </span>
                            </div>
                          );
                        })}

                        <hr />
                        <div className="d-flex justify-content-between mt-5 mb-5">
                          <h5
                            className={`fw-bold text-center ${styles.brownText}`}
                          >
                            TOTAL
                          </h5>
                          <h5
                            className={`fw-bold text-center ${styles.brownText}`}
                          >
                            IDR {formatRupiah(item.invoice_subtotal)}
                          </h5>
                        </div>
                      </div>
                    </Card>
                  );
                })}
                <ReactPaginate
                  previousLabel={"prev"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={pagination.totalPage}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={2}
                  onPageChange={handlePageClick}
                  containerClassName={styles.pagination}
                  subContainerClassName={`${styles.pages} ${styles.pagination}`}
                  activeClassName={styles.active}
                />
              </Col>
              <Col className={styles.col2}>
                <div className={`ms-4 me-4 ${styles.col1}`}>
                  <div>
                    <div className="mt-5">
                      <div className="mt-5">
                        <div className="mt-5">
                          <div className={`mt-5  ${styles.col3}`}>
                            <h5
                              className={`mt-5 mb-5 fw-bold ${styles.customerOrderStyle}`}
                            >
                              Payment method
                            </h5>
                            <Card className={`mt-4 ${styles.bigCard}`}>
                              <div className="p-4">
                                <form>
                                  {data.map((item, index) => {
                                    return (
                                      <div className="d-flex h-100" key={index}>
                                        <input
                                          type="radio"
                                          id="bankAccount"
                                          name="paymentMethod"
                                          value="bankAccount"
                                          className="my-auto"
                                          checked={true}
                                          readOnly
                                        ></input>
                                        <span
                                          className={`${styles.bankAccountBackground} mx-2`}
                                        >
                                          <img
                                            src="/bank-account.png"
                                            className={`${styles.cardVectorSize} my-2 mx-2`}
                                          ></img>
                                        </span>
                                        <label className="my-auto">
                                          {item.payment_method}
                                        </label>
                                      </div>
                                    );
                                  })}
                                </form>
                              </div>
                            </Card>
                            <Modal show={isDone} onHide={handleClose}>
                              <Modal.Body className={styles.modalBody}>
                                <img
                                  alt=""
                                  src={isError ? "failed.png" : "/success.png"}
                                  className={styles.success}
                                />
                                <br />
                                {isError ? msgError : "Success Done Order"}
                              </Modal.Body>
                            </Modal>
                            <div className="mt-2">
                              <button
                                className={styles.brownDoneButton}
                                onClick={(event) => handleDone(event)}
                              >
                                Mark as done
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Footer />
      </Layout>
    </>
  );
}
const mapStateToProps = (state) => ({
  invoice: state.invoice,
});

const mapDispatchToProps = { updateStatus };

export default connect(mapStateToProps, mapDispatchToProps)(manageOrderAdmin);
