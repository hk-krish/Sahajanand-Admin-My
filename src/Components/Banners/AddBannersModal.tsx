import { Post } from "@/Api";
import { Url_Keys } from "@/Constant";
import CommonFileUpload from "@/CoreComponents/CommonFileUpload";
import { BannerTypeData, LinkTypeData } from "@/Data/CoreComponents";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { setAddBannerModal } from "@/ReduxToolkit/Slice/BannersSlice";
import { fetchProductApiData } from "@/ReduxToolkit/Slice/ProductSlice";
import { AddBannersModalType, BannerFormData } from "@/Types/Banner";
import { AddBannerSchema } from "@/Utils/ValidationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Col, Form, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";

const AddBannersModal: FC<AddBannersModalType> = ({ isEdit, setEdit, getAllBanner }) => {
  const [isLinkType, setLinkType] = useState("");
  const [photo, setPhoto] = useState<any>([]);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [mobilePhoto, setMobilePhoto] = useState<any>([]);
  const [uploadedMobileFiles, setUploadedMobileFiles] = useState<any[]>([]);

  const dispatch = useAppDispatch();
  const { isAddBannerModal, singleEditingBanner } = useAppSelector((state) => state.banners);
  const { allProduct } = useAppSelector((state) => state.product);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({ resolver: yupResolver(AddBannerSchema) });

  useEffect(() => {
    if (singleEditingBanner && isEdit) {
      setValue("type", singleEditingBanner.type);
      setValue("title", singleEditingBanner.title);
      setValue("priority", singleEditingBanner.priority);
      setValue("linkId", singleEditingBanner.linkId);
      if (singleEditingBanner.linkType) {
        setValue("linkType", singleEditingBanner.linkType);
        setLinkType(singleEditingBanner.linkType);
      }
      if (singleEditingBanner.imageDesktop) {
        setValue("image", [singleEditingBanner.imageDesktop]);
        setPhoto(singleEditingBanner.imageDesktop);
        setUploadedFiles([{ name: singleEditingBanner.imageDesktop, preview: singleEditingBanner.imageDesktop }]);
      }
      if (singleEditingBanner.imageMobile) {
        setValue("mobileImage", [singleEditingBanner.imageMobile]);
        setMobilePhoto(singleEditingBanner.imageMobile);
        setUploadedMobileFiles([{ name: singleEditingBanner.imageMobile, preview: singleEditingBanner.imageMobile }]);
      }
    }
  }, [isEdit, setValue, singleEditingBanner]);

  const onCloseModal = () => {
    getAllBanner();
    reset();
    setEdit(false);
    dispatch(setAddBannerModal());
    setPhoto([]);
    setMobilePhoto([]);
    setUploadedFiles([]);
    setUploadedMobileFiles([]);
    trigger("image");
    trigger("mobileImage");
  };

  const onSubmit = async (data: BannerFormData) => {
    console.log(data);

    const Banner = {
      type: data.type,
      title: data.title,
      priority: data.priority,
      linkType: data.linkType,
      linkId: data.linkId,
      imageDesktop: photo,
      imageMobile: mobilePhoto,
    };
    try {
      const response = isEdit ? await Post(Url_Keys.Banner.Edit, { bannerId: singleEditingBanner._id, ...Banner }) : await Post(Url_Keys.Banner.Add, Banner);
      if (response?.status === 200) {
        onCloseModal();
      }
    } catch (error) {}
  };

  useEffect(() => {
    dispatch(fetchProductApiData({}));
  }, [dispatch]);

  return (
    <Modal centered size="xl" isOpen={isAddBannerModal} toggle={onCloseModal}>
      <ModalHeader className="position-relative border-0">
        {isEdit ? "Edit Banner" : "Add Banner"}
        <Button color="transparent" onClick={onCloseModal} className="btn-close" />
      </ModalHeader>
      <ModalBody className="pt-0">
        <Form className="row" onSubmit={handleSubmit(onSubmit)}>
          <Col lg="12">
            <div className="input-items">
              <Row className="g-3">
                <Col md="6" className="input-box">
                  <Label htmlFor="title">title</Label>
                  <input id="title" placeholder="Title" {...register("title")} />
                  {errors.title && <span className="text-danger">{errors.title.message}</span>}
                </Col>
                <Col md="6">
                  <div className="input-box">
                    <Label>Type</Label>
                    <select className="form-select" {...register("type")}>
                      <option value="">-- Select Type --</option>
                      {BannerTypeData?.map((banner, index) => (
                        <option value={banner?.value} key={index}>
                          {banner?.label}
                        </option>
                      ))}
                    </select>
                    {errors.type && <p className="text-danger">{errors.type.message}</p>}
                  </div>
                </Col>
                <Col md="4">
                  <div className="input-box">
                    <Label>Link Type</Label>
                    <select className="form-select" {...register("linkType")} onChange={(e) => setLinkType(e.target.value)}>
                      <option value="">-- Select Link Type --</option>
                      {LinkTypeData?.map((link, index) => (
                        <option value={link?.value} key={index}>
                          {link?.label}
                        </option>
                      ))}
                    </select>
                    {errors.linkType && <p className="text-danger">{errors.linkType.message}</p>}
                  </div>
                </Col>
                <Col md="4">
                  <div className="input-box">
                    <Label>Product Link</Label>
                    <select disabled={!isLinkType} className="form-select" {...register("linkId")}>
                      <option value="">-- Select Product Type --</option>
                      {isLinkType === "product"
                        ? allProduct?.product_data?.map((product, index) => (
                            <option value={product?._id} key={index}>
                              {product?.name}
                            </option>
                          ))
                        : ""}
                    </select>
                    {errors.linkId && <p className="text-danger">{errors.linkId.message}</p>}
                  </div>
                </Col>
                <Col md="4" className="input-box">
                  <Label htmlFor="priority">Priority</Label>
                  <input type="number" id="priority" placeholder="Title" {...register("priority")} />
                  {errors.priority && <span className="text-danger">{errors.priority.message}</span>}
                </Col>
                <Col md="6" className="custom-dropzone-project input-box">
                  <div className="mb-3">
                    <Label>Image Desktop</Label>
                    <CommonFileUpload name="image" trigger={trigger} errors={errors} setValue={setValue} setPhoto={setPhoto} photo={photo} uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} />
                  </div>
                </Col>
                <Col md="6" className="custom-dropzone-project input-box">
                  <div className="mb-3">
                    <Label>Image Mobile</Label>
                    <CommonFileUpload name="mobileImage" trigger={trigger} errors={errors} setValue={setValue} setPhoto={setMobilePhoto} photo={mobilePhoto} uploadedFiles={uploadedMobileFiles} setUploadedFiles={setUploadedMobileFiles} />
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
            </div>
          </Col>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default AddBannersModal;
