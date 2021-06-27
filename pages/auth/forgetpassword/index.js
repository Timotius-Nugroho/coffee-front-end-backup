import { useState } from "react";
import axiosApiIntances from "../../../utils/axios";
import Layout from "../../../components/Layout";
import styles from "../../../styles/Signup.module.css";
import forgetStyles from "../../../styles/Forgetpassword.module.css";
import Footer from "../../../components/module/footer";
import { Alert } from "react-bootstrap";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { unauthPage } from "middleware/authorizationPage";

export async function getServerSideProps(context) {
  await unauthPage(context);
  return { props: {} };
}

export default function forgetpassword() {
  const router = useRouter();
  const [form, setForm] = useState({
    userEmail: "",
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
    console.log(form);
    if (form.userEmail.length === 0) {
      setIsError(true);
      setIsSuccess(false);
      setMsgError("Please input the field!");
    } else {
      axiosApiIntances
        .post("auth/request-change-password", form)
        .then((res) => {
          setIsSuccess(true);
          setIsError(false);
          console.log(form.userEmail);
          Cookie.set("userEmail", form.userEmail);
          setTimeout(() => {
            moveToNewPassword();
          }, 2000);
        })
        .catch((err) => {
          setIsError(true);
          setIsSuccess(false);
          setMsgError("Email is not registered");
          console.log("This is " + err);
        });
    }
  };

  const moveToNewPassword = () => {
    router.push("/new-password");
  };

  return (
    <>
      <Layout title="Forget Password">
        <div className={`container-fluid`}>
          <div
            className={`row position-relative pb-5 ${forgetStyles.headerForgetPassword}`}
          >
            <div className={forgetStyles.headerContent}>
              <h1 className="text-center fw-bold">Forgot Your Password?</h1>
              <span className="text-center d-block fw-bold">
                Don't worry, we got your back!
              </span>
              <form className={`d-flex justify-content-center mt-5`}>
                <input
                  className={`form-control ${styles.inputHeight} ${forgetStyles.inputWidth} mx-1`}
                  placeholder="Enter your email addres to get link"
                  name="userEmail"
                  onChange={(event) => changeText(event)}
                ></input>
                <button
                  type="submit"
                  className={`${styles.yellowExpressButtonLarger} mx-1`}
                  onClick={handleForgetPassword}
                >
                  Send
                </button>
              </form>
              <div className="mt-4">
                {isError && (
                  <Alert
                    variant="danger"
                    className={`${forgetStyles.alert} mx-auto`}
                  >
                    Email not registered !
                  </Alert>
                )}
                {/* <Alert
                  variant="danger"
                  className={`${forgetStyles.alert} mx-auto`}
                >
                  Email not registered !
                </Alert> */}
              </div>
              <div className={forgetStyles.lowerHeaderContent}>
                <span className="text-center d-block fw-bold">
                  Click here if you didn't receive any link
                </span>
                <span className="text-center d-block fw-bold">
                  in 2 minutes
                </span>
                <div className="d-flex justify-content-center my-2">
                  <button className={forgetStyles.resendLinkBrown}>
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
