import React, { useEffect, useState } from 'react'
import PropTypes from "prop-types"
import { useChat } from 'rainComputing/contextProviders/ChatProvider';
import { getMessagesByUserIdandGroupId } from 'rainComputing/helpers/backend_helper';
import { useUser } from 'rainComputing/contextProviders/UserProvider';

const LinksModel = () => {
   const [messages,setMessages] = useState([])
   const {currentUser} = useUser()
   const {
   
    currentRoom: currentChat,   

   
   }
  = useChat()
  console.log("currentChat",currentChat)
  
      const handlegetlinkmessages= async () => {
    if(currentChat?.isGroup) {
        const payload = {
          caseId: currentChat?.caseId,
          userId: currentUser?.userID,
        }
        const res = await getMessagesByUserIdandGroupId(payload)
        if (res.success) {
          setMessages(res.groupMessages)
        } else {
        //   console.log("Failed to fetch Group message", res)
        //   setNoNewMessage(res.groupMessages)
        }
    }else {
        const payload = {
            groupId: currentChat?._id,
            userId: currentUser?.userID,
          }
          const res = await getMessagesByUserIdandGroupId(payload)
          if (res.success) {
            setMessages(res.groupMessages)
          } else {
          //   console.log("Failed to fetch Group message", res)
          //   setNoNewMessage(res.groupMessages)
          } 
    }
      }

      useEffect(()=>{
        handlegetlinkmessages()
      },[])
    const regex = /<a href="([^"]+)"/; 

  const filteredMessages = messages.filter(message => {
    const messageData = message.messageData;

    return regex.test(messageData);
  }); 
  console.log("filteredMessages", filteredMessages)
    return (
        <div>
            {filteredMessages?.length > 0 ? (
                <div>
                    {filteredMessages.map((links, i) => (
                        <div key={i}
                            style={{
                                whiteSpace: "break-spaces",
                            }}
                            dangerouslySetInnerHTML={{
                                __html: links?.messageData,
                            }}
                        />
                    ))}
                </div>
            ) : (
                <div className="d-flex justify-content-center">
                    <p>Dont have a any links</p>
                </div>
            )}
        </div>
    )
}


export default LinksModel