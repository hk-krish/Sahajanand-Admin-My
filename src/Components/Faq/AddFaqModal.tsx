import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { setAddFaqModal } from "@/ReduxToolkit/Slice/FaqSlice";
import { AddFaqSchema } from "@/Utils/ValidationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button, Col, Form, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";

const AddFaqModal = ({ isEdit, setEdit }: any) => {
  const { isAddFaqModal } = useAppSelector((state) => state.faq);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(AddFaqSchema) });

  const onCloseModal = () => {
    reset();
    // setEdit(false);
    dispatch(setAddFaqModal());
  };

  const onSubmit = async (data: any) => {
    try {
      console.log("Form Data:", data);
    } catch (error) {}
  };

  return (
    <Modal centered isOpen={isAddFaqModal} toggle={onCloseModal}>
      <ModalHeader className="position-relative border-0">
        {isEdit ? "Edit Faq" : "Add Faq"}
        <Button color="transparent" onClick={onCloseModal} className="btn-close" />
      </ModalHeader>
      <ModalBody className="pt-0">
        <Form className="row" onSubmit={handleSubmit(onSubmit)}>
          <Col lg="12">
            <div className="input-items">
              <Row className="g-3">
                <Col md="12" className="input-box">
                  <Label htmlFor="name">Name</Label>
                  <input id="name" placeholder="Use name" {...register("name")} />
                  {errors.name && <span className="text-danger">{errors.name.message}</span>}
                </Col>

                <Col md="12" className="input-box">
                  <Label htmlFor="phoneNumber">Mobile Number</Label>
                  <textarea id="phoneNumber" placeholder="(xxx) xxx-xxxx" {...register("title")} />
                  {errors.title && <span className="text-danger">{errors.title.message}</span>}
                </Col>
                <Col xs="12">
                  <Button type="submit" color="primary" className="w-100">
                    {isEdit ? "Update Faq" : "Save Faq"}
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default AddFaqModal;
