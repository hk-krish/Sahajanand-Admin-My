import Delete from "@/Api/Delete";
import { Href, ImagePath, RouteList, Url_Keys } from "@/Constant";
import Pagination from "@/CoreComponents/Pagination";
import SearchNotFoundClass from "@/CoreComponents/SearchNotFoundClass";
import { LimitOptions } from "@/Data/CoreComponents";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { fetchCategoryApiData, setSingleEditingCategory } from "@/ReduxToolkit/Slice/ProductSlice";
import { CategoryType } from "@/Types/Product";
import RatioImage from "@/Utils/RatioImage";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Card, Col, Row } from "reactstrap";

const GridView = () => {
  const { allCategory, isCollectionSearchData } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(0);
  const [pageLimit, setPageLimit] = useState(LimitOptions[0]?.value);

  const DeleteItem = async (id: string) => {
    try {
      await Delete(`${Url_Keys.Category.Delete}/${id}`);
      getAllCategory();
    } catch (error) {}
  };

  const EditItem = (item: CategoryType) => {
    dispatch(setSingleEditingCategory(item));
  };

  const getAllCategory = useCallback(async () => {
    try {
      await dispatch(fetchCategoryApiData({ page: page + 1, limit: pageLimit, search: isCollectionSearchData }));
    } catch (error) {}
  }, [dispatch, page, pageLimit, isCollectionSearchData]);

  useEffect(() => {
    getAllCategory();
  }, [getAllCategory]);

  return (
    <div className="product-wrapper-grid ratio_landscape">
      <Row className="gridRow">
        {allCategory?.totalData !== 0 ? (
          allCategory?.category_data?.map((item, index) => (
            <Col xl="3" md="4" sm="6" id="gridId" key={index}>
              <Card>
                <div className="product-box">
                  <div className="product-img">
                    <RatioImage src={item?.image ? item.image : `${ImagePath}product/compare-1.jpg`} alt="" className="img-fluid" />
                    <div className="product-hover">
                      <ul>
                        <li onClick={() => DeleteItem(item?._id)}>
                          <Link href={Href} color="transparent">
                            <i className="icon icon-trash" />
                          </Link>
                        </li>
                        <li onClick={() => EditItem(item)}>
                          <Link href={RouteList.Category.EditCategory} color="transparent">
                            <i className="icon icon-pen" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="product-details">
                    <Link href={RouteList.Home}>
                      <h4>{item.name}</h4>
                    </Link>
                    <div className="product-price">{item.slug}</div>
                    <p>{item.description}</p>
                  </div>
                </div>
              </Card>
            </Col>
          ))
        ) : (
          <SearchNotFoundClass word="No items found in Category" />
        )}
        <Pagination page={page} pageCount={allCategory?.state?.page_limit} selectedPageLimit={pageLimit} onPageLimitChange={setPageLimit} onPageChange={(selectedItem) => setPage(selectedItem.selected)} />
      </Row>
    </div>
  );
};
export default GridView;
