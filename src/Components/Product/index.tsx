import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import SearchFunction from "@/CoreComponents/SearchFunction";
import { Fragment } from "react";
import { Container } from "reactstrap";
import GridView from "./GridView";
import { RouteList } from "@/Constant";

const ProductContainer = () => {
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Product" parent="Pages" />
      <Container fluid className={`product-wrapper`}>
        <div className="product-grid">
          <SearchFunction btnTitle="Add Product" btnLink={RouteList.Product.AddProduct}/>
          <GridView />
        </div>
      </Container>
    </Fragment>
  );
};

export default ProductContainer;
