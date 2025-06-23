import { Href, ImagePath, RouteList } from "@/Constant";
import RatioImage from "@/Utils/RatioImage";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, Row } from "reactstrap";

const GridView = () => {
  const [isEdit, setEdit] = useState(false);
  const [isEditData, setEditData] = useState(null);
  const [cartData, setCartData] = useState([]);

  const dispatch = useDispatch();

  return (
    <div className="product-wrapper-grid ratio_landscape">
      <Row className="gridRow">
        <div id="gridId" className="col-xl-3 col-md-4 col-sm-6 ">
          <Card>
            <div className="product-box">
              <div className="product-img">
                <RatioImage src={`${ImagePath}product/compare-1.jpg`} alt="" className="img-fluid" />
                <div className="product-hover">
                  <ul>
                    {!isEdit ? (
                      <>
                        <li>
                          <Link href={Href} color="transparent">
                            <i className="icon icon-trash"/>
                          </Link>
                        </li>
                        <li>
                          <Link href={Href} color="transparent">
                            <i className="icon icon-pen"/>
                          </Link>
                        </li>
                      </>
                    ) : (
                      <li>
                        <Link href={Href} color="transparent">
                          <i className="icon icon-cart2"/>
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              <div className="product-details">
                <Link href={RouteList.Home}>
                  <h4>item.name</h4>
                </Link>
                <div className="product-price">
                  Per Kg Price =<span> item.perKgPrice </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Row>
    </div>
  );
};
export default GridView;
