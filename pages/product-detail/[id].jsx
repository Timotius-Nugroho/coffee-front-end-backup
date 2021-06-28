import NavBar from "components/module/NavBar";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Layout from "../../components/Layout";
import styles from "../../styles/ProductDetail.module.css";
import Footer from "components/module/Footer";
import { authPage } from "middleware/authorizationPage";
import axiosApiIntances from "utils/axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

export async function getServerSideProps(context) {
  const data = await authPage(context);
  const { id } = context.query;

  const product = await axiosApiIntances
    .get(`product/${id}`, {
      headers: {
        Authorization: "Bearer " + data.token,
      },
    })
    .then((res) => {
      return res.data.data;
    })
    .catch(() => {
      return [];
    });

  return {
    props: { id, product },
  };
}

export default function ProductDetail(props) {
  const router = useRouter();
  const [qty, setQty] = useState(0);
  const [count, setCount] = useState(0);
  const [size, setSize] = useState("");
  const [price, setPrice] = useState(0);
  const [cart, setCart] = useState(false);
  const priceR = props.product[0].product_price;
  const priceL = (priceR * 50) / 100 + priceR;
  const priceXL = (priceL * 50) / 100 + priceL;
  const [productName, setProductName] = useState("");
  const [order, setOrder] = useState({});
  const [checkout, setCheckout] = useState([]);
  const [productType, setProductType] = useState([]);

  const handleProductCategory = () => {
    if (props.product[0].product_category == "fav") {
      return "Favorite Product";
    }
    if (props.product[0].product_category == "coffee") {
      return "Coffee";
    }
    if (props.product[0].product_category == "noncoffee") {
      return "Non Coffee";
    }
    if (props.product[0].product_category == "foods") {
      return "Foods";
    }
    if (props.product[0].product_category == "addon") {
      return "Add-on";
    }
  };

  const handleCart = () => {
    if (count === 0) {
      alert("Choose a size");
    } else {
      alert("Berhasil masuk ke cart");
    }
  };

  useEffect(() => {
    setCheckout(Object.keys(order).map((key) => order[key]));
  }, [count, size]);

  useEffect(() => {
    if (props.product[0].product_size == "A") {
      setProductType(["R", "L", "XL"]);
    } else {
      setProductType(["250gr", "300gr", "500gr"]);
    }
  }, []);

  const countPlus = () => {
    if (size === "") {
      alert("Choose a size");
    } else {
      setCount(parseInt(count) + 1);
      setQty(qty + 1);
      if (size == "R" || size == "250gr") {
        setPrice(parseInt(priceR) + parseInt(price));

        setOrder(
          Object.assign(order, {
            sizeR: [order.sizeR[0], count + 1, priceR + price],
          })
        );
      }
      if (size == "L" || size == "300gr") {
        setPrice(parseInt(priceL) + parseInt(price));

        setOrder(
          Object.assign(order, {
            sizeL: [order.sizeL[0], count + 1, priceL + price],
          })
        );
      }
      if (size == "XL" || size == "500gr") {
        setPrice(parseInt(priceXL) + parseInt(price));

        setOrder(
          Object.assign(order, {
            sizeXL: [order.sizeXL[0], count + 1, priceXL + price],
          })
        );
      }
    }
  };

  const countMinus = () => {
    if (count <= 1) {
      setQty(0);
      setCount(0);
      setPrice(0);
      setSize([""]);
      setCart(false);
      if (size == "R" || size == "250gr") {
        delete order.sizeR;
      }
      if (size == "L" || size == "300gr") {
        delete order.sizeL;
      }
      if (size == "XL" || size == "500gr") {
        delete order.sizeXL;
      }
    } else {
      setCount(parseInt(count) - 1);
      setQty(qty - 1);
      if (size == "R" || size == "250gr") {
        setPrice(parseInt(price) - parseInt(priceR));
        setOrder(
          Object.assign(order, {
            sizeR: [order.sizeR[0], count - 1, price - priceR],
          })
        );
      }
      if (size == "L" || size == "300gr") {
        setPrice(parseInt(price) - parseInt(priceL));
        setOrder(
          Object.assign(order, {
            sizeL: [order.sizeL[0], count - 1, price - priceL],
          })
        );
      }
      if (size == "XL" || size == "500gr") {
        setPrice(parseInt(price) - parseInt(priceXL));
        setOrder(
          Object.assign(order, {
            sizeXL: [order.sizeXL[0], count - 1, price - priceXL],
          })
        );
      }
    }
  };

  const handleSize = (stringSize) => {
    setQty(1);
    setCount(1);
    setCart(true);
    setProductName(props.product[0].product_name);
    if (stringSize == "R" || stringSize == "250gr") {
      setSize(stringSize);
      setPrice(priceR);

      if (order.sizeR === undefined) {
        setOrder(Object.assign(order, { sizeR: [stringSize, 1, priceR] }));
      } else {
        setCount(order.sizeR[1]);
        setQty(order.sizeR[1]);
        setPrice(order.sizeR[2]);
      }
    }
    if (stringSize == "L" || stringSize == "300gr") {
      setSize(stringSize);
      setPrice(priceL);

      if (order.sizeL === undefined) {
        setOrder(Object.assign(order, { sizeL: [stringSize, 1, priceL] }));
      } else {
        setCount(order.sizeL[1]);
        setQty(order.sizeL[1]);
        setPrice(order.sizeL[2]);
      }
    }
    if (stringSize == "XL" || stringSize == "500gr") {
      setSize(stringSize);
      setPrice(priceXL);

      if (order.sizeXL === undefined) {
        setOrder(Object.assign(order, { sizeXL: [stringSize, 1, priceXL] }));
      } else {
        setCount(order.sizeXL[1]);
        setQty(order.sizeXL[1]);
        setPrice(order.sizeXL[2]);
      }
    }
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

  const handleCheckout = () => {
    event.preventDefault();
    console.log(checkout);

    Cookies.set("item", checkout);
    Cookies.set("productId", props.product[0].product_id);

    router.push(`/payment?productId=${props.product[0].product_id}`);
  };

  return (
    <Layout title="Product Detail">
      <NavBar />
      <div className={styles.container}>
        <h2>
          {handleProductCategory()}
          <span>
            {">"} {props.product[0].product_name}
          </span>
        </h2>
        <div className={`row ${styles.row}`}>
          <div className={`col-5 ${styles.colLeft}`}>
            {props.product[0].product_image ? (
              <img
                src={`http://localhost:3005/backend5/api/${props.product[0].product_image}`}
                alt=""
              />
            ) : (
              <img src="/warning.png" alt="" />
            )}

            <div className={styles.size}>
              <h3>Choose a size</h3>
              <div className={styles.sizeFont}>
                {productType.map((item, index) => {
                  return (
                    <Button
                      key={index}
                      variant="warning"
                      onClick={() => handleSize(item)}
                    >
                      {props.product[0].product_size == "A" ? (
                        item
                      ) : (
                        <h6>{item}</h6>
                      )}
                    </Button>
                  );
                })}
              </div>
            </div>
            <Button onClick={handleCart} variant="Light">
              Add to Cart
            </Button>
          </div>
          <div className={`col-7 ${styles.colRight}`}>
            <h1>{props.product[0].product_name}</h1>
            <p>{props.product[0].product_desc}</p>
            <div
              className={styles.total}
              style={
                cart === false
                  ? { visibility: "hidden" }
                  : { visibility: "visible" }
              }
            >
              <div className={styles.btnCount}>
                <button
                  className={
                    qty === 1 && cart === true
                      ? styles.minusTrash
                      : styles.minus
                  }
                  onClick={countMinus}
                >
                  {qty === 1 && cart === true ? (
                    <img src="/icon-trash.png" alt="" />
                  ) : (
                    "-"
                  )}
                </button>
                <h4>{qty}</h4>
                <button className={styles.plus} onClick={countPlus}>
                  +
                </button>
              </div>
              <h2>IDR{convertToRupiah(price)}</h2>
            </div>
            <div
              style={
                checkout.length <= 0
                  ? { visibility: "hidden" }
                  : { visibility: "visible" }
              }
              className={styles.checkout}
              onClick={handleCheckout}
            >
              <img
                src={`http://localhost:3005/backend5/api/${props.product[0].product_image}`}
                alt=""
              />
              <div className={styles.order}>
                <h5>{props.product[0].product_name}</h5>
                {checkout.length > 0
                  ? checkout.map((item, index) => {
                      return (
                        <h6 key={index}>
                          x{item[1]} ({item[0]})
                        </h6>
                      );
                    })
                  : ""}
              </div>
              <h3>Checkout</h3>
              <Button variant="warning">
                <img src="/arrow 3.png" alt="" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
