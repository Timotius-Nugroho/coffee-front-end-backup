import Layout from "../components/Layout";
import Navbar from "../components/module/HomeNavbar";
import { Container, Row, Col, Card } from "react-bootstrap";
import stylesHome from "../styles/Home.module.css";
import Footer from "../components/module/greyFooterLonger";

export default function Home() {
  return (
    <>
      <Layout title="Coffee Express">
        <Navbar />
        <div className={`${stylesHome.header}`}>
          <Container className={`position-relative`}>
            <Row>
              <Col
                lg={5}
                md={5}
                sm={5}
                xs={12}
                className={stylesHome.headerLeft}
              >
                <h2 className={`fw-bold ${stylesHome.headerLineHeight}`}>
                  Start Your Day With Coffee and Good Meals
                </h2>
                <p
                  className={`fw-bold ${stylesHome.headerParagraphLineHeight}`}
                >
                  We provide high quality beans, good taste, and healthy meals
                  made by love just for you. Start your day with us for a bigger
                  smile!
                </p>
                <button className={stylesHome.yellowButton}>Get Started</button>
              </Col>

              {/* Experimental Row */}
              <div
                className={`container position-absolute ${stylesHome.headerCardBackground}`}
              >
                <div className={`${stylesHome.headerCardRow} row py-4`}>
                  <Col lg={4} md={4} sm={4} xs={4}>
                    <Row className={`${stylesHome.cardContentCenter} h-100`}>
                      <Col lg={2} md={3} sm={4} xs={5}>
                        <div className={`${stylesHome.yellowBulletBackground}`}>
                          <img
                            src="/vector_orang.png"
                            className={stylesHome.cardBulletImage}
                          ></img>
                        </div>
                      </Col>
                      <Col
                        lg={2}
                        md={2}
                        sm={2}
                        xs={2}
                        className={stylesHome.bulletDescription}
                      >
                        <span className="fw-bold d-block">90+</span>
                        <span className="d-block">Staff</span>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={4} md={4} sm={4} xs={4}>
                    <Row className={`${stylesHome.cardContentCenter} h-100`}>
                      <Col lg={2} md={3} sm={4} xs={5}>
                        <div className={`${stylesHome.yellowBulletBackground}`}>
                          <img
                            src="/vector_map.png"
                            className={`${stylesHome.cardBulletImage}`}
                          ></img>
                        </div>
                      </Col>
                      <Col
                        lg={2}
                        md={2}
                        sm={2}
                        xs={2}
                        className={stylesHome.bulletDescription}
                      >
                        <span className="fw-bold d-block">30+</span>
                        <span className="d-block">Store</span>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={4} md={4} sm={4} xs={4}>
                    <Row className={`${stylesHome.cardContentCenter} h-100`}>
                      <Col lg={2} md={3} sm={4} xs={5}>
                        <div className={`${stylesHome.yellowBulletBackground}`}>
                          <img
                            src="/vector_hati.png"
                            className={`${stylesHome.cardBulletImage} ${stylesHome.heartBulletSize}`}
                          ></img>
                        </div>
                      </Col>
                      <Col
                        lg={2}
                        md={2}
                        sm={2}
                        xs={2}
                        className={stylesHome.bulletDescription}
                      >
                        <span className="fw-bold d-block">30+</span>
                        <span className="d-block">Store</span>
                      </Col>
                    </Row>
                  </Col>
                </div>
              </div>
            </Row>
          </Container>
        </div>
        <Container className={`${stylesHome.secondRow}`}>
          <Row className="pb-5">
            <Col lg={6} md={6} sm={9} xs={12} className={`pb-5`}>
              <img
                src="/35744 1.png"
                className={`img-fluid mx-auto position-relative ${stylesHome.secondRowLeft}`}
              ></img>
            </Col>
            <Col lg={6} md={6} sm={9} xs={12} className={`pb-5`}>
              <div className={`position-relative ${stylesHome.secondRowRight}`}>
                <h2 className={`${stylesHome.secondRowRightHeader} fw-bold`}>
                  We Provide Good Coffee and Healthy Meals
                </h2>
                <p className={stylesHome.secondRowRightParagraph}>
                  You can explore the menu that we provide with fun and have
                  their own taste and make your day better.
                </p>
                <ul className={stylesHome.secondRowRightLists}>
                  <li>High quality beans</li>
                  <li>Healthy meals, you can request the ingredients</li>
                  <li>
                    Chat with our staff to get better experience for ordering
                  </li>
                  <li>
                    Free member card with a minimum purchase of IDR 200.000.
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
        <div className={`${stylesHome.greyBackground} position-relative mt-5`}>
          <Container className="pt-5">
            <Row className="py-5">
              <h2 className="text-center">Here Is People's Favorite</h2>
              <span className="d-block text-center text-wrap">
                Let’s choose and have a bit taste of poeple’s favorite. It might
                be yours too!
              </span>
            </Row>
          </Container>
          <Container className="position-relative">
            <Row
              className={`${stylesHome.gridFavoriteRow} justify-content-center`}
            >
              <Col lg={4} md={4} sm={7} xs={12} className="py-5">
                <div className={`${stylesHome.gridFavoriteCard}`}>
                  <div className={stylesHome.gridFavoriteCardInner}>
                    <img
                      src="/image 22.png"
                      className={stylesHome.gridFavoritePicture}
                    ></img>
                    <div className={`${stylesHome.gridFavoriteDescription} `}>
                      <span className={`d-block text-center`}>
                        Hazelnut Latte
                      </span>
                      <ul className={stylesHome.gridFavoriteDescriptionLists}>
                        <li>Hazelnut Syrup</li>
                        <li>Wanilla Whipped Cream</li>
                        <li>Ice / Hot</li>
                        <li>Sliced Banana on Top</li>
                      </ul>
                    </div>
                    <h5 className={`fw-bold text-center`}>IDR 25.000</h5>
                    <div className="d-flex justify-content-center">
                      <button
                        className={`${stylesHome.gridFavoriteSelectButton}`}
                      >
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={4} md={4} sm={7} xs={12} className="py-5">
                <div className={`${stylesHome.gridFavoriteCard}`}>
                  <img
                    src="/image 27.png"
                    className={stylesHome.gridFavoritePicture}
                  ></img>
                  <div className={`${stylesHome.gridFavoriteDescription} `}>
                    <span className={`d-block text-center`}>Pinky Promise</span>
                    <ul className={stylesHome.gridFavoriteDescriptionLists}>
                      <li>1 Shot of Coffee</li>
                      <li>Wanilla Whipped Cream</li>
                      <li>Chocolate Biscuits</li>
                      <li>Strawberry Syrup</li>
                      <li>Sliced Strawberry on Top</li>
                    </ul>
                  </div>
                  <div className="pb-4">
                    <h5 className={`fw-bold text-center`}>IDR 30.000</h5>
                    <div className="d-flex justify-content-center">
                      <button
                        className={`${stylesHome.gridFavoriteSelectButton}`}
                      >
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={4} md={4} sm={7} xs={12} className="py-5">
                <div className={`${stylesHome.gridFavoriteCard}`}>
                  <img
                    src="/image 30.png"
                    className={stylesHome.gridFavoritePicture}
                  ></img>
                  <div className={`${stylesHome.gridFavoriteDescription} `}>
                    <span className={`d-block text-center`}>Chicken Wings</span>
                    <ul className={stylesHome.gridFavoriteDescriptionLists}>
                      <li>Wings</li>
                      <li>Drum Stick</li>
                      <li>Mayonaise and Lemon</li>
                      <li>Hot Fried</li>
                      <li>Secret Recipe</li>
                      <li>Buy 1 Get 1 for Dine in</li>
                    </ul>
                  </div>
                  <div className="pb-4">
                    <h5 className="fw-bold text-center">IDR 30.000</h5>
                    <div className="d-flex justify-content-center">
                      <button
                        className={`${stylesHome.gridFavoriteSelectButton}`}
                      >
                        Select
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="mt-5">
              <div className="py-5">
                <h2 className="fw-bold text-center">Visit Our Store in the</h2>
                <h2 className="fw-bold text-center">Spot on the Map Below</h2>
              </div>
              <div className="mt-2">
                <span className="d-block text-center">
                  See our store in every city on the spot and spend your good
                  day there. See you soon!
                </span>
              </div>
              <div className="pt-5">
                <img src="/world_map.png" className="img-fluid"></img>
              </div>
            </Row>
            <Row className="mt-5">
              <h2 className="fw-bold text-center">
                Loved by Thousands of Happy Customer
              </h2>
              <span className="d-block text-center mt-2">
                These are the stories of our customers who have visited us with
                great pleasure.
              </span>
            </Row>
            <Row>
              <Col lg={4} md={4} sm={12} xs={12} className="pt-3">
                <Card className={stylesHome.testimonyCard}>
                  <div className="p-3">
                    <Row>
                      <Col>
                        <img src="/viezh.png"></img>
                      </Col>
                      <Col xs={6}>
                        <span className="d-block fw-bold text-wrap">
                          Viezh Robert
                        </span>
                        <span>Warsaw, Poland</span>
                      </Col>
                      <Col xs={3}>
                        <span>
                          4.5 <img src="/Vector (1).png" className="mx-2"></img>
                        </span>
                      </Col>
                    </Row>
                    <Row className="pt-3">
                      <span>
                        “Wow... I am very happy to spend my whole day here. the
                        Wi-fi is good, and the coffee and meals tho. I like it
                        here!! Very recommended!"
                      </span>
                    </Row>
                  </div>
                </Card>
              </Col>
              <Col lg={4} md={4} sm={12} xs={12} className="pt-3">
                <Card className={stylesHome.testimonyCard}>
                  <div className="p-3">
                    <Row>
                      <Col>
                        <img src="/viezh.png"></img>
                      </Col>
                      <Col xs={6}>
                        <span className="d-block fw-bold text-wrap">
                          Yessica Christy
                        </span>
                        <span>Shanxi, China</span>
                      </Col>
                      <Col xs={3}>
                        <span>
                          4.5 <img src="/Vector (1).png" className="mx-2"></img>
                        </span>
                      </Col>
                    </Row>
                    <Row className="pt-3">
                      <span>
                        “I like it because I like to travel far and still can
                        make my day better just by drinking their Hazelnut
                        Latte"
                      </span>
                    </Row>
                  </div>
                </Card>
              </Col>
              <Col lg={4} md={4} sm={12} xs={12} className="pt-3">
                <Card className={stylesHome.testimonyCard}>
                  <div className="p-3">
                    <Row>
                      <Col>
                        <img src="/kim_young.png"></img>
                      </Col>
                      <Col xs={6}>
                        <span className="d-block fw-bold text-wrap">
                          Kim Young Jou
                        </span>
                        <span>Seoul, South Korea</span>
                      </Col>
                      <Col xs={3}>
                        <span>
                          4.5 <img src="/Vector (1).png" className="mx-2"></img>
                        </span>
                      </Col>
                    </Row>
                    <Row className="pt-3">
                      <span>
                        “This is very unusual for my taste, I haven’t liked
                        coffee before but their coffee is the best! and yup, you
                        have to order the chicken wings, the best in town!"
                      </span>
                    </Row>
                  </div>
                </Card>
              </Col>
            </Row>
            <div
              className={`container position-absolute ${stylesHome.footerCardBackground}`}
            >
              <div className={`${stylesHome.headerCardRow} row py-4`}>
                <Container>
                  <Row className="h-100">
                    <Col>
                      <h2 className="fw-bold">Check our promo today</h2>
                      <span className="d-block">
                        Let's see the deals and pick up yours
                      </span>
                    </Col>
                    <Col className="my-auto">
                      <button
                        className={`${stylesHome.yellowButton} float-end`}
                      >
                        <span className="fw-bold">See Promo</span>
                      </button>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
          </Container>
          <div className={stylesHome.footerSpacing}>
            <Footer />
          </div>
        </div>
      </Layout>
    </>
  );
}
