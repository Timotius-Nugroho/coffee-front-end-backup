import { useState } from "react";
import Layout from "../../../components/Layout";
import styles from "../../../styles/Signup.module.css";
import newStyles from "../../../styles/NewPassword.module.css";
import Footer from "../../../components/module/Footer";
// import { useRouter } from "next/router";
// import Cookies from "js-cookie";
import axiosApiIntances from "utils/axios";
import { Alert } from "react-bootstrap";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { unauthPage } from "middleware/authorizationPage";

export async function getServerSideProps(context) {
  await unauthPage(context);
  return { props: {} };
}

export default function forgetpassword() {
  const userEmailCookie = Cookie.get("userEmail");
  // console.log("And the email is " + userEmailCookie);
  const router = useRouter();

  const [form, setForm] = useState({
    userEmail: userEmailCookie,
    userPassword: "",
    userPasswordConfirm: "",
  });

  const [msgError, setMsgError] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const changeText = (event) => {
    event.preventDefault();
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleForgetPassword = (event) => {
    event.preventDefault();
    if (form.userPassword !== form.userPasswordConfirm) {
      setIsError(true);
      setIsSuccess(false);
      setMsgError("Passwords don't match !");
      console.log("Passwords don't match !");
    } else {
      axiosApiIntances
        .post("auth/request-change-password", form)
        .then((res) => {
          setIsSuccess(true);
          setIsError(false);
          console.log(res);
          setTimeout(() => {
            moveToLoginPage();
          }, 2000);
        })
        .catch((err) => {
          console.log("This is " + err);
        });
    }
  };

  const moveToLoginPage = () => {
    router.push("/login");
  };

  return (
    <>
      <Layout title="New Password">
        <div className={`container-fluid`}>
          <div
            className={`row position-relative pb-5 ${newStyles.headerForgetPassword}`}
          >
            <div className={newStyles.headerContent}>
              <form className={`mt-5`}>
                <input
                  className={`form-control ${styles.inputHeight} ${newStyles.inputWidth} mx-1 mx-auto`}
                  placeholder="Enter new password"
                  type="password"
                  name="userPassword"
                  onChange={(event) => changeText(event)}
                ></input>
                <input
                  className={`form-control ${styles.inputHeight} ${newStyles.inputWidth} mt-3 mx-auto`}
                  placeholder="Confirm new password"
                  type="password"
                  name="userPasswordConfirm"
                  onChange={(event) => changeText(event)}
                ></input>
                <div className="mt-3">
                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className={`${styles.yellowExpressButtonLarger}`}
                      onClick={handleForgetPassword}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </form>
              {/* <div className="mt-4">
                <Alert
                  variant="danger"
                  className={`${newStyles.alert} mx-auto`}
                >
                  Message error here
                </Alert>
                <Alert
                  variant="success"
                  className={`${newStyles.alert} mx-auto`}
                >
                  We have sent you an email to restart your password! Please
                  check it out!
                </Alert>
              </div> */}
              <div className="mt-4">
                {isError && (
                  <Alert
                    variant="danger"
                    className={`${newStyles.alert} mx-auto`}
                  >
                    {msgError}
                  </Alert>
                )}
                {isSuccess && (
                  <Alert
                    variant="success"
                    className={`${newStyles.alert} mx-auto`}
                  >
                    We have sent you an email to restart your password! Please
                    check it out!
                  </Alert>
                )}
              </div>
              <div className={newStyles.lowerHeaderContent}>
                <span className="text-center d-block fw-bold">
                  Click here if you didn't receive any link
                </span>
                <span className="text-center d-block fw-bold">
                  in 2 minutes
                </span>
                <div className="d-flex justify-content-center my-2">
                  <button className={newStyles.resendLinkBrown}>
                    Resend Link
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </Layout>
    </>
  );
}
