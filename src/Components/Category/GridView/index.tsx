import Delete from "@/Api/Delete";
import { Href, ImagePath, RouteList, Url_Keys } from "@/Constant";
import SearchNotFoundClass from "@/CoreComponents/SearchNotFoundClass";
import { useAppSelector } from "@/ReduxToolkit/Hooks";
import RatioImage from "@/Utils/RatioImage";
import Link from "next/link";
import { useState } from "react";
import { Card, Col, Row } from "reactstrap";

const GridView = () => {
  const [isEdit, setEdit] = useState(false);
  const [isEditData, setEditData] = useState(null);
  const [cartData, setCartData] = useState([]);

  const { allCategory } = useAppSelector((state) => state.product);

  const DeleteItem = async (id: string) => {
    try {
      await Delete(`${Url_Keys.Category.Delete}/${id}`);
    } catch (error) {}
  };

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
                        <li>
                          <Link href={Href} color="transparent">
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
      </Row>
    </div>
  );
};
export default GridView;
