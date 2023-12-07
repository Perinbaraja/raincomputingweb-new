import React from "react"
import PropTypes from "prop-types"
import { useCallback, useState } from "react"
import ReactQuill from "react-quill"
import "quill-emoji/dist/quill-emoji.css";
import EmojiBlot from "quill-emoji/dist/quill-emoji"
import Quill from 'quill';
import "react-quill/dist/quill.snow.css";

const ReactQuillInput = ({
  value,
  onChange,
  mentionsArray,
  messages,
  curMessageId,
  isQuill,
  onKeyPress,
  isEmptyOrSpaces,
  setModalOpen,
  isFullScreen,
  currentChat,
  currentCase,
  getChatName,
  inputBoxHeight,

}) => {

  console.log("currentChat",currentChat)
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
  Quill.register("modules/emoji", EmojiBlot);
  let modules1 = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
      [{ emoji: true }],
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
    "emoji-toolbar": true,
    "emoji-shortname": true,
  }
  const place =currentChat?.isGroup
    ? currentCase?.caseName || "Case Chat"
    : getChatName(currentChat.groupMembers)
  const placeholder =`Message ${place}`;


  return (
    <div style={{ position: "relative" }}>
      {isQuill && (
        <ReactQuill
          theme="snow"
          className="quil"
          value={value}
          onKeyDown={onKeyPress}
          modules={modules}
          placeholder={placeholder}
          defaultValue={messages?.find(
            m => m._id === curMessageId?.messageData
          )}
          disabled={() => isEmptyOrSpaces()}
          // onChange={(content, delta, source, editor) => {
          //   onChange(content, delta, source, editor)
          // }}
          onChange={onChange}
          style={{
            flex: 1,
            // border: "2px solid #9BAADD",
            // borderRadius: "10px",
            height: inputBoxHeight,
            // overflow: "hidden",
            // wordWrap: "break-word",
            wordBreak: "break-word",
            overflowWrap: "break-word",
            whiteSpace: "pre-line",
          }}
        />
      )}
      {!isQuill && (
        <ReactQuill
          theme="snow"
          className="quil"
          value={value}
          onKeyDown={onKeyPress}
          modules={modules1}
          placeholder={placeholder}
          defaultValue={messages?.find(
            m => m._id === curMessageId?.messageData
          )}
          disabled={() => isEmptyOrSpaces()}
          // onChange={(content, delta, source, editor) => {
          //   onChange(content, delta, source, editor)
          // }}
          onChange={onChange}
          style={{
            flex: 1,
            // border: "2px solid #9BAADD",
            // borderRadius: "10px",
            height: inputBoxHeight,
            // overflow: "hidden",
            // wordWrap: "break-word",
            wordBreak: "break-word",
            overflowWrap: "break-word",
            whiteSpace: "pre-line",
          }}
        />
      )}
      {!isQuill && isFullScreen   &&(
        <ReactQuill
          theme="snow"
          className=""
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
          style={{
            flex: 1,
            // border: "2px solid #9BAADD",
            // borderRadius: "10px",
            height: inputBoxHeight,
            // overflow: "hidden",
            // wordWrap: "break-word",
            wordBreak: "break-word",
            overflowWrap: "break-word",
            whiteSpace: "pre-line",
          }}
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
  setModalOpen: PropTypes.any,
  isFullScreen: PropTypes.any,
  currentChat:PropTypes.any,
  currentCase:PropTypes.any,
  getChatName:PropTypes.any,
  inputBoxHeight: PropTypes.any,
}

export default ReactQuillInput
