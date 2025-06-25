import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import CommonCardHeader from "@/CoreComponents/CommonCardHeader";
import CommonFileUpload from "@/CoreComponents/CommonFileUpload";
import CustomCheckbox from "@/CoreComponents/CustomCheckbox";
import CustomTypeahead from "@/CoreComponents/CustomTypeahead";
import { AddProductSchema } from "@/Utils/ValidationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Card, CardBody, Col, Form, Label, Row } from "reactstrap";

const ProductDataForm: FC<{ action: string }> = ({ action = "Add" }) => {
  const [photo, setPhoto] = useState<any>([]);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddProductSchema),
  });

  const onSubmit = (data: any) => {
     const Product = {
      name: data.name,
      slug: data.slug,
      description: data.description,
      price:data.price,
      salePrice:data.salePrice,
      sku:data.sku,
      categoryId:data.categoryId,
      subCategoryId:data.subCategoryId,
      tags:data.tags,
      attributes:{

      },
      stock:data.stock,
      isNewArrival:data.isNewArrival,
      isBestSelling:data.isBestSelling,
      showOnHomepage:data.showOnHomepage,
      isFeatured: data.isFeatured,
      image: photo,
    };
    // const normalizedTags = (data.tags || []).map((tag: any) => (typeof tag === "string" ? tag : tag.label));

    // const finalData = {
    //   ...data,
    //   tags: normalizedTags,
    //   image:photo
    // };

    console.log("Final Form Data:", Product);
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
                        <Label>Product Name</Label>
                        <input id="name" type="text" placeholder="Product name" {...register("name")} />
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

                    <Col sm="6" md="4" lg="3" xl="2">
                      <div className="input-box">
                        <Label>Price</Label>
                        <input type="number" placeholder="Price" {...register("price")} />
                        {errors.price && <p className="text-danger">{errors.price.message}</p>}
                      </div>
                    </Col>

                    <Col sm="6" md="4" lg="3" xl="2">
                      <div className="input-box">
                        <Label>Sale Price</Label>
                        <input type="number" placeholder="Sale Price" {...register("salePrice")} />
                        {errors.salePrice && <p className="text-danger">{errors.salePrice.message}</p>}
                      </div>
                    </Col>

                    <Col sm="6" md="4" lg="3" xl="2">
                      <div className="input-box">
                        <Label>SKU</Label>
                        <input type="text" placeholder="SKU" {...register("sku")} />
                        {errors.sku && <p className="text-danger">{errors.sku.message}</p>}
                      </div>
                    </Col>

                    <Col sm="6" md="4" lg="3" xl="2">
                      <div className="input-box">
                        <Label>Stock</Label>
                        <input type="number" placeholder="Stock" {...register("stock")} />
                        {errors.stock && <p className="text-danger">{errors.stock.message}</p>}
                      </div>
                    </Col>

                    <Col sm="6" md="4" lg="3" xl="2">
                      <div className="input-box">
                        <Label>Category</Label>
                        <select className="form-select" {...register("category")}>
                          <option>Select Category</option>
                          <option value="simple">Simple</option>
                          <option value="classified">Classified</option>
                        </select>
                        {errors.category && <p className="text-danger">{errors.category.message}</p>}
                      </div>
                    </Col>

                    <Col sm="6" md="4" lg="3" xl="2">
                      <div className="input-box">
                        <Label>Sub Category</Label>
                        <select className="form-select" {...register("subCategory")}>
                          <option>Select Sub Category</option>
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                        </select>
                        {errors.subCategory && <p className="text-danger">{errors.subCategory.message}</p>}
                      </div>
                    </Col>

                    <CustomTypeahead control={control} errors={errors.tags} title="tags" />
                    <CustomTypeahead control={control} errors={errors.color} title="color" />
                    <CustomTypeahead control={control} errors={errors.size} title="size" />
                    <CustomTypeahead control={control} errors={errors.material} title="material" />
                    <CustomTypeahead control={control} errors={errors.fabric} title="fabric" />
                    <CustomTypeahead control={control} errors={errors.occasion} title="occasion" />

                    <Col md="12" className="custom-dropzone-project input-box">
                      <div className="mb-3">
                        <Label>Upload Image</Label>
                        <CommonFileUpload multiple register={register} errors={errors} setValue={setValue} setPhoto={setPhoto} photo={photo} uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} />
                      </div>
                    </Col>
                    <Col md="12" lg="10" xl="8">
                      <Row>
                        <CustomCheckbox register={register} title="New Arrival" name="isNewArrival" />
                        <CustomCheckbox register={register} title="Best Selling" name="isBestSelling" />
                        <CustomCheckbox register={register} title="Featured" name="isFeatured" />
                        <CustomCheckbox register={register} title="Show On Homepage" name="showOnHomepage" />
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="text-center">
                        <Button type="submit" color="primary">
                          {`${action} Product`}
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

export default ProductDataForm;
