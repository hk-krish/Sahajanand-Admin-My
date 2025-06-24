import { RouteList } from "@/Constant";
import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import SearchFunction from "@/CoreComponents/SearchFunction";
import { useAppDispatch } from "@/ReduxToolkit/Hooks";
import { fetchCategoryApiData } from "@/ReduxToolkit/Slice/ProductSlice";
import { Fragment, useEffect } from "react";
import { Container } from "reactstrap";
import GridView from "./GridView";

const CategoryContainer = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategoryApiData());
  }, [dispatch]);
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Category" parent="Pages" />
      <Container fluid className="product-wrapper">
        <div className="product-grid">
          <SearchFunction btnTitle="Add Category" btnLink={RouteList.Category.AddCategory} />
          <GridView />
        </div>
      </Container>
    </Fragment>
  );
};

export default CategoryContainer;
