import { RouteList } from "@/Constant";
import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import SearchFunction from "@/CoreComponents/SearchFunction";
import { useAppDispatch } from "@/ReduxToolkit/Hooks";
import { setCollectionSearchData } from "@/ReduxToolkit/Slice/ProductSlice";
import { Fragment } from "react";
import { Container } from "reactstrap";
import GridView from "./GridView";

const CategoryContainer = () => {
  const dispatch = useAppDispatch();

  const setSearchData = (e:string) => dispatch(setCollectionSearchData(e))

  return (
    <Fragment>
      <Breadcrumbs mainTitle="Category" parent="Pages" />
      <Container fluid className="product-wrapper">
        <div className="product-grid">
          <SearchFunction btnTitle="Add Category" btnLink={RouteList.Category.AddCategory} setSearchData={setSearchData}/>
          <GridView />
        </div>
      </Container>
    </Fragment>
  );
};

export default CategoryContainer;
