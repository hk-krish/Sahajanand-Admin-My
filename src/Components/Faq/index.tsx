import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import CommonCardHeader from "@/CoreComponents/CommonCardHeader";
import { useAppDispatch } from "@/ReduxToolkit/Hooks";
import { setAddFaqModal } from "@/ReduxToolkit/Slice/FaqSlice";
import { Add, ArrowDown2, ArrowUp2, Edit, Minus, Trash } from "iconsax-react";
import { Fragment, useState } from "react";
import { Button, Card, CardBody, CardHeader, Col, Collapse, Container } from "reactstrap";
import AddSalesmanModal from "./AddFaqModal";

const FaqContainer = () => {
  const [searchData, setSearchData] = useState("");
  const [isActivity, setIsActivity] = useState(false);
  const handelChange = () => setIsActivity(!isActivity);
  const dispatch = useAppDispatch();

  const AddSalesmanModalClick = () => dispatch(setAddFaqModal());
  return (
    <Fragment>
      <Breadcrumbs mainTitle="FAQ" parent="Pages" />
      <Container fluid>
        <Col md="12">
          <Card>
            <CommonCardHeader Search={setSearchData} btnTitle="Add Faq" btnClick={AddSalesmanModalClick} />
            <CardBody>
              <div className="default-according style-1">
                <Col xl="12" className="input-items">
                  <Card>
                    <CardHeader>
                      <h2 className="mb-0">
                        <Button color="transparent" className="btn-link collapsed justify-content-between" onClick={handelChange}>
                          <span className="d-flex align-items-center justify-content-between gap-2">
                            item.title
                            <div className="d-flex align-items-center">
                              <div className="faq-hover">
                                <Trash size="22" />
                                <Edit size="22" />
                              </div>
                              {isActivity ? <ArrowUp2 size="20" /> : <ArrowDown2 size="20" />}
                            </div>
                          </span>
                        </Button>
                      </h2>
                    </CardHeader>
                    <Collapse isOpen={isActivity}>
                      <CardBody>item.paragraph</CardBody>
                    </Collapse>
                  </Card>
                  <Card>
                    <CardHeader>
                      <h2 className="mb-0">
                        <Button color="transparent" className="btn-link collapsed justify-content-between" onClick={handelChange}>
                          <span className="d-flex align-items-center justify-content-between gap-2">
                            item.title
                            {isActivity ? <Minus size="20" /> : <Add size="20" />}
                          </span>
                        </Button>
                      </h2>
                    </CardHeader>
                    <Collapse isOpen={isActivity}>
                      <CardBody>item.paragraph</CardBody>
                    </Collapse>
                  </Card>
                  <AddSalesmanModal />
                </Col>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Container>
    </Fragment>
  );
};

export default FaqContainer;
