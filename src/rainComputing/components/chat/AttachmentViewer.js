import React from "react"
import PropTypes from "prop-types"
import "./style/attachment-viewer.scss"
import ImageViewer from "./ImageViewer"
import { SERVER_URL } from "rainComputing/helpers/configuration"

const AttachmentViewer = ({ attachments, text }) => {
  return (
    <div className="att_wrapper">
      {attachments?.map((att, a) => (
        <div key={a} className="att_item">
          {att.type.includes("image") ? (
            <ImageViewer imgData={att} />
          ) : (
            <a
              href={`${SERVER_URL}/file/${att?.id}`}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="att_file aligner"
            >
              <div className="aligner_item">
                <i
                  className="mdi mdi-file-pdf mdi-36px text-center"
                  style={{ color: "red", padding: 2 }}
                />
                <div style={{ wordBreak: "break-all" }}>{att?.name}</div>
              </div>
            </a>
          )}
        </div>
      ))}
    </div>
  )
}

AttachmentViewer.propTypes = {
  attachments: PropTypes.array,
  text: PropTypes.string,
}

export default AttachmentViewer
