import React, { useEffect, memo } from "react"
import PropTypes from "prop-types"
import { SERVER_URL } from "rainComputing/helpers/configuration"

const ImageViewer = ({ imgData }) => {
  return (
    <a
      href={`${SERVER_URL}/file/${imgData?.id}`}
      download={imgData?.name}
      target="_blank"
      rel="noopener noreferrer"
      className="att_file"
    >
      <img
        src={`${SERVER_URL}/file/${imgData?.id}`}
        alt={imgData?.name}
        className="att_file"
      />
    </a>
  )
}
ImageViewer.propTypes = {
  imgData: PropTypes.object,
}
export default memo(ImageViewer)
