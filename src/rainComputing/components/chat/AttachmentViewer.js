import React, { useState } from "react"
import PropTypes from "prop-types"
import "./style/attachment-viewer.scss"
import ImageViewer from "./ImageViewer"
import { SERVER_URL } from "rainComputing/helpers/configuration"
import { getFileFromGFS } from "rainComputing/helpers/backend_helper"
import fileDownload from "js-file-download"
const AttachmentViewer = ({ attachments, text }) => {
  const [audioUrl, setAudioUrl] = useState(null)
  const handleFileDownload = ({ id, filename }) => {
    getFileFromGFS({ id }, { responseType: "blob" }).then(res => {
      fileDownload(res, filename)

      // Create a new audio object URL
      const audioBlob = new Blob([res])
      setAudioUrl(URL.createObjectURL(audioBlob))
    })
  }
  return (
    <div className="att_wrapper">
      {attachments?.map((att, a) => (
        <div key={a} className="att_item">
          {att?.type?.includes("image") ? (
            <ImageViewer imgData={att} />
          ) : (
            <div key={a} className="">
              {att?.type?.includes("pdf") ? (
                <a
                  href={`${SERVER_URL}/file/${att?.id}`}
                  download={att?.name}
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
              ) : (
                <div className="aligner_item">
                  <i
                    className="mdi mdi-music text-success mdi-36px"
                    onClick={() =>
                      handleFileDownload({
                        id: att?.id,
                        filename: att?.name,
                      })
                    }
                  />
                  
                  <div style={{ wordBreak: "break-all" }}> {att?.name} </div>
                  
                </div>
              )}
              
            </div>
          )}
        </div>
        
      ))}
      <div className="p">
      {audioUrl && (
                    <audio
                      src={audioUrl}
                      controls
                      className="d-block d-sm-none"
                      style={{
                        height: "40px",
                        paddingRight: "164px",
                        marginLeft: "-18px",
                        paddingTop: "6px",
                  
                      }}
                    />
                  )}
                  {audioUrl && (
                    <audio
                      src={audioUrl}
                      controls
                      className="d-none d-sm-block"
                    />
                  )}</div>
    </div>
  )
}
AttachmentViewer.propTypes = {
  attachments: PropTypes.array,
  text: PropTypes.string,
}
export default AttachmentViewer
