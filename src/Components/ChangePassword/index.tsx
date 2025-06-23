import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import CommonCardHeader from "@/CoreComponents/CommonCardHeader";
import { ChangePasswordSchema } from "@/Utils/ValidationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { Button, Card, CardBody, Col, Container, Form, Label, Row } from "reactstrap";

const ChangePasswordContainer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ChangePasswordSchema),
  });

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Change Password" parent="Pages" />
      <Container fluid>
        <Col md="12">
          <Card>
            <CommonCardHeader title="Change Password" />
            <CardBody>
              <div className="input-items">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row className="gy-3">
                    <Col md="12">
                      <div className="input-box">
                        <Label>Email</Label>
                        <input type="email" {...register("email")} placeholder="Enter your email" />
                        {errors.email && <p className="text-danger">{errors.email.message}</p>}
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="input-box">
                        <Label>Old Password</Label>
                        <input type="password" {...register("oldPassword")} placeholder="Enter old password" />
                        {errors.oldPassword && <p className="text-danger">{errors.oldPassword.message}</p>}
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="input-box">
                        <Label>New Password</Label>
                        <input type="password" {...register("newPassword")} placeholder="Enter new password" />
                        {errors.newPassword && <p className="text-danger">{errors.newPassword.message}</p>}
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

export default ChangePasswordContainer;
