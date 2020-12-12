import React, {forwardRef} from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

import './Message.css';

const Message = forwardRef(({ name , message }, ref) => {
    const isUser = name  === message.user;

    return (
        <div ref ={ref}>
            <Card className = {`message_card ${isUser && "user"}`}>
                <CardContent>
                    <Typography
                        color = "white"
                        variant = "h5"
                        component = "h2"
                    >
                        {message.text}
                    </Typography>
                </CardContent>
            </Card>
            <p className = {`message_user ${isUser && "messensenger_sender"}`}>
                {isUser ? "" : message.user || "Unknown User"}
            </p>
        </div>
    )
})

export default Message
