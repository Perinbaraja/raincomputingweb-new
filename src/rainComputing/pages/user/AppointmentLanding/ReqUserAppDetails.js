import React, { useEffect, useState } from "react"
import { Row, Col, Card, CardBody, Button } from "reactstrap"
// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator"

import ToolkitProvider from "react-bootstrap-table2-toolkit"

//Import Breadcrumb
import Breadcrumbs from "../../../../components/Common/Breadcrumb"
import "../../../components/chat/style/datatables.scss"
import ChatLoader from "../../../components/chat/ChatLoader"
import { getAllAppointmentRequestById } from "rainComputing/helpers/backend_helper"
import { useUser } from "rainComputing/contextProviders/UserProvider"
import moment from "moment"

const ReqUserAppointmentDetails = () => {
  const [loading, setLoading] = useState(false)
  const { currentAttorney } = useUser()
  const [appointmentUser, setAppointmentUser] = useState([])

  const idFormatter = (cell, row, rowIndex) => {
    return rowIndex + 1
  }

  const nameFormatter = (cell, row) => {
    console.log("row", row)
    return row?.User?.firstname + " " + row?.User?.lastname
  }

  const emailFormatter = (cell, row) => {
    return row?.User?.email
  }

  const statusFormatter = (cell, row) => {
    return row?.appointmentstatus
    // (
    //   <span
    //     className={`label ${
    //       row?.appointmentstatus? "text-success" : "text-danger"
    //     }`}
    //   >
    //     {row?.appointmentstatus ? "Approved" : "Rejected"}
    //   </span>
    // )
  }
  const dateFormatter = (cell, row) => {
    return  moment(row?.updatedAt).format("DD-MM-YY HH:mm")
  }

  const columns = [
    {
      dataField: "_id",
      text: "S.NO",
      sort: true,
      formatter: idFormatter,
    },
    {
      dataField: "username",
      text: "User Name",
      sort: true,
      formatter: nameFormatter,
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
      formatter: emailFormatter,
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      formatter: statusFormatter,
    },
    {
        dataField: "date",
        text: "Date",
        sort: true,
        formatter: dateFormatter,
      },
  ]

  const defaultSorted = [
    {
      dataField: "_id",
      order: "desc",
    },
  ]

  const pageOptions = {
    sizePerPage: 5,
    totalSize: appointmentUser.filter((a)=>a?.appointmentstatus !== "requested")?.length, // replace later with size(customers),
    custom: true,
  }
//   const { SearchBar } = Search

useEffect(() => {
    const onGetAllAppointmentDetails = async () => {
        const RequestRes = await getAllAppointmentRequestById({
          userID: currentAttorney._id,
        })
        if (RequestRes.success) {
          setAppointmentUser(RequestRes.appointment)
        } else {
          setAppointmentUser([])
        }
        console.log("appointment", RequestRes)
      }
    onGetAllAppointmentDetails()
  }, [currentAttorney])
  

 

  return (
    <React.Fragment>
        {loading ? (
          <ChatLoader />
        ) : appointmentUser && appointmentUser.length > 0 ? (
          <div >
            <Row>
              <Col className="col-12">
                <Card>
                  <CardBody>
                    <PaginationProvider
                      pagination={paginationFactory(pageOptions)}
                      keyField="_id"
                      columns={columns}
                      data={appointmentUser.filter((a)=>a?.appointmentstatus !== "requested")}
                    >
                      {({ paginationProps, paginationTableProps }) => (
                        <ToolkitProvider
                          keyField="_id"
                          columns={columns}
                          data={appointmentUser.filter((a)=>a?.appointmentstatus !== "requested")}
                        >
                          {toolkitProps => (
                            <React.Fragment>

                              <Row>
                                <Col xl="12">
                                  <div className="table-responsive">
                                    <BootstrapTable
                                      keyField={"_id"}
                                      responsive
                                      bordered={false}
                                      striped={false}
                                      defaultSorted={defaultSorted}
                                      // selectRow={selectRow}
                                      classes={
                                        "table align-middle table-nowrap"
                                      }
                                      headerWrapperClasses={"thead-light"}
                                      {...toolkitProps.baseProps}
                                      {...paginationTableProps}
                                    />
                                  </div>
                                </Col>
                              </Row>

                              <Row className="align-items-md-center mt-30">
                                <Col className="inner-custom-pagination d-flex">
                                  <div className="d-inline">
                                    <SizePerPageDropdownStandalone
                                      {...paginationProps}
                                    />
                                  </div>
                                  <div className="text-md-right ms-auto">
                                    <PaginationListStandalone
                                      {...paginationProps}
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </React.Fragment>
                          )}
                        </ToolkitProvider>
                      )}
                    </PaginationProvider>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        ) : (
          <p className="text-center">You Don&apos;t have any Appointment User</p>
        )}
    </React.Fragment>
  )
}

export default ReqUserAppointmentDetails
