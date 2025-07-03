import { Href, ImagePath } from "@/Constant";
import Breadcrumbs from "@/CoreComponents/Breadcrumbs";
import CommonCardHeader from "@/CoreComponents/CommonCardHeader";
import Pagination from "@/CoreComponents/Pagination";
import SearchNotFoundClass from "@/CoreComponents/SearchNotFoundClass";
import Skeleton from "@/CoreComponents/Skeleton";
import { LimitOptions } from "@/Data/CoreComponents";
import { useAppDispatch, useAppSelector } from "@/ReduxToolkit/Hooks";
import { fetchTestimonialApiData, setAddTestimonialModal, setSingleEditingTestimonial } from "@/ReduxToolkit/Slice/Testimonial";
import { TestimonialType } from "@/Types/Testimonial";
import RatioImage from "@/Utils/RatioImage";
import { Edit } from "iconsax-react";
import { Fragment, useCallback, useEffect, useState } from "react";
import { Button, Card, CardBody, Col, Container, Row, Table } from "reactstrap";
import AddTestimonialModal from "./AddTestimonialModal";
import { Rating } from "react-simple-star-rating";

const TestimonialContainer = () => {
  const [isEdit, setEdit] = useState(false);
  const [page, setPage] = useState(0);
  const [pageLimit, setPageLimit] = useState(LimitOptions[0]?.value);
  const [isSearch, setSearch] = useState("");

  const dispatch = useAppDispatch();
  const { isLoadingTestimonial, allTestimonial } = useAppSelector((state) => state.testimonial);

  const AddTestimonialModalClick = () => dispatch(setAddTestimonialModal());
  const setSearchData = (e: string) => setSearch(e);

  const EditTestimonial = (item: TestimonialType) => {
    dispatch(setSingleEditingTestimonial(item));
    setEdit(true);
    AddTestimonialModalClick();
  };

  const getAllTestimonial = useCallback(async () => {
    try {
      await dispatch(fetchTestimonialApiData({ page: page + 1, limit: pageLimit, search: isSearch }));
    } catch (error) {}
  }, [dispatch, page, pageLimit, isSearch]);

  useEffect(() => {
    getAllTestimonial();
  }, [getAllTestimonial]);
  return (
    <Fragment>
      <Breadcrumbs mainTitle="Testimonial" parent="Pages" />
      <Container fluid>
        <Col md="12" className="custom-table">
          <Card>
            <CommonCardHeader Search={setSearchData} searchClass="col-md-10 col-sm-7" btnTitle="Add Testimonial" btnClick={AddTestimonialModalClick} />
            <CardBody>
              {isLoadingTestimonial ? (
                <Row>
                  <Skeleton type="table" />
                </Row>
              ) : allTestimonial?.totalData !== 0 ? (
                <Fragment>
                  <Table responsive className="mb-4">
                    <thead className="bg-light-primary">
                      <tr>
                        <th>Sr No.</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Message</th>
                        <th>Rating</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allTestimonial?.testimonial_data?.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1} </td>
                          <td>
                            <RatioImage className="img-fluid img-60" src={item?.image ? item.image : `${ImagePath}product/compare-1.jpg`} />
                          </td>
                          <td>{item?.user?.firstName} {item?.user?.lastName}</td>
                          <td>{item.message}</td>
                          <td><Rating readonly initialValue={item?.rating || 0} size={20} className="mt-1" /></td>
                          <td>
                            <Button color="danger" href={Href} className="m-1 p-1" onClick={() => EditTestimonial(item)}>
                              <Edit className="action" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <Pagination page={page} pageCount={allTestimonial?.state?.page_limit} selectedPageLimit={pageLimit} onPageLimitChange={setPageLimit} onPageChange={(selectedItem) => setPage(selectedItem.selected)} />
                </Fragment>
              ) : (
                <SearchNotFoundClass word="No items found in Testimonial" />
              )}
            </CardBody>
          </Card>
        </Col>
      </Container>
      <AddTestimonialModal isEdit={isEdit} setEdit={setEdit} getAllTestimonial={getAllTestimonial} />
    </Fragment>
  );
};

export default TestimonialContainer;
