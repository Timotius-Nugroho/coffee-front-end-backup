import styles from "../../styles/Footer.module.css";

export default function footer() {
  return (
    <>
    <div className={styles.greyBackground}>
      <div className="container">
        <div className="row pt-5">
          <div className="col-lg-8 col-md-8 col-sm-8 col-xs-12">
            <div
              className="d-flex justify-content-start mb-4"
              style={{ height: "33px" }}
            >
              <img src="/coffee1.png" className="img-fluid"></img>
              <span className="fw-bold my-auto ms-2">Coffee Shop</span>
            </div>
            <span className="d-block fw-bold my-1">
              Coffee Shop is a store that sells some good
            </span>
            <span className="d-block fw-bold my-1">
              meals, and especially coffee. We provide
            </span>
            <span className="d-block fw-bold my-1">high quality beans.</span>
            <div className="d-flex justify content-start mt-4">
              <span className="fw-bold">FB</span>
              <span className="fw-bold mx-1">·</span>
              <span className="fw-bold">Twitter</span>
              <span className="fw-bold mx-1">·</span>
              <span className="fw-bold">Instagram</span>
            </div>
            <span className="d-block mt-5 mb-5">©2020CoffeeExpress</span>
          </div>
          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12">
            <span className="d-block fw-bold mb-1">Product</span>
            <span className="d-block my-3">Download</span>
            <span className="d-block my-3">Pricing</span>
            <span className="d-block my-3">Locations</span>
            <span className="d-block my-3">Countries</span>
            <span className="d-block my-3">Blog</span>
          </div>
          <div className="col-lg-2 col-md-2 col-sm-2 col-xs-12">
            <span className="d-block fw-bold mb-1">Engage</span>
            <span className="d-block my-3">Coffee Shop ?</span>
            <span className="d-block my-3">FAQ</span>
            <span className="d-block my-3">About Us</span>
            <span className="d-block my-3">Privacy Policy</span>
            <span className="d-block my-3">Terms of Service</span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
