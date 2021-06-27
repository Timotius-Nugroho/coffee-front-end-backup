import { Container, Navbar, Nav, Row, Col } from "react-bootstrap";
import styles from "../../styles/NavBar.module.css";
import homeStyles from "../../styles/HomeNavbar.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";

import { connect } from "react-redux";
import { getUser } from "redux/actions/user";

function HomeNavBar(props) {
  const router = useRouter();
  const [user, setUser] = useState({});

  useEffect(() => {
    if (Cookie.get("token")) {
      props
        .getUser(Cookie.get("userId"), Cookie.get("token"))
        .then((res) => {
          setUser(res.value.data.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const moveToProfile = () => {
    router.push("/profile");
  };
  // console.log(user);
  return (
    <Container fluid className={styles.main}>
      <Container>
        <Navbar expand="lg">
          <Navbar.Brand href="#" className={styles.brand}>
            <Row>
              <Col>
                <img alt="" src="/coffee 1.png" />
              </Col>
              <Col className={styles.colBrand}>Coffee Express</Col>
            </Row>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {user.user_role === "admin" ? (
              <Nav className={styles.form}>
                <Nav.Link
                  className={styles.navLink}
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  className={styles.navLink}
                  onClick={() => {
                    router.push("/product-admin");
                  }}
                >
                  Product
                </Nav.Link>
                <Nav.Link
                  className={styles.navLink}
                  onClick={() => {
                    router.push("/manage-order-admin");
                  }}
                >
                  Orders
                </Nav.Link>
                <Nav.Link
                  className={styles.navLink}
                  onClick={() => {
                    router.push("/admin-dashboard");
                  }}
                >
                  Dashboard
                </Nav.Link>
              </Nav>
            ) : (
              <Nav className={styles.form}>
                <Nav.Link
                  className={styles.navLink}
                  onClick={() => {
                    router.push("/");
                  }}
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  className={styles.navLink}
                  onClick={() => {
                    router.push("/product-cust");
                  }}
                >
                  Product
                </Nav.Link>
                <Nav.Link
                  href="#"
                  className={styles.navLink}
                  onClick={() => {
                    router.push("/payment");
                  }}
                >
                  Your Chart
                </Nav.Link>
                <Nav.Link
                  href="#"
                  className={styles.navLink}
                  onClick={() => {
                    router.push("/history-cust");
                  }}
                >
                  History
                </Nav.Link>
              </Nav>
            )}
            {Cookie.get("token") ? (
              ""
            ) : (
              <Nav.Link
                className={`${styles.navLink} me-5 fw-bold`}
                onClick={() => {
                  router.push("/login");
                }}
              >
                Login
              </Nav.Link>
            )}
            {Cookie.get("token") ? (
              ""
            ) : (
              <button
                className={`${homeStyles.yellowButton} fw-bold`}
                onClick={() => {
                  router.push("/signup");
                }}
              >
                Sign Up
              </button>
            )}
            {user.user_image ? (
              <img
                alt=""
                src={`${process.env.IMAGE_URL}/${user.user_image}`}
                className={styles.profile}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  moveToProfile();
                }}
              />
            ) : Cookie.get("token") ? (
              <img
                alt=""
                src="/no-img.png"
                className={styles.profile}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  moveToProfile();
                }}
              />
            ) : (
              ""
            )}
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </Container>
  );
}

const mapDispatchToProps = { getUser };
export default connect(null, mapDispatchToProps)(HomeNavBar);
