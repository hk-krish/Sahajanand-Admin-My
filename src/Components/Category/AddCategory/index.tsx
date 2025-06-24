import { Post } from "@/Api";
import { Url_Keys } from "@/Constant";
import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import CommonCardHeader from "@/CoreComponents/CommonCardHeader";
import CommonFileUpload from "@/CoreComponents/CommonFileUpload";
import { AddCategorySchema } from "@/Utils/ValidationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Card, CardBody, Col, Form, Label, Row } from "reactstrap";

const AddCategoryContainer = () => {
  const [photo, setPhoto] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddCategorySchema),
  });

  const onSubmit = async (data: any) => {
    const Category = {
      name: data.name,
      slug: data.slug,
      description: data.description,
      isFeatured: data.isFeatured,
      image: photo,
    };
    try {
      const response = await Post(Url_Keys.Category.Add, Category);
      if (response?.status === 200) {
        reset();
        setPhoto("");
        setUploadedFiles([]);
      }
    } catch (error) {}
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
                        <Label>Category Name</Label>
                        <input id="name" type="text" placeholder="Category Name" {...register("name")} />
                        {errors.name && <p className="text-danger">{errors.name.message}</p>}
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="input-box">
                        <Label>Slug</Label>
                        <input type="text" placeholder="Slug" {...register("slug")} />
                        {errors.slug && <p className="text-danger">{errors.slug.message}</p>}
                      </div>
                    </Col>

                    <Col md="12">
                      <div className="input-box">
                        <Label>Description</Label>
                        <textarea placeholder="Description" {...register("description")} />
                        {errors.description && <p className="text-danger">{errors.description.message}</p>}
                      </div>
                    </Col>
                    <Col md="12" className="custom-dropzone-project input-box">
                      <div className="mb-3">
                        <Label>Upload Image</Label>
                        <CommonFileUpload register={register} errors={errors} setValue={setValue} setPhoto={setPhoto} uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} />
                      </div>
                    </Col>
                    <Col sm="6" md="3">
                      <div className="input-box">
                        <div className="d-flex">
                          <Label className="col-form-label m-r-10">Featured</Label>
                          <div className="text-end switch-sm">
                            <Label className="switch">
                              <input type="checkbox" {...register("isFeatured")} />
                              <span className="switch-state" />
                            </Label>
                          </div>
                        </div>
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
