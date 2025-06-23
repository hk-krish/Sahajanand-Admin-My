import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import CommonCardHeader from "@/CoreComponents/CommonCardHeader";
import { SettingSchema } from "@/Utils/ValidationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { Facebook, Instagram, Snapchat, Xrp } from "iconsax-react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Card, CardBody, Col, Container, Form, InputGroup, InputGroupText, Label, Row } from "reactstrap";

const SettingContainer = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("Facebook");

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SettingSchema),
  });

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Setting" parent="Pages" />
      <Container fluid>
        <Col md="12">
          <Card>
            <CommonCardHeader title="Setting" />
            <CardBody>
              <div className="input-items">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row className="gy-3">
                    <Col md="6">
                      <div className="input-box">
                        <Label>Name</Label>
                        <input id="name" type="text" placeholder="Product name" {...register("name")} />
                        {errors.name && <p className="text-danger">{errors.name.message}</p>}
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="input-box">
                        <Label>Mobile Number</Label>
                        <input type="text" placeholder="ProjectTitlePlaceholder" {...register("mobileNumber")} />
                        {errors.mobileNumber && <p className="text-danger">{errors.mobileNumber.message}</p>}
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="input-box">
                        <Label>Client Name</Label>
                        <input type="text" placeholder="ClientNamePlaceholder" {...register("client")} />
                        {errors.client && <p className="text-danger">{errors.client.message}</p>}
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="input-box">
                        <Label>Project Progress (%)</Label>
                        <select className="form-select" {...register("progress")}>
                          <option disabled>Static Menu</option>
                          <option>Simple</option>
                          <option>Classified</option>
                        </select>
                        {errors.progress && <p className="text-danger">{errors.progress.message}</p>}
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="input-box">
                        <Label>Facebook</Label>
                        <InputGroup>
                          <InputGroupText className="list-light-primary">
                            <Facebook />
                          </InputGroupText>
                          <input type="text" placeholder="Facebook" />
                        </InputGroup>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="input-box">
                        <Label>Instagram</Label>
                        <InputGroup>
                          <InputGroupText className="list-light-primary">
                            <Instagram />
                          </InputGroupText>
                          <input type="text" placeholder="Instagram" />
                        </InputGroup>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="input-box">
                        <Label>Snapchat</Label>
                        <InputGroup>
                          <InputGroupText className="list-light-primary">
                            <Snapchat />
                          </InputGroupText>
                          <input type="text" placeholder="Snapchat" />
                        </InputGroup>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="input-box">
                        <Label>Xrp</Label>
                        <InputGroup>
                          <InputGroupText className="list-light-primary">
                            <Xrp />
                          </InputGroupText>
                          <input type="text" placeholder="Xrp" />
                        </InputGroup>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="text-center mt-4">
                        <Button type="submit" color="primary">
                          Submit
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Container>
    </Fragment>
  );
};

export default SettingContainer;
