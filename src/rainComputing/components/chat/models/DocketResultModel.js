import React, { useEffect, useState } from "react"
import PropTypes, { any } from "prop-types"
import { getAllEvent, getTrademarkSearchDetails } from "rainComputing/helpers/backend_helper"
import moment from "moment"
import { join } from "lodash"

const DocketResultModel = ({ caseId }) => {
  const [docketSearch, setDocketSearch] = useState([])
  const [allEvents, setAllEvents] = useState([])
  // const tradeMark = docketSearch?.map((search) => search?.status === "trademark");
  const attNumber = docketSearch?.map(search => search?.status)
  // const event = docketSearch?.map((search) =>
  //   search?.prosecutionHistory?.map((search2) => search2?.entryDesc)
  // );
  // const docket = docketSearch?.map((search) =>
  //   search?.status?.physicalLocationHistory?.map((search2) => search2?.eventDate)
  // );
  const name = docketSearch?.map(name =>
    name?.parties?.ownerGroups?.[10]?.map(name2 => name2?.name)
  )
  const desription = docketSearch?.map(search => search?.status?.markElement)
  // const events=caseId?.events?.map((m) => m?.docEvent)
  const handleSearch = async () => {
    const payload = {
      serialNumber: caseId?.serialNumber,
    }
    const res = await getTrademarkSearchDetails(payload)
    if (res) {
      setDocketSearch(res?.trademarks)
    }
  }
const getAllCaseEvents =async ()=>{
  const payload ={
    caseId:caseId?._id
  }
  const res = await getAllEvent(payload)
  if (res.success) {
    setAllEvents(res?.events)
  }
}
  useEffect(() => {
    handleSearch()
  }, [])
  useEffect(() => {
    getAllCaseEvents()
  }, [])

  const timestamp = allEvents?.map(m => m?.docDate)
  const dateOnlyArray = timestamp.map(
    timestamp => new Date(timestamp).toISOString().split("T")[0]
  )
  const sortedDates = dateOnlyArray.sort((a, b) => new Date(a) - new Date(b))

  return (
    <div style={{ height: "500px", overflowY: "scroll", display: "block" }}>
     
        <p>Length of the Results ({allEvents?.length})</p>
    
      <table className="table table-striped">
        <thead
          style={{ position: "sticky", top: "1px" }}
          className="bg-primary text-white"
        >
          <tr>
            <th scope="col">All/None</th>
            <th scope="col">Docketing Event Date</th>
            <th scope="col">Attorney Docket Number</th>
            <th scope="col">Docketing Event</th>
            <th scope="col">Reference Number</th>
            <th scope="col">Record Type</th>
            <th scope="col">Description</th>
            <th scope="col">Client</th>
            <th scope="col">PTO status</th>
          </tr>
        </thead>

        {allEvents?.map((data, i) => (
          <tbody style={{ fontSize: "10px" }} key={i}>
            <React.Fragment>
              <tr>
                <th scope="row">
                  <input type="checkbox" />
                </th>
                <td>{sortedDates[i]}</td>
                {attNumber?.map((no, i) => (
                  <td key={i}>{no?.attrnyDktNumber}</td>
                ))}
               <td>{data?.eventText}</td>
                {docketSearch?.map((ref, i) => (
                  <td key={i}>{ref?.publication?.serialNumber}</td>
                ))}
                <td>Trademarks</td>
                <td>{desription}</td>
                <td>{name}</td>
                <td>{data?.docEvent}</td>
              </tr>
            </React.Fragment>
          </tbody>
        ))}
      </table>
    </div>
  )
}

DocketResultModel.propTypes = {
  caseId: PropTypes.func,
  data: PropTypes.any,
}

export default DocketResultModel
