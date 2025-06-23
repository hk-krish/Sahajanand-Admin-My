import { FC } from "react";
import { Col } from "reactstrap";

const SearchNotFoundClass:FC<{ word: string }> = ({ word }) => {
  return (
    <Col sm="12">
      <div>
        <div className="text-center p-5">
          {/* <Image className="img-100 mb-4" src={dynamicImage(`other-images/sad.gif`)} alt="" /> */}
          <p>{`Sorry, Not Found Any ${word}`}</p>
        </div>
      </div>
    </Col>
  );
};

export default SearchNotFoundClass;
