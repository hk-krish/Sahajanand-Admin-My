import { Href, ImagePath } from "@/Constant";
import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import CommonCardHeader from "@/CoreComponents/CommonCardHeader";
import RatioImage from "@/Utils/RatioImage";
import React, { Fragment, useState } from "react";
import { Button, Card, CardBody, Col, Container, Table } from "reactstrap";
import AddBannersModal from "./AddBannersModal";
import { useAppDispatch } from "@/ReduxToolkit/Hooks";
import { setAddBannerModal } from "@/ReduxToolkit/Slice/BannersSlice";
import { Edit, Trash } from "iconsax-react";

const BannersContainer = () => {
  const [searchData, setSearchData] = useState("");
  const dispatch = useAppDispatch();

  const AddSalesmanModalClick = () => dispatch(setAddBannerModal());

  return (
    <Fragment>
      <Breadcrumbs mainTitle="Banners" parent="Pages" />
      <Container fluid>
        <Col md="12" className="custom-table">
          <Card>
            <CommonCardHeader Search={setSearchData} btnTitle="Add Banners" btnClick={AddSalesmanModalClick} />
            <CardBody>
              <Table responsive>
                <thead className="bg-light-primary">
                  <tr>
                    <th>Sr No.</th>
                    <th>Name</th>
                    <th>Mobile number</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1 </td>
                    <td>
                      <RatioImage className="img-fluid img-60" src={`${ImagePath}product/compare-1.jpg`} />
                    </td>
                    <td>item.phoneNumber</td>
                    <td>
                      <Button color="primary" href={Href} className="m-1 p-1">
                        <Trash className="action" />
                      </Button>
                      <Button color="danger" href={Href} className="m-1 p-1">
                        <Edit className="action" />
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td>2 </td>
                    <td>item.name</td>
                    <td>item.phoneNumber</td>
                    <td>
                      <Button color="primary" href={Href} className="m-1 p-1">
                        <Trash className="action" />
                      </Button>
                      <Button color="danger" href={Href} className="m-1 p-1">
                        <Edit className="action" />
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Container>
      <AddBannersModal />
    </Fragment>
  );
};

export default BannersContainer;
