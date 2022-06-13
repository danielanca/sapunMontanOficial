import React, { useEffect, useState } from "react";
import { Card, CardBody, Table, CardTitle, Col, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { Link } from "react-router-dom";
import { getAllOrders } from "../../../data/productList";
import { requestOrdersList } from "../../../services/emails";
const LatestTransaction = () => {
  const [ordersLocal, setOrdersLocal] = useState(null);

  useEffect(() => {
    requestOrdersList().then((res) => {
      res.json().then((data) => {
        console.log("transactions:", Object.values(data));
        setOrdersLocal(Object.values(data)[0]);
      });
    });
  }, []);
  return (
    <Col lg={8}>
      <Card>
        <CardBody>
          <CardTitle className="h4 mb-4">Latest Transaction</CardTitle>
          <div className="table-responsive">
            <Table className="table-centered">
              <thead>
                <tr>
                  <th scope="col">Data</th>
                  <th scope="col">Factura</th>
                  <th scope="col">Client</th>
                  <th scope="col">Suma</th>
                  <th scope="col" colSpan="2">
                    PLATA
                  </th>
                </tr>
              </thead>
              {ordersLocal != null
                ? ordersLocal.map((item) => (
                    <tbody>
                      <tr>
                        <td>{item.timestamp}</td>
                        <td>
                          <Link target={"_blank"} to={`/order/${item.invoiceID}`} className="text-body fw-medium">
                            #{item.invoiceID}
                          </Link>
                        </td>
                        <td>{`${item.firstName} ${item.lastName}`}</td>
                        <td>{`${item.shippingTax + item.cartSum} RON `}</td>
                        <td>
                          <span
                            className={`badge badge-soft-${
                              item.paymentStatus === "PAID" ? "succes" : "danger"
                            } font-size-20`}
                          >
                            {item.paymentStatus === "NOT_PAID" ? "Paid" : "Unpaid"}
                          </span>
                        </td>
                        <td>
                          <Link target={"_blank"} to={`/order/${item.invoiceID}`} className="btn btn-primary btn-sm">
                            VIZUALIZEAZA
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  ))
                : ""}
            </Table>
          </div>
          <div className="mt-3">
            <Pagination className="pagination pagination-rounded justify-content-center mb-0">
              <PaginationItem>
                <PaginationLink to="#">Previous</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink to="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem className="active">
                <PaginationLink to="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink to="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink to="#">Next</PaginationLink>
              </PaginationItem>
            </Pagination>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default LatestTransaction;
