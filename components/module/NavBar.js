import { Container, Navbar, Nav, Form, Row, Col } from "react-bootstrap";
import styles from "../../styles/NavBar.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";

import { connect } from "react-redux";
import { setKeywords } from "redux/actions/keywords";
import { getUser } from "redux/actions/user";

function NavBar(props) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    props
      .getUser(Cookie.get("userId"), Cookie.get("token"))
      .then((res) => {
        if (!props.global) {
          if (res.value.data.data[0].user_role !== "customer") {
            window.location.href = "/product-admin";
          }
        }
        setUser(res.value.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const setKeywordsStore = (text) => {
    setSearch(text);
    props.setKeywords(text);
    if (props.catchKey) {
      props.catchKey(text);
    }
  };

  const moveToProfile = () => {
    router.push("/profile");
  };

  // console.log("NAV", user);
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
            {props.catchKey ? (
              <Form>
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className={styles.formControl}
                  onChange={(event) => {
                    setKeywordsStore(event.target.value);
                  }}
                />
              </Form>
            ) : (
              ""
            )}
            <img alt="" src="/chat.png" className={styles.notif} />
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
            ) : (
              <img
                alt=""
                src="/no-img.png"
                className={styles.profile}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  moveToProfile();
                }}
              />
            )}
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </Container>
  );
}

const mapDispatchToProps = { setKeywords, getUser };
export default connect(null, mapDispatchToProps)(NavBar);
