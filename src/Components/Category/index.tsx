import { RouteList } from "@/Constant";
import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import SearchFunction from "@/CoreComponents/SearchFunction";
import { Fragment } from "react";
import { Container } from "reactstrap";
import GridView from "./GridView";

const CategoryContainer = () => {
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Category" parent="Pages" />
      <Container fluid className="product-wrapper">
        <div className="product-grid">
          <SearchFunction btnTitle="Add Category" btnLink={RouteList.Category.AddCategory}/>
          <GridView />
        </div>
      </Container>
    </Fragment>
  );
};

export default CategoryContainer;
