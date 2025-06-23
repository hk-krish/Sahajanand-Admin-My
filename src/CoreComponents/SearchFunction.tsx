import { Href } from "@/Constant";
import Link from "next/link";
import { FC } from "react";
import { Button, Col, Form, Input, Row } from "reactstrap";

interface SearchFunctionProps {
  btnTitle: string;
  btnLink?: string;
  openModal?: () => void;
}

const SearchFunction: FC<SearchFunctionProps> = ({ btnTitle, btnLink, openModal }) => {
  return (
    <div className="feature-products">
      <Row>
        <Col md="10">
          <Form>
            <div className="form-group m-0">
              <Input type="text" placeholder={"Search"} />
              <i className="fa fa-search"></i>
            </div>
          </Form>
        </Col>
        <Col md="2" sm="12">
          <Form>
            <div className="form-group">
              {openModal ? (
                <Button color="primary" className="w-100" onClick={openModal}>
                  {btnTitle}
                </Button>
              ) : (
                <Link href={btnLink || Href}>
                  <Button color="primary" className="w-100">
                    {btnTitle}
                  </Button>
                </Link>
              )}
            </div>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default SearchFunction;
