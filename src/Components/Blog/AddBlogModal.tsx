import CommonFileUpload from "@/CoreComponents/CommonFileUpload";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { setAddBlogModal } from "@/ReduxToolkit/Slice/BlogSlice";
import { AddBlogSchema } from "@/Utils/ValidationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Button, Col, Form, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";

const AddBlogModal = ({ isEdit, setEdit }: any) => {
  const { isAddBlogModal } = useAppSelector((state) => state.blog);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(AddBlogSchema) });

  const onCloseModal = () => {
    reset();
    // setEdit(false);
    dispatch(setAddBlogModal());
  };

  const onSubmit = async (data: any) => {
    try {
      console.log("Form Data:", data);
    } catch (error) {}
  };

  return (
    <Modal centered isOpen={isAddBlogModal} toggle={onCloseModal}>
      <ModalHeader className="position-relative border-0">
        {isEdit ? "Edit Blog" : "Add Blog"}
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
                <Col className="custom-dropzone-project input-box">
                  <div className="mb-3">
                    <Label>Upload Image</Label>
                    <CommonFileUpload />
                  </div>
                </Col>
                <Col xs="12">
                  <Button type="submit" color="primary" className="w-100">
                    {isEdit ? "Update Blog" : "Save Blog"}
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

export default AddBlogModal;
