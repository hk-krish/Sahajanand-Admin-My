import { Href } from "@/Constant";
import { SearchFunctionProps } from "@/Types/CoreComponents";
import Link from "next/link";
import { FC, FormEvent } from "react";
import { Button, Col, Form, Input, Row } from "reactstrap";

const SearchFunction: FC<SearchFunctionProps> = ({ btnTitle, btnLink, openModal ,setSearchData}) => {

  return (
    <div className="feature-products">
      <Row>
        <Col md="10">
          <Form>
            <div className="form-group m-0">
              <Input type="text" placeholder="Search" onChange={(e) => setSearchData?.(e.target.value)} />
              <i className="fa fa-search" />
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
