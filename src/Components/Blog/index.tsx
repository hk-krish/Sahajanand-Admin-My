import { Href, ImagePath } from "@/Constant";
import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import CommonCardHeader from "@/CoreComponents/CommonCardHeader";
import { useAppDispatch } from "@/ReduxToolkit/Hooks";
import RatioImage from "@/Utils/RatioImage";
import { Fragment, useState } from "react";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import AddBlogModal from "./AddBlogModal";
import { setAddBlogModal } from "@/ReduxToolkit/Slice/BlogSlice";
import Link from "next/link";

const BlogContainer = () => {
  const [searchData, setSearchData] = useState("");
  const [isEdit, setEdit] = useState(false);
  const dispatch = useAppDispatch();

  const AddSalesmanModalClick = () => dispatch(setAddBlogModal());
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Blog" parent="Pages" />
      <Container fluid>
        <Col sx="12">
          <Card>
            <CommonCardHeader Search={setSearchData} btnTitle="Add Blog" btnClick={AddSalesmanModalClick} />
            <CardBody>
              <div className="blog-boxes">
                <Row className="g-3">
                  <Col xs="12" sm="6" lg="4" xl="3">
                    <div className="blog-box list-box">
                      <div className="blog-image">
                        <RatioImage className=" img" src={`${ImagePath}product/compare-1.jpg`} alt="blog1" />
                        <div className="product-hover">
                          <ul>
                            {!isEdit ? (
                              <>
                                <li>
                                  <Link href={Href} color="transparent">
                                    <i className="icon icon-trash" />
                                  </Link>
                                </li>
                                <li>
                                  <Link href={Href} color="transparent">
                                    <i className="icon icon-pen" />
                                  </Link>
                                </li>
                              </>
                            ) : (
                              <li>
                                <Link href={Href} color="transparent">
                                  <i className="icon icon-cart2" />
                                </Link>
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                      <div className="blog-details border-0">
                        <h6 className="mt-0">By John in Food</h6>
                        <a href="blog-details.html">
                          <h5>Paradise Taste of Meals</h5>
                        </a>
                        <p>a world of gourmet ingredients and specialty products that will inspire your culinary creativity. From aged balsamic vinegar to truffle-infused oils and imported cheeses, these indulgent treats add a touch of luxury to any meal.</p>
                        <h6>on Mar. 20, 2024 By John</h6>
                      </div>
                    </div>
                  </Col>
                  <Col xs="12" sm="6" lg="4" xl="3">
                    <div className="blog-box list-box">
                      <div className="blog-image">
                        <div>
                          <RatioImage className=" img" src={`${ImagePath}product/compare-2.jpg`} alt="blog1" />
                        </div>
                      </div>
                      <div className="blog-details border-0">
                        <h6 className="mt-0">By John in Food</h6>
                        <a href="blog-details.html">
                          <h5>Paradise Taste of Meals</h5>
                        </a>
                        <p>a world of gourmet ingredients and specialty products that will inspire your culinary creativity. From aged balsamic vinegar to truffle-infused oils and imported cheeses, these indulgent treats add a touch of luxury to any meal.</p>
                        <h6>on Mar. 20, 2024 By John</h6>
                      </div>
                    </div>
                  </Col>
                  <Col xs="12" sm="6" lg="4" xl="3">
                    <div className="blog-box list-box">
                      <div className="blog-image">
                        <div>
                          <RatioImage className=" img" src={`${ImagePath}product/compare-3.jpg`} alt="blog1" />
                        </div>
                      </div>
                      <div className="blog-details border-0">
                        <h6 className="mt-0">By John in Food</h6>
                        <a href="blog-details.html">
                          <h5>Paradise Taste of Meals</h5>
                        </a>
                        <p>a world of gourmet ingredients and specialty products that will inspire your culinary creativity. From aged balsamic vinegar to truffle-infused oils and imported cheeses, these indulgent treats add a touch of luxury to any meal.</p>
                        <h6>on Mar. 20, 2024 By John</h6>
                      </div>
                    </div>
                  </Col>
                  <Col xs="12" sm="6" lg="4" xl="3">
                    <div className="blog-box list-box">
                      <div className="blog-image">
                        <div>
                          <RatioImage className=" img" src={`${ImagePath}product/compare-4.jpg`} alt="blog1" />
                        </div>
                      </div>
                      <div className="blog-details border-0">
                        <h6 className="mt-0">By John in Food</h6>
                        <a href="blog-details.html">
                          <h5>Paradise Taste of Meals</h5>
                        </a>
                        <p>a world of gourmet ingredients and specialty products that will inspire your culinary creativity. From aged balsamic vinegar to truffle-infused oils and imported cheeses, these indulgent treats add a touch of luxury to any meal.</p>
                        <h6>on Mar. 20, 2024 By John</h6>
                      </div>
                    </div>
                  </Col>
                  <Col xs="12" sm="6" lg="4" xl="3">
                    <div className="blog-box list-box">
                      <div className="blog-image">
                        <div>
                          <RatioImage className=" img" src={`${ImagePath}product/compare-1.jpg`} alt="blog1" />
                        </div>
                      </div>
                      <div className="blog-details border-0">
                        <h6 className="mt-0">By John in Food</h6>
                        <a href="blog-details.html">
                          <h5>Paradise Taste of Meals</h5>
                        </a>
                        <p>a world of gourmet ingredients and specialty products that will inspire your culinary creativity. From aged balsamic vinegar to truffle-infused oils and imported cheeses, these indulgent treats add a touch of luxury to any meal.</p>
                        <h6>on Mar. 20, 2024 By John</h6>
                      </div>
                    </div>
                  </Col>
                  <Col xs="12" sm="6" lg="4" xl="3">
                    <div className="blog-box list-box">
                      <div className="blog-image">
                        <div>
                          <RatioImage className=" img" src={`${ImagePath}product/compare-2.jpg`} alt="blog1" />
                        </div>
                      </div>
                      <div className="blog-details border-0">
                        <h6 className="mt-0">By John in Food</h6>
                        <a href="blog-details.html">
                          <h5>Paradise Taste of Meals</h5>
                        </a>
                        <p>a world of gourmet ingredients and specialty products that will inspire your culinary creativity. From aged balsamic vinegar to truffle-infused oils and imported cheeses, these indulgent treats add a touch of luxury to any meal.</p>
                        <h6>on Mar. 20, 2024 By John</h6>
                      </div>
                    </div>
                  </Col>
                  <Col xs="12" sm="6" lg="4" xl="3">
                    <div className="blog-box list-box">
                      <div className="blog-image">
                        <div>
                          <RatioImage className=" img" src={`${ImagePath}product/compare-3.jpg`} alt="blog1" />
                        </div>
                      </div>
                      <div className="blog-details border-0">
                        <h6 className="mt-0">By John in Food</h6>
                        <a href="blog-details.html">
                          <h5>Paradise Taste of Meals</h5>
                        </a>
                        <p>a world of gourmet ingredients and specialty products that will inspire your culinary creativity. From aged balsamic vinegar to truffle-infused oils and imported cheeses, these indulgent treats add a touch of luxury to any meal.</p>
                        <h6>on Mar. 20, 2024 By John</h6>
                      </div>
                    </div>
                  </Col>
                  <Col xs="12" sm="6" lg="4" xl="3">
                    <div className="blog-box list-box">
                      <div className="blog-image">
                        <div>
                          <RatioImage className=" img" src={`${ImagePath}product/compare-4.jpg`} alt="blog1" />
                        </div>
                      </div>
                      <div className="blog-details border-0">
                        <h6 className="mt-0">By John in Food</h6>
                        <a href="blog-details.html">
                          <h5>Paradise Taste of Meals</h5>
                        </a>
                        <p>a world of gourmet ingredients and specialty products that will inspire your culinary creativity. From aged balsamic vinegar to truffle-infused oils and imported cheeses, these indulgent treats add a touch of luxury to any meal.</p>
                        <h6>on Mar. 20, 2024 By John</h6>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Container>
      <AddBlogModal />
    </Fragment>
  );
};

export default BlogContainer;
