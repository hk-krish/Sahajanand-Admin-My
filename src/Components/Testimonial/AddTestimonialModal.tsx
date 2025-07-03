import { Post } from "@/Api";
import { Url_Keys } from "@/Constant";
import CommonImageUpload from "@/CoreComponents/CommonImageUpload";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { setAddTestimonialModal } from "@/ReduxToolkit/Slice/Testimonial";
import { AddTestimonialModalType, TestimonialFormData } from "@/Types/Testimonial";
import { AddTestimonialSchema } from "@/Utils/ValidationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Rating } from "react-simple-star-rating";
import { Button, Col, Form, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";

const AddTestimonialModal: FC<AddTestimonialModalType> = ({ isEdit, setEdit, getAllTestimonial }) => {
  const [photo, setPhoto] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  const { isAddTestimonialModal, singleEditingTestimonial } = useAppSelector((state) => state.testimonial);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({ resolver: yupResolver(AddTestimonialSchema) });

  useEffect(() => {
    if (singleEditingTestimonial && isEdit) {
      setValue("message", singleEditingTestimonial.message);
      setValue("rating", singleEditingTestimonial.rating);
      if (singleEditingTestimonial.image) {
        setValue("image", [singleEditingTestimonial.image]);
        setPhoto([singleEditingTestimonial.image]);
      }
    }
  }, [isEdit, setValue, singleEditingTestimonial]);

  const onCloseModal = () => {
    getAllTestimonial();
    reset();
    setEdit(false);
    dispatch(setAddTestimonialModal());
    setPhoto([]);
    trigger("image");
  };

  const onSubmit = async (data: TestimonialFormData) => {
    const Testimonial = {
      message: data.message,
      rating: data.rating,
      image: photo[0],
    };
    try {
      const response = isEdit ? await Post(Url_Keys.Testimonial.Edit, { testimonialId: singleEditingTestimonial._id, ...Testimonial }) : await Post(Url_Keys.Testimonial.Add, Testimonial);
      if (response?.status === 200) {
        onCloseModal();
      }
    } catch (error) {}
  };

  return (
    <Modal centered isOpen={isAddTestimonialModal} toggle={onCloseModal}>
      <ModalHeader className="position-relative border-0">
        {isEdit ? "Edit Testimonial" : "Add Testimonial"}
        <Button color="transparent" onClick={onCloseModal} className="btn-close" />
      </ModalHeader>
      <ModalBody className="pt-0">
        <Form className="row" onSubmit={handleSubmit(onSubmit)}>
          <Col lg="12">
            <div className="input-items">
              <Row className="g-3">
                <Col md="12" className="input-box">
                  <Label>message</Label>
                  <input placeholder="Message" {...register("message")} />
                  {errors.message && <span className="text-danger">{errors.message.message}</span>}
                </Col>
                <Col md="12" className="input-box">
                  <Label>Rating</Label>
                  <div className="rating">
                    <Controller name="rating" control={control} render={({ field }) => <Rating onClick={(rate) => field.onChange(rate)} initialValue={field.value || 0} size={20} className="mt-1" />} />
                  </div>
                  {errors.rating && <span className="text-danger">{errors.rating.message}</span>}
                </Col>
                <Col md="12" className="custom-dropzone-project input-box">
                  <div className="mb-3">
                    <Label>Image Desktop</Label>
                    <CommonImageUpload name="image" trigger={trigger} errors={errors} setValue={setValue} setPhoto={setPhoto} photo={photo} />
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

export default AddTestimonialModal;
