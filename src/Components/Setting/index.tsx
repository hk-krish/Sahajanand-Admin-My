import { Post } from "@/Api";
import { Url_Keys } from "@/Constant";
import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import CommonCardHeader from "@/CoreComponents/CommonCardHeader";
import CommonImageUpload from "@/CoreComponents/CommonImageUpload";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { fetchSingleUserApiData } from "@/ReduxToolkit/Slice/UserSlice";
import { SettingFormData } from "@/Types/UserType";
import { SettingSchema } from "@/Utils/ValidationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { Facebook, Instagram, Xrp } from "iconsax-react";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Card, CardBody, Col, Container, Form, InputGroup, InputGroupText, Label, Row } from "reactstrap";

const SettingContainer = () => {
  const [photo, setPhoto] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { singleUser } = useAppSelector((state) => state.users);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SettingSchema),
  });

  useEffect(() => {
    if (singleUser) {
      setValue("firstName", singleUser?.firstName);
      setValue("lastName", singleUser?.lastName);
      setValue("email", singleUser?.email);
      setValue("phoneNumber", singleUser?.phoneNumber);
      setValue("facebook", singleUser?.socialMedia?.facebook);
      setValue("twitter", singleUser?.socialMedia?.twitter);
      setValue("instagram", singleUser?.socialMedia?.instagram);
      if (singleUser?.profilePhoto) {
        setValue("image", [singleUser?.profilePhoto]);
        setPhoto([singleUser?.profilePhoto]);
      }
    }
  }, [setValue, singleUser]);

  const onSubmit = async (data: SettingFormData) => {
    const setting = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      socialMedia: {
        facebook: data.facebook,
        twitter: data.twitter,
        instagram: data.instagram,
      },
      profilePhoto: photo[0],
    };
    try {
      const response = await Post(Url_Keys.Users.EditAdmin, { userId: singleUser?._id, ...setting });
      if (response?.status === 200) {
        getSingleUser();
      }
    } catch (error) {}
  };

  const getSingleUser = useCallback(async () => {
    try {
      await dispatch(fetchSingleUserApiData({ search: user?._id }));
    } catch (error) {}
  }, [dispatch, user?._id]);

  useEffect(() => {
    getSingleUser();
  }, [getSingleUser]);
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Setting" parent="Pages" />
      <Container fluid>
        <Col md="12">
          <Card>
            <CommonCardHeader title="Setting" />
            <CardBody>
              <div className="input-items">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <Row className="gy-3">
                    <Col md="12" className="custom-dropzone-project input-box avatar-upload">
                      <div className="mb-3">
                        <CommonImageUpload type="profile" name="image" trigger={trigger} errors={errors} setValue={setValue} setPhoto={setPhoto} photo={photo} />
                        <Label className="d-flex justify-content-center mt-2">Upload Image</Label>
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="input-box">
                        <Label>first Name</Label>
                        <input type="text" placeholder="First Name" {...register("firstName")} />
                        {errors.firstName && <p className="text-danger">{errors.firstName.message}</p>}
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="input-box">
                        <Label>Last Name</Label>
                        <input type="text" placeholder="Last Name" {...register("lastName")} />
                        {errors.lastName && <p className="text-danger">{errors.lastName.message}</p>}
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="input-box">
                        <Label>Email</Label>
                        <input type="text" placeholder="Email" {...register("email")} />
                        {errors.email && <p className="text-danger">{errors.email.message}</p>}
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="input-box">
                        <Label>Phone Number</Label>
                        <input type="number" placeholder="Phone Number" {...register("phoneNumber")} />
                        {errors.phoneNumber && <p className="text-danger">{errors.phoneNumber.message}</p>}
                      </div>
                    </Col>

                    <Col md="6">
                      <div className="input-box">
                        <Label>Facebook</Label>
                        <InputGroup>
                          <InputGroupText className="list-light-primary">
                            <Facebook />
                          </InputGroupText>
                          <input type="text" placeholder="Facebook" {...register("facebook")} />
                        </InputGroup>
                        {errors.facebook && <p className="text-danger">{errors.facebook.message}</p>}
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="input-box">
                        <Label>Instagram</Label>
                        <InputGroup>
                          <InputGroupText className="list-light-primary">
                            <Instagram />
                          </InputGroupText>
                          <input type="text" placeholder="Instagram" {...register("instagram")} />
                        </InputGroup>
                        {errors.instagram && <p className="text-danger">{errors.instagram.message}</p>}
                      </div>
                    </Col>
                    <Col md="6">
                      <div className="input-box">
                        <Label>Twitter</Label>
                        <InputGroup>
                          <InputGroupText className="list-light-primary">
                            <Xrp />
                          </InputGroupText>
                          <input type="text" placeholder="Twitter" {...register("twitter")} />
                        </InputGroup>
                        {errors.twitter && <p className="text-danger">{errors.twitter.message}</p>}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <div className="text-center mt-4">
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
      </Container>
    </Fragment>
  );
};

export default SettingContainer;
