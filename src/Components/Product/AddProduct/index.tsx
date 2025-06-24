import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import CommonCardHeader from "@/CoreComponents/CommonCardHeader";
import CommonFileUpload from "@/CoreComponents/CommonFileUpload";
import { AddProductSchema } from "@/Utils/ValidationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { Fragment } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { Controller, useForm } from "react-hook-form";
import { Button, Card, CardBody, Col, Form, Label, Row } from "reactstrap";

const AddProductContainer = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddProductSchema),
  });

  const onSubmit = (data: any) => {
    const normalizedTags = (data.tags || []).map((tag: any) => (typeof tag === "string" ? tag : tag.label));

    const finalData = {
      ...data,
      tags: normalizedTags,
    };

    console.log("Final Form Data:", finalData);
  };

  return (
    <Fragment>
      <Breadcrumbs mainTitle="Add Product" parent="Product" />
      <Row>
        <Col sm="12">
          <Card>
            <CommonCardHeader title="Add Product" />
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
                          <option>
                            Select Category
                          </option>
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
                          <option >
                            Select Sub Category
                          </option>
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                        </select>
                        {errors.subCategory && <p className="text-danger">{errors.subCategory.message}</p>}
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="input-box">
                        <Label>Tags</Label>
                        <Controller name="tags" control={control} render={({ field }) => <Typeahead {...field} multiple id="tags-typeahead" options={[]} onChange={(selected) => field.onChange(selected)} selected={field.value || []} placeholder="Add tags" allowNew newSelectionPrefix="Add a new tag: " labelKey={(option) => (typeof option === "string" ? option : option.label)} />} />
                        {errors.tags && <p className="text-danger">{errors.tags.message}</p>}
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="input-box">
                        <Label>color</Label>
                        <Controller name="color" control={control} render={({ field }) => <Typeahead {...field} multiple id="color-typeahead" options={[]} onChange={(selected) => field.onChange(selected)} selected={field.value || []} placeholder="Add color" allowNew newSelectionPrefix="Add a new tag: " labelKey={(option) => (typeof option === "string" ? option : option.label)} />} />
                        {errors.color && <p className="text-danger">{errors.color.message}</p>}
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="input-box">
                        <Label>size</Label>
                        <Controller name="size" control={control} render={({ field }) => <Typeahead {...field} multiple id="size-typeahead" options={[]} onChange={(selected) => field.onChange(selected)} selected={field.value || []} placeholder="Add size" allowNew newSelectionPrefix="Add a new tag: " labelKey={(option) => (typeof option === "string" ? option : option.label)} />} />
                        {errors.size && <p className="text-danger">{errors.size.message}</p>}
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="input-box">
                        <Label>material</Label>
                        <Controller name="material" control={control} render={({ field }) => <Typeahead {...field} multiple id="material-typeahead" options={[]} onChange={(selected) => field.onChange(selected)} selected={field.value || []} placeholder="Add material" allowNew newSelectionPrefix="Add a new tag: " labelKey={(option) => (typeof option === "string" ? option : option.label)} />} />
                        {errors.material && <p className="text-danger">{errors.material.message}</p>}
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="input-box">
                        <Label>fabric</Label>
                        <Controller name="fabric" control={control} render={({ field }) => <Typeahead {...field} multiple id="fabric-typeahead" options={[]} onChange={(selected) => field.onChange(selected)} selected={field.value || []} placeholder="Add fabric" allowNew newSelectionPrefix="Add a new tag: " labelKey={(option) => (typeof option === "string" ? option : option.label)} />} />
                        {errors.fabric && <p className="text-danger">{errors.fabric.message}</p>}
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="input-box">
                        <Label>occasion</Label>
                        <Controller name="occasion" control={control} render={({ field }) => <Typeahead {...field} multiple id="occasion-typeahead" options={[]} onChange={(selected) => field.onChange(selected)} selected={field.value || []} placeholder="Add occasion" allowNew newSelectionPrefix="Add a new tag: " labelKey={(option) => (typeof option === "string" ? option : option.label)} />} />
                        {errors.occasion && <p className="text-danger">{errors.occasion.message}</p>}
                      </div>
                    </Col>

                    <Col md="12" className="custom-dropzone-project input-box">
                      <div className="mb-3">
                        <Label>Upload Image</Label>
                        <CommonFileUpload multiple />
                      </div>
                    </Col>
                    <Col md="12" lg="10" xl="8">
                      <Row>
                        <Col sm="6" md="3">
                          <div className="input-box">
                            <div className="d-flex ">
                              <Label className="col-form-label m-r-10">New Arrival</Label>
                              <div className="text-end switch-sm">
                                <Label className="switch">
                                  <input type="checkbox" defaultChecked />
                                  <span className="switch-state"></span>
                                </Label>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col sm="6" md="3">
                          <div className="input-box">
                            <div className="d-flex">
                              <Label className="col-form-label m-r-10">Best Selling</Label>
                              <div className="text-end switch-sm">
                                <Label className="switch">
                                  <input type="checkbox" defaultChecked />
                                  <span className="switch-state"></span>
                                </Label>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col sm="6" md="3">
                          <div className="input-box">
                            <div className="d-flex">
                              <Label className="col-form-label m-r-10">Featured</Label>
                              <div className="text-end switch-sm">
                                <Label className="switch">
                                  <input type="checkbox" defaultChecked />
                                  <span className="switch-state"></span>
                                </Label>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col sm="6" md="3">
                          <div className="input-box">
                            <div className="d-flex">
                              <Label className="col-form-label m-r-10">Show On Homepage</Label>
                              <div className="text-end switch-sm">
                                <Label className="switch">
                                  <input type="checkbox" defaultChecked />
                                  <span className="switch-state"></span>
                                </Label>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
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

export default AddProductContainer;
