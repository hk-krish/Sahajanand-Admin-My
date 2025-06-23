import { RouteList } from "@/Constant";
import { useAppDispatch } from "@/ReduxToolkit/Hooks";
import { LoginSchema } from "@/Utils/ValidationSchemas";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Col, Container, Form, FormGroup, Label, Row } from "reactstrap";

const ForgotPasswordContainer = () => {
  const dispatch = useAppDispatch();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const toggle = () => setPasswordVisible(!isPasswordVisible);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = async () => {
    try {
      //   const response = await Post(URL_KEYS.Auth.Login, values, false);
      //   if (response.status === 200) {
      // dispatch(login(response.data));
      // navigate(RouteList.Product.Item);
      //   }
    } catch (error) {}
  };
  return (
    <Container fluid className="p-0">
      <Row className="m-0">
        <Col xs="12" className="p-0">
          <div className="login-card">
            <div>
              <div>
                <Link className="logo" href={RouteList.Dashboard}>
                  {/* <Image className="img-fluid for-light" src={dynamicImage(`logo/logo.png`)} alt="loginPage" /> */}
                  {/* <Image className="img-fluid for-dark" src={dynamicImage(`logo/logo_dark.png`)} alt="loginPage" /> */}
                </Link>
              </div>
              <div className="login-main">
                <Form onSubmit={handleSubmit(onSubmit)}>
                  <h3>Reset Your Password</h3>
                  <p>Enter your Login Id & New password</p>

                  {/* Phone Input */}
                  <div className="input-box">
                    <Label className="col-form-label">Login Id</Label>
                    <input id="phoneNumber" type="text" placeholder="Enter Your Login Id" {...register("phoneNumber")} />
                    {errors.phoneNumber && <p className="text-danger mt-1">{errors.phoneNumber.message}</p>}
                  </div>

                  {/* Password Input */}
                  <div className="input-box">
                    <Label className="col-form-label">New Password</Label>
                    <div className="position-relative">
                      <input placeholder="Enter Your New Password" type={isPasswordVisible ? "text" : "password"} {...register("password")} />
                      <div className="show-hide" onClick={toggle}>
                        <span className={!isPasswordVisible ? "show" : ""}> </span>
                      </div>
                    </div>
                    {errors.password && <p className="text-danger mt-1">{errors.password.message}</p>}
                  </div>

                  {/* Footer */}
                  <div className="text-end mt-4">
                    <Button color="primary" className="w-100" block>
                      Save
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPasswordContainer;
