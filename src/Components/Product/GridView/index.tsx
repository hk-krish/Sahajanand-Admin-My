import Delete from "@/Api/Delete";
import { Href, RouteList, Url_Keys } from "@/Constant";
import Pagination from "@/CoreComponents/Pagination";
import ProductImage from "@/CoreComponents/ProductImage";
import SearchNotFoundClass from "@/CoreComponents/SearchNotFoundClass";
import Skeleton from "@/CoreComponents/Skeleton";
import { LimitOptions } from "@/Data/CoreComponents";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { fetchProductApiData, setSingleEditingProduct } from "@/ReduxToolkit/Slice/ProductSlice";
import { ProductType } from "@/Types/Product";
import { dynamicNumber } from "@/Utils";
import Link from "next/link";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Card, Col, Row } from "reactstrap";

const GridView = () => {
  const [page, setPage] = useState(0);
  const [pageLimit, setPageLimit] = useState(LimitOptions[0]?.value);
  const hasFetched = useRef(false);

  const dispatch = useAppDispatch();
  const { allProduct, isProductSearchData, isLoadingProduct } = useAppSelector((state) => state.product);

  const DeleteItem = async (id: string) => {
    try {
      await Delete(`${Url_Keys.Product.Delete}/${id}`);
      getAllProduct();
    } catch (error) {}
  };

  const EditItem = (item: ProductType) => {
    dispatch(setSingleEditingProduct(item));
  };

  const getAllProduct = useCallback(async () => {
    try {
      await dispatch(fetchProductApiData({ page: page + 1, limit: pageLimit, search: isProductSearchData }));
    } catch (error) {}
  }, [dispatch, page, pageLimit, isProductSearchData]);

  useEffect(() => {
    if (!hasFetched.current) {
      getAllProduct();
      hasFetched.current = true;
    }
  }, [getAllProduct]);

  return (
    <div className="product-wrapper-grid ratio_landscape">
      {isLoadingProduct ? (
        <Row className="gridRow">
          {dynamicNumber(8).map((_, index) => (
            <Skeleton key={index} />
          ))}
        </Row>
      ) : allProduct?.totalData !== 0 ? (
        <Fragment>
          <Row className="gridRow">
            {allProduct?.product_data?.map((item, index) => (
              <Col xl="3" md="4" sm="6" id="gridId" key={index}>
                <Card>
                  <div className="product-box">
                    <div className="product-img">
                      <ProductImage image={item?.images} />
                      <div className="product-hover">
                        <ul>
                          <li onClick={() => EditItem(item)}>
                            <Link href={RouteList.Product.EditProduct} color="transparent">
                              <i className="icon icon-pen" />
                            </Link>
                          </li>
                          <li onClick={() => DeleteItem(item?._id)}>
                            <Link href={Href} color="transparent">
                              <i className="icon icon-trash" />
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="product-details">
                      <Link href={RouteList.Default}>
                        <h4>{item.name}</h4>
                      </Link>
                      <div className="product-price">{item.slug}</div>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
          <Pagination page={page} pageCount={allProduct?.state?.page_limit} selectedPageLimit={pageLimit} onPageLimitChange={setPageLimit} onPageChange={(selectedItem) => setPage(selectedItem.selected)} />
        </Fragment>
      ) : (
        <SearchNotFoundClass word="No items found in Product" />
      )}
    </div>
  );
};
export default GridView;
