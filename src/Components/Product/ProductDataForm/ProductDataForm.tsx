import { Post } from "@/Api";
import { RouteList, Url_Keys } from "@/Constant";
import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import CommonCardHeader from "@/CoreComponents/CommonCardHeader";
import CommonFileUpload from "@/CoreComponents/CommonFileUpload";
import CustomCheckbox from "@/CoreComponents/CustomCheckbox";
import CustomTypeahead from "@/CoreComponents/CustomTypeahead";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { fetchCategoryApiData } from "@/ReduxToolkit/Slice/ProductSlice";
import { ProductFormData, SelectOption } from "@/Types/Product";
import { AddProductSchema } from "@/Utils/ValidationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { FC, Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Card, CardBody, Col, Form, Label, Row } from "reactstrap";

const ProductDataForm: FC<{ action: string }> = ({ action = "Add" }) => {
  const [photo, setPhoto] = useState<string | string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const { allCategory, singleEditingProduct } = useAppSelector((state) => state.product);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddProductSchema),
  });

  useEffect(() => {
    if (singleEditingProduct && action === "Edit") {
      setValue("name", singleEditingProduct.name);
      setValue("slug", singleEditingProduct.slug);
      setValue("description", singleEditingProduct.description);
      setValue("price", singleEditingProduct.price);
      setValue("salePrice", singleEditingProduct.salePrice);
      setValue("sku", singleEditingProduct.sku);
      setValue("categoryId", singleEditingProduct.categoryId);
      setValue("subCategoryId", singleEditingProduct.subCategoryId);
      setValue("tags", singleEditingProduct.tags);
      setValue("color", singleEditingProduct.attributes.color);
      setValue("size", singleEditingProduct.attributes.size);
      setValue("material", singleEditingProduct.attributes.material);
      setValue("fabric", singleEditingProduct.attributes.fabric);
      setValue("occasion", singleEditingProduct.attributes.occasion);
      setValue("stock", singleEditingProduct.stock);
      setValue("isFeatured", singleEditingProduct.isFeatured);
      if (singleEditingProduct.images) {
        setValue("image", [singleEditingProduct.images]);
        setPhoto(singleEditingProduct.images);
        if (Array.isArray(singleEditingProduct.images)) {
          setUploadedFiles(
            singleEditingProduct.images.map((img) => ({
              name: img,
              preview: img,
            }))
          );
        }
      }
    }
  }, [action, setValue, singleEditingProduct]);

  const onSubmit = async (data: ProductFormData) => {
    const normalizeTags = (items: SelectOption[] = []) => items.map((item) => (typeof item === "string" ? item : item.label));
    const Product = {
      name: data.name,
      slug: data.slug,
      description: data.description,
      price: data.price,
      salePrice: data.salePrice,
      sku: data.sku,
      images: photo,
      categoryId: data.categoryId,
      subCategoryId: data.subCategoryId,
      tags: normalizeTags(data.tags),
      attributes: {
        color: normalizeTags(data.color),
        size: normalizeTags(data.size),
        material: normalizeTags(data.material),
        fabric: normalizeTags(data.fabric),
        occasion: normalizeTags(data.occasion),
      },
      stock: data.stock,
      isNewArrival: data.isNewArrival,
      isBestSelling: data.isBestSelling,
      isFeatured: data.isFeatured,
      showOnHomepage: data.showOnHomepage,
    };
    try {
      const response = action === "Edit" ? await Post(Url_Keys.Product.Edit, { productId: singleEditingProduct._id, ...Product }) : await Post(Url_Keys.Product.Add, Product);
      if (response?.status === 200) {
        reset();
        setPhoto([]);
        setUploadedFiles([]);
        router.push(RouteList.Product.Product);
      }
    } catch (error) {}
  };

  useEffect(() => {
    dispatch(fetchCategoryApiData({}));
  }, [dispatch]);

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
                        <select className="form-select" {...register("categoryId")}>
                          <option>Select Category</option>
                          {allCategory?.category_data?.map((category, index) => (
                            <option value={category?._id} key={index}>
                              {category?.name}
                            </option>
                          ))}
                        </select>
                        {errors.categoryId && <p className="text-danger">{errors.categoryId.message}</p>}
                      </div>
                    </Col>

                    <Col sm="6" md="4" lg="3" xl="2">
                      <div className="input-box">
                        <Label>Sub Category</Label>
                        <select className="form-select" {...register("subCategoryId")}>
                          <option>Select Sub Category</option>
                          {allCategory?.category_data?.map((category, index) => (
                            <option value={category?._id} key={index}>
                              {category?.name}
                            </option>
                          ))}
                        </select>
                        {errors.subCategoryId && <p className="text-danger">{errors.subCategoryId.message}</p>}
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
