import React from "react"
import PropTypes from "prop-types"
import { useCallback, useState } from "react"
import ReactQuill from "react-quill"
const ReactQuillInput = ({
  value,
  onChange,
  mentionsArray,
  messages,
  curMessageId,
  isQuill,
  onKeyPress,
  isEmptyOrSpaces
}) => {
  let modules = {
    toolbar: false,
    mention: {
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ["@"],
      spaceAfterInsert: true,
      source: useCallback(
        (searchTerm, renderList, mentionChar) => {
          let values
          if (mentionChar === "@") {
            values = mentionsArray?.map(m => ({ id: m?.id, value: m?.display }))
          }
          if (searchTerm.length === 0) {
            renderList(values, searchTerm)
          } else {
            const matches = values.filter(item =>
              item.value.toLowerCase().includes(searchTerm.toLowerCase())
            )
            renderList(matches, searchTerm)
          }
        },
        [mentionsArray]
      ),
    },
  }
  let modules1 = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
    mention: {
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ["@"],
      spaceAfterInsert: true,
      source: useCallback(
        (searchTerm, renderList, mentionChar) => {
          let values
          if (mentionChar === "@") {
            values = mentionsArray?.map(m => ({ id: m?.id, value: m?.display }))
          }
          if (searchTerm.length === 0) {
            renderList(values, searchTerm)
          } else {
            const matches = values.filter(item =>
              item.value.toLowerCase().includes(searchTerm.toLowerCase())
            )
            renderList(matches, searchTerm)
          }
        },
        [mentionsArray]
      ),
    },
  }

  return (
    <div style={{ position: "relative" }}>
      {isQuill && (
        <ReactQuill
          theme="snow"
          className="quil"
          value={value}
          onKeyDown={onKeyPress}
          modules={modules}
          placeholder="Enter Message..."
          defaultValue={messages?.find(
            m => m._id === curMessageId?.messageData
          )}
          disabled={() => isEmptyOrSpaces()}
          // onChange={(content, delta, source, editor) => {
          //   onChange(content, delta, source, editor)
          // }}
          onChange={onChange}
          style={{ flex: 1, border: "2px solid #9BAADD", borderRadius: "15px"  }}
        />
      )}
      {!isQuill && (
        <ReactQuill
          theme="snow"
          className="quil"
          value={value}
          onKeyDown={onKeyPress}
          modules={modules1}
          placeholder="Enter Message..."
          defaultValue={messages?.find(
            m => m._id === curMessageId?.messageData
          )}
          disabled={() => isEmptyOrSpaces()}
          // onChange={(content, delta, source, editor) => {
          //   onChange(content, delta, source, editor)
          // }}
          onChange={onChange}
          style={{ flex: 1, border: "2px solid #9BAADD", borderRadius: "15px" }}
        />
      )}
    </div>
  )
}

ReactQuillInput.propTypes = {
  mentionsArray: PropTypes.any,
  value: PropTypes.any,
  onChange: PropTypes.any,
  messages: PropTypes.func,
  curMessageId: PropTypes.any,
  isQuill: PropTypes.any,
  onKeyPress: PropTypes.any,
  isEmptyOrSpaces: PropTypes.any,
}

export default ReactQuillInput
