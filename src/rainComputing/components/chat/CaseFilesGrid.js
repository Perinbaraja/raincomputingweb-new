import React, { useEffect, useState } from "react"
import { Row, Col, Card, CardBody, CardTitle } from "reactstrap"
import MetaTags from "react-meta-tags"
import PropTypes from "prop-types"

// datatable related plugins
import BootstrapTable from "react-bootstrap-table-next"
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
  SizePerPageDropdownStandalone,
} from "react-bootstrap-table2-paginator"

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit"

import fileDownload from "js-file-download"

//Import Breadcrumb
import "./style/datatables.scss"
import {
  getCaseFiles,
  getFileFromGFS,
} from "rainComputing/helpers/backend_helper"
import ChatLoader from "./ChatLoader"
import moment from "moment"

const CaseFilesGrid = ({ caseId }) => {
  const [loading, setLoading] = useState(false)
  const [productData, setProductData] = useState([])

  const nameFormatter = (cell, row) => {
    if (row?.type === "jpeg" || row?.type === "png" || row?.type === "jpg") {
      return (
        <span>
          <i className="mdi mdi-file-image-outline text-primary mdi-24px" />{" "}
          {cell}
        </span>
      )
    }
    if (row?.type === "pdf") {
      return (
        <span>
          <i className="mdi mdi-file-pdf-outline text-danger mdi-24px" /> {cell}
        </span>
      )
    }
    if (row?.type === "csv") {
      return (
        <span>
          <i className="mdi mdi-file-excel-outline text-success mdi-24px" />{" "}
          {cell}
        </span>
      )
    }
    return (
      <span>
        <i className="mdi mdi-file-outline text-success mdi-24px" /> {cell}
      </span>
    )
  }

  const typeFormatter = (cell, row) => {
    return cell
  }

  const sizeFormatter = (cell, decimals = 2) => {
    if (cell === 0) return "0 Bytes"

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(cell) / Math.log(k))

    return parseFloat((cell / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }

  const downloadFormatter = (cell, row) => {
    console.log("downloadFormatter:", cell)
    return cell ? (
      <i className="mdi mdi-loading mdi-spin text-info mdi-24px" />
    ) : (
      <i className="mdi mdi-download text-primary mdi-24px" />
    )
  }

  const handleFileDownload = async ({ id, filename }) => {
    getFileFromGFS(
      { id },
      {
        responseType: "blob",
      }
    ).then(res => {
      fileDownload(res, filename)
    })
  }

  const columns = [
    {
      dataField: "name",
      text: "Name",
      sort: true,
      formatter: nameFormatter,
    },
    {
      dataField: "type",
      text: "Type",
      sort: true,
      formatter: typeFormatter,
    },
    {
      dataField: "time",
      text: "Time",
      sort: true,
    },
    {
      dataField: "size",
      text: "Size",
      sort: true,
      formatter: sizeFormatter,
    },
    {
      dataField: "senderName",
      text: "Sender Name",
      sort: true,
    },
    {
      dataField: "isDownloading",
      //   isDummyField: true,
      text: "Download",
      formatter: downloadFormatter,
      headerAlign: "center",
      style: {
        textAlign: "center",
      },
      events: {
        onClick: async (e, column, columnIndex, row, rowIndex) => {
          await handleFileDownload({
            id: row?.id,
            filename: row?.name,
          })
        },
      },
    },
  ]

  const defaultSorted = [
    {
      dataField: "name",
      order: "asc",
    },
  ]

  // Custom Pagination Toggle
  const sizePerPageList = [
    { text: "5", value: 5 },
    { text: "10", value: 10 },
    { text: "25", value: 20 },
    { text: "50", value: 25 },
    { text: "All", value: productData.length },
  ]

  const pageOptions = {
    sizePerPage: 10,
    totalSize: productData.length, // replace later with size(customers),
    custom: true,
    sizePerPageList,
  }

  // Select All Button operation

  const { SearchBar } = Search

  const handleFetchFiles = async () => {
    setLoading(true)
    const filesRes = await getCaseFiles({ caseId })
    if (filesRes.success && filesRes?.files?.length > 0) {
      let tempArray = []
      filesRes?.files?.map(f => {
        const sendAt = moment(f.time).format("DD-MM-YY HH:mm")
        tempArray.push({ ...f, time: sendAt, isDownloading: false })
      })
      setProductData(tempArray)
    } else {
      console.log("File Fetching Error :", filesRes)
    }
    setLoading(false)
  }

  useEffect(() => {
    handleFetchFiles()

    return () => {
      setLoading(false)
      setProductData([])
    }
  }, [])

  return (
    <React.Fragment>
      <MetaTags>
        <title>RC | Case Files </title>
      </MetaTags>
      <div>
        {loading ? (
          <ChatLoader />
        ) : productData && productData.length > 0 ? (
          <Row>
            <Col className="col-12">
              <Card>
                <CardBody>
                  <PaginationProvider
                    pagination={paginationFactory(pageOptions)}
                    keyField="id"
                    columns={columns}
                    data={productData}
                  >
                    {({ paginationProps, paginationTableProps }) => (
                      <ToolkitProvider
                        keyField="id"
                        columns={columns}
                        data={productData}
                        exportCSV={{
                          fileName: "custom.csv",
                          separator: "|",
                          ignoreHeader: true,
                          noAutoBOM: false,
                        }}
                        search
                      >
                        {toolkitProps => (
                          <React.Fragment>
                            <Row className="mb-2">
                              <Col md="4">
                                <div className="search-box me-2 mb-2 d-inline-block">
                                  <div className="position-relative">
                                    <SearchBar {...toolkitProps.searchProps} />
                                    <i className="bx bx-search-alt search-icon" />
                                  </div>
                                </div>
                              </Col>
                            </Row>

                            <Row>
                              <Col xl="12">
                                <div className="table-responsive">
                                  <BootstrapTable
                                    keyField={"id"}
                                    responsive
                                    bordered={false}
                                    striped={false}
                                    hover
                                    condensed
                                    defaultSorted={defaultSorted}
                                    classes={"table align-middle table-nowrap"}
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
        ) : (
          <p className="text-center">You Don&apos;t have any Shared files</p>
        )}
      </div>
    </React.Fragment>
  )
}

CaseFilesGrid.propTypes = {
  caseId: PropTypes.string,
}

export default CaseFilesGrid
