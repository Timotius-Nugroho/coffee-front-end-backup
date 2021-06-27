import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import styles from "../../styles/Profile.module.css";
import NavBar from "components/module/HomeNavbar";
import Footer from "components/module/footer";
import { authPage } from "middleware/authorizationPage";
import axiosApiIntances from "utils/axios";
import Cookie from "js-cookie";

import { connect } from "react-redux";
import {
  getUser,
  updateUser,
  deleteImage,
  changePassword,
} from "redux/actions/user";

export async function getServerSideProps(context) {
  const data = await authPage(context);
  // console.log("data", data);

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

  return {
    props: { user },
  };
}

function Profile(props) {
  const router = useRouter();
  const [user, setUser] = useState(props.user);
  const [token, setToken] = useState("");
  const [showAlert, setShowAlert] = useState([false, ""]);
  const [userGender, setUserGender] = useState(user.user_gender);
  const [userEmail, setUserEmail] = useState(user.user_email);
  const [userPhone, setUserPhone] = useState(user.user_phone);
  const [userAddress, setUserAddress] = useState(user.user_address);
  const [userDisplayName, setUserDisplayName] = useState(
    user.user_display_name
  );
  const [userFirstName, setUserFirstName] = useState(user.user_first_name);
  const [userLastName, setUserLastName] = useState(user.user_last_name);
  const [userBirthday, setUserBirthday] = useState(
    user.user_birthday.split("T")[0]
  );
  const [userImage, setUserImage] = useState(
    `${process.env.IMAGE_URL}/${user.user_image}`
  );
  const [image, setImage] = useState(null);

  useEffect(() => {
    setToken(Cookie.get("token"));
  }, []);

  const handleImage = (event) => {
    if (event.target.files[0]) {
      setUserImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    } else {
      setUserImage(`${process.env.IMAGE_URL}/${user.user_image}`);
      setImage(null);
    }
  };

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("userEmail", userEmail);
    formData.append("userPhone", userPhone);
    formData.append("userAddress", userAddress);
    formData.append("userDisplayName", userDisplayName);
    formData.append("userFirstName", userFirstName);
    formData.append("userLastName", userLastName);
    formData.append("userBirthday", userBirthday);
    formData.append("userGender", userGender);
    if (image) {
      formData.append("image", image);
    }
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    props
      .updateUser(user.user_id, formData, token)
      .then((res) => {
        setShowAlert([true, res.value.data.msg]);
        setTimeout(() => {
          setShowAlert([false, ""]);
          refreshUserData();
        }, 3000);
      })
      .catch((err) => {
        // console.log(err.response);
        setShowAlert([true, err.response.data.msg]);
        setTimeout(() => {
          setShowAlert([false, ""]);
        }, 3000);
      });
  };

  const refreshUserData = () => {
    props
      .getUser(user.user_id, token)
      .then((res) => {
        setUser(res.value.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
        setShowAlert([true, "uknow error !"]);
        setTimeout(() => {
          setShowAlert([false, ""]);
        }, 3000);
      });
  };

  const selectGender = (event) => {
    console.log(event.target.value);
    setUserGender(event.target.value);
  };

  const handleRemovePhoto = () => {
    // console.log(token);
    props
      .deleteImage(user.user_id, token)
      .then((res) => {
        setShowAlert([true, res.value.data.msg]);
        setTimeout(() => {
          setShowAlert([false, ""]);
          refreshUserData();
        }, 3000);
      })
      .catch((err) => {
        setShowAlert([true, err.response.data.msg]);
        setTimeout(() => {
          setShowAlert([false, ""]);
        }, 3000);
      });
  };

  const handleLogout = () => {
    Cookie.remove("token");
    Cookie.remove("userId");
    router.push("/login");
  };

  // console.log("GENDER", user.user_id);
  return (
    <Layout title="Profile">
      <NavBar global={true} />
      <Container className={`${styles.cnt} pt-4 pb-5`} fluid>
        <Row>
          <Col>
            <div className={`${styles.title} mb-4 ms-3`}>User Profile</div>
          </Col>
        </Row>
        <Row className={`${styles.box} p-4 me-3 ms-3`}>
          <Col md={3}>
            <div className="text-center mt-4 mb-4">
              {showAlert[0] ? (
                <div
                  className={`${styles.alert} alert alert-warning`}
                  role="alert"
                  style={{ fontSize: "12px" }}
                >
                  {showAlert[1]}
                </div>
              ) : (
                ""
              )}
              <label
                htmlFor="formFile"
                className="form-label"
                style={{ cursor: "pointer" }}
              >
                {userImage !== `${process.env.IMAGE_URL}/` ? (
                  <img
                    src={userImage}
                    style={{ width: "80%" }}
                    className={styles.noPp}
                  />
                ) : (
                  <Image
                    src="/no-img.png"
                    alt="Picture user"
                    width={140}
                    height={140}
                    className={styles.noPp}
                  />
                )}
              </label>
              <input
                className={`${styles.fileInput} form-control`}
                type="file"
                onChange={(event) => {
                  handleImage(event);
                }}
                id="formFile"
              />
              <div
                className={`${styles.name}`}
              >{`${user.user_first_name} ${user.user_last_name}`}</div>
              <div className={`${styles.email} mb-3`}>
                <p>{user.user_email}</p>
              </div>
              <Button
                className={`${styles.btnBrown} mb-2`}
                variant="light"
                onClick={() => {
                  handleRemovePhoto();
                }}
              >
                Remove photo
              </Button>
              <Button className={`${styles.btnWhite} mb-4`} variant="light">
                EditPassword
              </Button>
              <div className={`${styles.sideText} mb-4`}>
                Do you want to save the change?
              </div>
              <Button
                className={`${styles.btnBrown} mb-2`}
                variant="light"
                onClick={() => {
                  handleUpdate();
                }}
              >
                Save Change
              </Button>
              <Button className={`${styles.btnYellow} mb-4`} variant="light">
                Cancel
              </Button>
              <Button
                className={`${styles.btnWhite}`}
                variant="light"
                onClick={() => {
                  handleLogout();
                }}
              >
                Log Out
              </Button>
            </div>
          </Col>
          <Col md={9}>
            <div className={`${styles.innerBox} shadow p-5`}>
              <div className={`${styles.rightTitle} mb-4`}>Contacts</div>
              <Row>
                <Col md={7}>
                  <Form.Group className="mb-3" controlId="formGroupEmail1">
                    <Form.Label className={styles.semi}>
                      Email address:
                    </Form.Label>
                    <Form.Control
                      className={styles.input}
                      type="email"
                      value={userEmail}
                      onChange={(event) => {
                        setUserEmail(event.target.value);
                      }}
                      placeholder="Enter email"
                    />
                  </Form.Group>
                </Col>
                <Col md={5}>
                  <Form.Group className="mb-3" controlId="formGroupText2">
                    <Form.Label className={styles.semi}>
                      Mobile number:
                    </Form.Label>
                    <Form.Control
                      className={styles.input}
                      type="text"
                      value={userPhone}
                      onChange={(event) => {
                        setUserPhone(event.target.value);
                      }}
                      placeholder="Enter phone number"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={7}>
                  <Form.Group className="mb-3" controlId="formGroupText3">
                    <Form.Label className={styles.semi}>
                      Delivery adress :
                    </Form.Label>
                    <Form.Control
                      className={styles.input}
                      type="text"
                      value={userAddress}
                      onChange={(event) => {
                        setUserAddress(event.target.value);
                      }}
                      placeholder="Enter delivery addres"
                    />
                  </Form.Group>
                </Col>
                <Col></Col>
              </Row>
              <div className={`${styles.rightTitle} mb-4 mt-4`}>Details</div>
              <Row>
                <Col md={7}>
                  <Form.Group className="mb-3" controlId="formGroupText4">
                    <Form.Label className={styles.semi}>
                      Display name:
                    </Form.Label>
                    <Form.Control
                      className={styles.input}
                      type="text"
                      value={userDisplayName}
                      onChange={(event) => {
                        setUserDisplayName(event.target.value);
                      }}
                      placeholder="Enter name"
                    />
                  </Form.Group>
                </Col>
                <Col md={5}>
                  <Form.Group className="mb-3" controlId="formGroupText5">
                    <Form.Label className={styles.semi}>DD/MM/YY:</Form.Label>
                    <Form.Control
                      className={styles.input}
                      type="date"
                      value={userBirthday}
                      onChange={(event) => {
                        setUserBirthday(event.target.value);
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={7}>
                  <Form.Group className="mb-3" controlId="formGroupText6">
                    <Form.Label className={styles.semi}>
                      First name :
                    </Form.Label>
                    <Form.Control
                      className={styles.input}
                      type="text"
                      value={userFirstName}
                      onChange={(event) => {
                        setUserFirstName(event.target.value);
                      }}
                      placeholder="Enter first name"
                    />
                  </Form.Group>
                </Col>
                <Col></Col>
              </Row>
              <Row>
                <Col md={7}>
                  <Form.Group className="mb-3" controlId="formGroupText7">
                    <Form.Label className={styles.semi}>Last name :</Form.Label>
                    <Form.Control
                      className={styles.input}
                      type="text"
                      value={userLastName}
                      onChange={(event) => {
                        setUserLastName(event.target.value);
                      }}
                      placeholder="Enter last name"
                    />
                  </Form.Group>
                </Col>
                <Col></Col>
              </Row>
              <div className="text-center mt-4">
                Current gender : {userGender}
              </div>
              <div>
                <div onChange={selectGender} className="text-center mt-1">
                  <input
                    type="radio"
                    value="MALE"
                    name="gender"
                    className="me-2"
                  />{" "}
                  Male
                  <input
                    type="radio"
                    value="FEMALE"
                    name="gender"
                    className="me-2 ms-3"
                  />{" "}
                  Female
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Layout>
  );
}

const mapDispatchToProps = { getUser, updateUser, deleteImage, changePassword };
export default connect(null, mapDispatchToProps)(Profile);
