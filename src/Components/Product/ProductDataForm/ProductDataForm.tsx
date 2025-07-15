import { Post } from "@/Api";
import { RouteList, Url_Keys } from "@/Constant";
import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import CommonCardHeader from "@/CoreComponents/CommonCardHeader";
import CommonImageUpload from "@/CoreComponents/CommonImageUpload";
import CustomCheckbox from "@/CoreComponents/CustomCheckbox";
import CustomTypeahead from "@/CoreComponents/CustomTypeahead";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { fetchColorApiData, fetchFabricApiData, fetchMaterialApiData, fetchOccasionApiData, fetchSizeApiData } from "@/ReduxToolkit/Slice/AttributeSlice";
import { fetchCategoryApiData, fetchUniqueCategoryApiData } from "@/ReduxToolkit/Slice/ProductSlice";
import { ProductFormData, SelectOption } from "@/Types/Product";
import { generateOptions } from "@/Utils";
import { AddProductSchema } from "@/Utils/ValidationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { FC, Fragment, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Card, CardBody, Col, Form, Label, Row } from "reactstrap";

const ProductDataForm: FC<{ action: string }> = ({ action = "Add" }) => {
  const [photo, setPhoto] = useState<string[]>([]);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { allCategory, singleEditingProduct, allUniqueCategory } = useAppSelector((state) => state.product);
  const { allSize, allColor, allFabric, allMaterial, allOccasion } = useAppSelector((state) => state.attribute);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    trigger,
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
      setValue("uniqueCategoryId", singleEditingProduct.uniqueCategoryId);
      setValue("tags", singleEditingProduct.tags);
      setValue("colorIds", generateOptions(singleEditingProduct.attributes.colorIds));
      setValue("sizeIds", generateOptions(singleEditingProduct.attributes.sizeIds));
      setValue("materialIds", generateOptions(singleEditingProduct.attributes.materialIds));
      setValue("fabricIds", generateOptions(singleEditingProduct.attributes.fabricIds));
      setValue("occasionIds", generateOptions(singleEditingProduct.attributes.occasionIds));
      setValue("stock", singleEditingProduct.stock);
      setValue("isFeatured", singleEditingProduct.isFeatured);
      setValue("isNewArrival", singleEditingProduct.isNewArrival);
      setValue("isBestSelling", singleEditingProduct.isBestSelling);
      setValue("showOnHomepage", singleEditingProduct.showOnHomepage);
      if (singleEditingProduct.images) {
        setValue("image", [singleEditingProduct.images]);
        setPhoto(singleEditingProduct.images);
      }
    }
  }, [action, setValue, singleEditingProduct]);

  const onSubmit = async (data: ProductFormData) => {
    const normalizeTags = (items: SelectOption[] = []) => items.map((item) => (typeof item === "string" ? item : item.value));
    const Product = {
      name: data.name,
      slug: data.slug,
      description: data.description,
      price: data.price,
      salePrice: data.salePrice,
      sku: data.sku,
      images: photo,
      categoryId: data.categoryId,
      uniqueCategoryId: data.uniqueCategoryId,
      tags: normalizeTags(data.tags),
      attributes: {
        colorIds: normalizeTags(data.colorIds),
        sizeIds: normalizeTags(data.sizeIds),
        materialIds: normalizeTags(data.materialIds),
        fabricIds: normalizeTags(data.fabricIds),
        occasionIds: normalizeTags(data.occasionIds),
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
        trigger("image");
        router.push(RouteList.Product.Product);
      }
    } catch (error) {}
  };

  const getAllCategory = useCallback(async () => {
    try {
      await dispatch(fetchCategoryApiData({}));
    } catch (error) {}
  }, [dispatch]);

  useEffect(() => {
    getAllCategory();
  }, [getAllCategory]);

  const getAllUniqueCategory = useCallback(async () => {
    try {
      await dispatch(fetchUniqueCategoryApiData({}));
    } catch (error) {}
  }, [dispatch]);

  useEffect(() => {
    getAllUniqueCategory();
  }, [getAllUniqueCategory]);

  const getAllSize = useCallback(async () => {
    try {
      await dispatch(fetchSizeApiData({}));
    } catch (error) {}
  }, [dispatch]);

  useEffect(() => {
    getAllSize();
  }, [getAllSize]);

  const getAllColor = useCallback(async () => {
    try {
      await dispatch(fetchColorApiData({}));
    } catch (error) {}
  }, [dispatch]);

  useEffect(() => {
    getAllColor();
  }, [getAllColor]);

  const getAllFabric = useCallback(async () => {
    try {
      await dispatch(fetchFabricApiData({}));
    } catch (error) {}
  }, [dispatch]);

  useEffect(() => {
    getAllFabric();
  }, [getAllFabric]);

  const getAllMaterial = useCallback(async () => {
    try {
      await dispatch(fetchMaterialApiData({}));
    } catch (error) {}
  }, [dispatch]);

  useEffect(() => {
    getAllMaterial();
  }, [getAllMaterial]);

  const getAllOccasion = useCallback(async () => {
    try {
      await dispatch(fetchOccasionApiData({}));
    } catch (error) {}
  }, [dispatch]);

  useEffect(() => {
    getAllOccasion();
  }, [getAllOccasion]);

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
                          <option value="">Select Category</option>
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
                        <Label>Unique Category</Label>
                        <select className="form-select" {...register("uniqueCategoryId")}>
                          <option value="">Select Unique Category</option>
                          {allUniqueCategory?.unique_category_data?.map((uniqueCategory, index) => (
                            <option value={uniqueCategory?._id} key={index}>
                              {uniqueCategory?.name}
                            </option>
                          ))}
                        </select>
                        {errors.uniqueCategoryId && <p className="text-danger">{errors.uniqueCategoryId.message}</p>}
                      </div>
                    </Col>

                    <CustomTypeahead control={control} errors={errors.tags} title="Tags" name="tags" />
                    <CustomTypeahead control={control} errors={errors.colorIds} title="Color" name="colorIds" options={generateOptions(allColor?.color_data)} />
                    <CustomTypeahead control={control} errors={errors.sizeIds} title="Size" name="sizeIds" options={generateOptions(allSize?.size_data)} />
                    <CustomTypeahead control={control} errors={errors.materialIds} title="Material" name="materialIds" options={generateOptions(allMaterial?.material_data)} />
                    <CustomTypeahead control={control} errors={errors.fabricIds} title="Fabric" name="fabricIds" options={generateOptions(allFabric?.fabric_data)} />
                    <CustomTypeahead control={control} errors={errors.occasionIds} title="Occasion" name="occasionIds" options={generateOptions(allOccasion?.occasion_data)} />

                    <Col md="12" className="custom-dropzone-project input-box">
                      <div className="mb-3">
                        <Label>Upload Image</Label>
                        <CommonImageUpload multiple name="image" trigger={trigger} errors={errors} setValue={setValue} setPhoto={setPhoto} photo={photo} />
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

export default ProductDataForm;
