import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import SearchFunction from "@/CoreComponents/SearchFunction";
import { useAppDispatch } from "@/ReduxToolkit/Hooks";
import { setAddCollectionModal } from "@/ReduxToolkit/Slice/ProductSlice";
import { Fragment } from "react";
import { Container } from "reactstrap";
import GridView from "./GridView";

const CollectionsContainer = () => {
  const dispatch = useAppDispatch();

  const AddSalesmanModalClick = () => dispatch(setAddCollectionModal());
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Collections" parent="Pages" />
      <Container fluid className="product-wrapper">
        <div className="product-grid">
          <SearchFunction btnTitle="Add Collections" openModal={AddSalesmanModalClick} />
          <GridView />
        </div>
      </Container>
    </Fragment>
  );
};

export default CollectionsContainer;
