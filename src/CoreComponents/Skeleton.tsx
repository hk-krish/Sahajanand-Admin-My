import { Card, Col } from "reactstrap";

const Skeleton = () => {
  return (
    <Col xl="3" md="4" sm="6">
      <Card>
        <div className="product-box">
          <div className="product-img p-3">
            <div className="skeleton-image skeleton"></div>
          </div>
          <div className="product-details p-3 pt-0">
            <div className="skeleton skeleton-text"></div>
            <div className="skeleton skeleton-text short"></div>
            <div className="skeleton skeleton-text"></div>
          </div>
        </div>
      </Card>
    </Col>
  );
};

export default Skeleton;
