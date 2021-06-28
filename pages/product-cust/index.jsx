import Layout from "../../components/Layout";
import NavBar from "../../components/module/NavBar";
import { Col, Container, Row, Card, Button, Nav } from "react-bootstrap";
import styles from "../../styles/ProductCust.module.css";
import Footer from "../../components/module/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { authPage } from "middleware/authorizationPage";
import { connect } from "react-redux";
import { getAllProduct } from "redux/actions/product";
import { getAllPromo } from "redux/actions/promo";
import ReactPaginate from "react-paginate";

export async function getServerSideProps(context) {
  const data = await authPage(context);

  return {
    props: {},
  };
}

function ProductCust(props) {
  const router = useRouter();
  const limit = 10;
  const [page, setPage] = useState(1);
  const [category, setCateggory] = useState("foods");
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({});
  const [dataCoupons, setDataCoupons] = useState([]);
  const [dataMenu, setDataMenu] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState({});

  useEffect(() => {
    setSearch(props.keywords);
    if (Cookie.get("coupon")) {
      setSelectedCoupon(JSON.parse(Cookie.get("coupon")));
    }
    props
      .getAllProduct(Cookie.get("token"), search, limit, page, category)
      .then((res) => {
        setPagination(res.value.data.pagination);
        setDataMenu(
          res.value.data.data.map((item) => {
            return {
              productId: item.product_id,
              name: item.product_name,
              price: item.product_price,
              image: item.product_image
                ? `${process.env.IMAGE_URL}/${item.product_image}`
                : "/makanan3.png",
            };
          })
        );
      })
      .catch((err) => {
        console.log(err.response.status);
      });

    props
      .getAllPromo(Cookie.get("token"), 1000, 1)
      .then((res) => {
        setDataCoupons(
          res.value.data.data.map((item) => {
            return {
              promoId: item.promo_id,
              name: item.promo_name,
              promoCode: item.promo_code,
              maxDiscount: item.max_discount,
              minTotalPrice: item.min_total_price,
              note: item.promo_desc,
              image: item.promo_image
                ? `${process.env.IMAGE_URL}/${item.promo_image}`
                : "/image 43.png",
            };
          })
        );
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  useEffect(() => {
    setSearch(props.keywords);
    props
      .getAllProduct(Cookie.get("token"), search, limit, page, category)
      .then((res) => {
        // console.log("RES", res.value.data.data);
        setPagination(res.value.data.pagination);
        setDataMenu(
          res.value.data.data.map((item) => {
            return {
              productId: item.product_id,
              name: item.product_name,
              price: item.product_price,
              image: item.product_image
                ? `${process.env.IMAGE_URL}/${item.product_image}`
                : "/makanan3.png",
            };
          })
        );
      })
      .catch((err) => {
        console.log(err.response.status);
        if (err.response.status === 404) {
          setDataMenu([]);
          setPagination({});
        }
      });

    router.push(
      `/product-cust?limit=${limit}&page=${page}&search=${search}&category=${category}`
    );
  }, [page, search, category]);

  const handlePageClick = (event) => {
    const selectedPage = event.selected + 1;
    setPage(selectedPage);
  };

  const handleSelectCoupon = () => {
    Cookie.set("coupon", selectedCoupon, {
      expires: 1,
      secure: true,
    });
  };

  const moveToProductDetail = (id) => {
    router.push(`/product-detail/${id}`);
  };

  const catchKeywords = (text) => {
    setSearch(text);
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
    <Layout title="Product Customer">
      <NavBar catchKey={catchKeywords} />
      <Container
        fluid
        className={`${styles.mainContainer} p-3`}
        style={{ marginBottom: "-20px" }}
      >
        <Row>
          <Col md={4} className={`${styles.col1} p-4`}>
            <h1 className={styles.title}>Promo Today</h1>
            <p className={`${styles.note} mb-4`}>
              Coupons will be updated every weeks.
              <br /> Check them out!{" "}
            </p>
            <div className={styles.cnt}>
              {dataCoupons.map((item, index) => {
                return (
                  <Card
                    className={`${
                      item.name === "MOTHER DAY"
                        ? styles.cardCoupons
                        : item.name === "INDEPENDENT DAY"
                        ? styles.cardCoupons2
                        : item.name === "BATIK DAY"
                        ? styles.cardCoupons3
                        : styles.cardCoupons
                    }`}
                    key={index}
                    onClick={() => {
                      setSelectedCoupon(item);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <Row>
                      <Col lg={4} className="text-center">
                        <Card.Img
                          alt=""
                          src={item.image}
                          className={styles.cardImgCoupons}
                          variant="left"
                        />
                      </Col>
                      <Col lg={8} className="text-center">
                        <Card.Text className={styles.nameCoupons}>
                          {item.name}
                        </Card.Text>
                        <Card.Text className={styles.noteCoupons}>
                          {item.note}
                        </Card.Text>
                      </Col>
                    </Row>
                  </Card>
                );
              })}
            </div>
            {selectedCoupon.name ? (
              <div className="text-center">
                Selected coupon : {selectedCoupon.name}
              </div>
            ) : (
              ""
            )}
            <Button
              className={styles.btnApply}
              onClick={() => {
                handleSelectCoupon();
              }}
            >
              Apply Coupon
            </Button>
            <p className={styles.terms}>Terms and Condition</p>

            <p className={styles.listTerm}>
              1. You can only apply 1 coupon per day
              <br />
              2. It only for dine in
              <br />
              3. Buy 1 get 1 only for new user
              <br />
              4. Should make member card to apply coupon
            </p>
          </Col>
          <Col md={8} className={styles.col2}>
            <Nav as="ul" className={styles.nav}>
              <Nav.Item as="li">
                <Nav.Link href="#" className={styles.link}>
                  <div
                    onClick={() => {
                      setCateggory("fav");
                    }}
                  >
                    Favorite Product
                  </div>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link eventKey="link-1" className={styles.link}>
                  <div
                    onClick={() => {
                      setCateggory("coffee");
                    }}
                  >
                    Coffee
                  </div>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link eventKey="link-2" className={styles.link}>
                  <div
                    onClick={() => {
                      setCateggory("noncoffee");
                    }}
                  >
                    Non Coffee
                  </div>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link eventKey="link-2" className={styles.link}>
                  <div
                    onClick={() => {
                      setCateggory("foods");
                    }}
                  >
                    Foods
                  </div>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link eventKey="link-2" className={styles.link}>
                  <div
                    onClick={() => {
                      setCateggory("addon");
                    }}
                  >
                    Add-on
                  </div>
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Row className={styles.cnt} style={{ height: "800px" }}>
              {dataMenu.length > 0
                ? dataMenu.map((item, index) => {
                    return (
                      <Col key={index}>
                        <Card
                          className={`${styles.cardMenu} mx-auto`}
                          onClick={() => {
                            moveToProductDetail(item.productId);
                          }}
                        >
                          <img alt="" src={item.image} />
                          <h1 className={styles.nameMenu}>{item.name}</h1>
                          <p className={styles.price}>
                            {convertToRupiah(item.price)}
                          </p>
                        </Card>
                      </Col>
                    );
                  })
                : ""}
            </Row>
            <div className="mt-3 d-flex justify-content-center">
              <ReactPaginate
                previousLabel={"prev"}
                nextLabel={"next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={pagination.totalPage ? pagination.totalPage : 0}
                marginPagesDisplayed={5}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={styles.pagination}
                subContainerClassName={`${styles.pages} ${styles.pagination}`}
                activeClassName={styles.active}
              />
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  keywords: state.keywords.keywords,
});

const mapDispatchToProps = { getAllProduct, getAllPromo };
export default connect(mapStateToProps, mapDispatchToProps)(ProductCust);
