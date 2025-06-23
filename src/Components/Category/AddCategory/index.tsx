import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import CommonCardHeader from "@/CoreComponents/CommonCardHeader";
import CommonFileUpload from "@/CoreComponents/CommonFileUpload";
import { AddCategorySchema } from "@/Utils/ValidationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { Button, Card, CardBody, Col, Form, Label, Row } from "reactstrap";

const AddCategoryContainer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddCategorySchema),
  });

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
  };

  return (
    <Fragment>
      <Breadcrumbs mainTitle="Add Category" parent="Product" />
      <Row>
        <Col sm="12">
          <Card>
            <CommonCardHeader title="Add Category" />
            <CardBody>
              <div className="input-items">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row className="gy-3">
                    <Col md="6">
                      <div className="input-box">
                        <Label>Product Name</Label>
                        <input id="name" type="text" placeholder="Product name" {...register("name")} />
                        {errors.name && <p className="text-danger">{errors.name.message}</p>}
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="input-box">
                        <Label>Project Title</Label>
                        <input type="text" placeholder="ProjectTitlePlaceholder" {...register("title")} />
                        {errors.title && <p className="text-danger">{errors.title.message}</p>}
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

                    <Col className="custom-dropzone-project input-box">
                      <div className="mb-3">
                        <Label>Upload Image</Label>
                        <CommonFileUpload multiple />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="text-center">
                        <Button type="submit" color="primary">
                          Save Product
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default AddCategoryContainer;
