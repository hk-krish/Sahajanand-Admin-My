import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import CommonCardHeader from "@/CoreComponents/CommonCardHeader";
import CommonFileUpload from "@/CoreComponents/CommonFileUpload";
import CustomCheckbox from "@/CoreComponents/CustomCheckbox";
import CustomTypeahead from "@/CoreComponents/CustomTypeahead";
import { useAppSelector } from "@/ReduxToolkit/Hooks";
import { AddBlogSchema } from "@/Utils/ValidationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Card, CardBody, Col, Form, Label, Row } from "reactstrap";

const BlogDataForm: FC<{ action: string }> = ({ action = "Add" }) => {
  const [photo, setPhoto] = useState<string | string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const { allCategory, singleEditingProduct } = useAppSelector((state) => state.product);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddBlogSchema),
  });

  const onSubmit = async (data: any) => {
    const Product = {
      name: data.name,
      slug: data.slug,
      description: data.description,
    };
    try {
      console.log(Product);
    } catch (error) {}
  };

  return (
    <Fragment>
      <Breadcrumbs mainTitle={`${action} Product`} parent="Product" />
      <Row>
        <Col sm="12">
          <Card>
            <CommonCardHeader title={`${action} Product`} />
            <CardBody>
              <div className="input-items">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row className="gy-3 justify-content-center">
                    <Col md="6">
                      <div className="input-box">
                        <Label>Title</Label>
                        <input id="name" type="text" placeholder="Product name" {...register("title")} />
                        {errors.title && <p className="text-danger">{errors.title.message}</p>}
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="input-box">
                        <Label>slug</Label>
                        <input type="text" placeholder="Slug" {...register("slug")} />
                        {errors.slug && <p className="text-danger">{errors.slug.message}</p>}
                      </div>
                    </Col>

                    <Col md="12">
                      <div className="input-box">
                        <Label>content</Label>
                        <textarea placeholder="Description" {...register("content")} />
                        {errors.content && <p className="text-danger">{errors.content.message}</p>}
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="input-box">
                        <Label>metaTitle</Label>
                        <input type="text" placeholder="Price" {...register("metaTitle")} />
                        {errors.metaTitle && <p className="text-danger">{errors.metaTitle.message}</p>}
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="input-box">
                        <Label>category</Label>
                        <input type="text" placeholder="SKU" {...register("category")} />
                        {errors.category && <p className="text-danger">{errors.category.message}</p>}
                      </div>
                    </Col>

                    <Col md="12">
                      <div className="input-box">
                        <Label>metaDescription</Label>
                        <textarea placeholder="Description" {...register("metaDescription")} />
                        {errors.metaDescription && <p className="text-danger">{errors.metaDescription.message}</p>}
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="input-box">
                        <Label>status</Label>
                        <input type="text" placeholder="Stock" {...register("status")} />
                        {errors.status && <p className="text-danger">{errors.status.message}</p>}
                      </div>
                    </Col>

                    <Col md="12" className="custom-dropzone-project input-box">
                      <div className="mb-3">
                        <Label>Upload Image</Label>
                        <CommonFileUpload register={register} errors={errors} setValue={setValue} setPhoto={setPhoto} photo={photo} uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="text-center">
                        <Button type="submit" color="primary">
                          Save
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

export default BlogDataForm;
