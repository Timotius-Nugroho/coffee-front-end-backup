import styles from "../../../styles/Signup.module.css";
import Footer from "../../../components/module/Footer";
import Layout from "components/Layout";
import { connect } from "react-redux";
import { login } from "redux/actions/auth";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import { unauthPage } from "middleware/authorizationPage";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import axiosApiIntances from "utils/axios";

export async function getServerSideProps(context) {
  await unauthPage(context);
  return { props: {} };
}

function Login(props) {
  const router = useRouter();
  const [form, setForm] = useState({
    userEmail: "",
    userPassword: "",
  });
  const [msgError, setMsgError] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const changeText = (event) => {
    event.preventDefault();
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const handleLogin = (event) => {
    event.preventDefault();
    if (form.userEmail.length === 0 || form.userPassword.length === 0) {
      setIsError(true);
      setIsSuccess(false);
      setMsgError("Please Input field correctly !");
    } else {
      axiosApiIntances
        .post("/auth/login", form)
        .then((res) => {
          setIsSuccess(true);
          setIsError(false);
          Cookies.set("token", res.data.data.token);
          Cookies.set("userId", res.data.data.user_id);
          if (res.data.data.user_role === "admin") {
            router.push("/product-admin");
          } else {
            router.push("/product-cust");
          }
        })
        .catch((err) => {
          setIsError(true);
          setIsSuccess(false);
          setMsgError(err.response.data.msg);
        });
    }
  };
  const handleSignUp = () => {
    router.push("/signup");
  };
  const handleForgot = () => {
    router.push("/forget-password");
  };
  return (
    <>
      <Layout title="Login">
        <div className="container-fluid">
          <div className="row position-relative pb-5">
            <div className={`col-lg-6 col-md-6 col-sm-6 d-none d-sm-block g-0`}>
              <img
                src="/signup/signup_left_page.png"
                className="img-fluid"
              ></img>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
              <div className="d-flex justify-content-between p-4">
                <div
                  className={`d-flex justify-content-around h-100 my-auto d-block d-sm-none d-md-block`}
                >
                  <img src="/coffee1.png" className="me-2"></img>
                  <span className="fw-bold my-auto ms-2">Coffee Express</span>
                </div>
                <div className={styles.yellowLoginButton}>
                  <button
                    className={styles.yellowExpressButton}
                    onClick={handleSignUp}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
              <div className="row w-100 mt-4">
                <h4 className="text-center fw-bold mt-4">Login</h4>
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                  {isError && (
                    <Alert variant="danger" className={styles.alert}>
                      {msgError}
                    </Alert>
                  )}
                  {isSuccess && (
                    <Alert variant="success" className={styles.alert}>
                      Success Login
                    </Alert>
                  )}
                  {/* <Alert variant="danger" className={styles.alert}>
                    {msgError}
                  </Alert>
                  <Alert variant="success" className={styles.alert}>
                    Success Login
                  </Alert> */}
                  <form
                    className={`mt-5 ${styles.formWidth}`}
                    onSubmit={handleLogin}
                  >
                    <div className="my-4">
                      <span className="fw-bold">Email Address</span>
                      <input
                        type="email"
                        className={`form-control mt-2 ${styles.inputHeight}`}
                        placeholder="Enter your email address"
                        name="userEmail"
                        value={form.userEmail}
                        onChange={(event) => changeText(event)}
                        required
                      ></input>
                    </div>
                    <div className="my-4">
                      <span className="fw-bold">Password</span>
                      <input
                        type="password"
                        className={`form-control mt-2 ${styles.inputHeight}`}
                        placeholder="Enter your password"
                        name="userPassword"
                        value={form.userPassword}
                        onChange={(event) => changeText(event)}
                        required
                      ></input>
                    </div>

                    <span
                      className="d-block fw-bold text-decoration-underline"
                      onClick={handleForgot}
                      style={{ cursor: "pointer" }}
                    >
                      Forgot Password?
                    </span>

                    <div className="mt-5">
                      <button
                        className={`w-100 ${styles.yellowExpressButtonLarger}`}
                        onClick={(event) => handleLogin(event)}
                      >
                        Login
                      </button>
                    </div>
                    <div className="mt-3">
                      <button
                        className={`w-100 ${styles.whiteExpressButtonLarger}`}
                      >
                        Login with Google
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className={`card ${styles.memberCardLogin}`}>
              <div className="d-flex justify-content-around h-100 p-4">
                <div className="row">
                  <h5 className="fw-bold">Get your member</h5>
                  <h5 className="fw-bold">card now!</h5>
                  <span>Let's join our member and enjoy the deals.</span>
                </div>
                <div className="row my-auto">
                  <button className={styles.yellowCardButton}>
                    Create Now
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-5">
            <div className={`${styles.footerSpacingLogin} pt-5`}>
              <Footer />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
