import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import CommonCardHeader from "@/CoreComponents/CommonCardHeader";
import { useAppDispatch } from "@/ReduxToolkit/Hooks";
import { setAddCollectionModal } from "@/ReduxToolkit/Slice/ProductSlice";
import { Fragment, useState } from "react";
import { Card, CardBody, Col, Container } from "reactstrap";
import GridView from "./GridView";

const CollectionsContainer = () => {
  const [searchData, setSearchData] = useState("");
  const dispatch = useAppDispatch();

  const AddSalesmanModalClick = () => dispatch(setAddCollectionModal());

  return (
    <Fragment>
      <Breadcrumbs mainTitle="Collections" parent="Pages" />
      <Container fluid className="product-wrapper">
        <div className="product-grid">
          <Col sx="12">
            <Card>
              <CommonCardHeader Search={setSearchData} btnTitle="Add Collections" btnClick={AddSalesmanModalClick} />
              <CardBody>
                <GridView />
              </CardBody>
            </Card>
          </Col>
        </div>
      </Container>
    </Fragment>
  );
};

export default CollectionsContainer;
