import React from 'react';

import warnIcon from '../resources/img/warning.png';
import errorIcon from '../resources/img/error.png';
import infoIcon from '../resources/img/exclamation.png';

interface MessageProps {
    type: 'info' | 'warn' | 'error' | 'success';
    content: React.ReactNode;
}

const Message: React.FC<MessageProps> = ({ type, content }) => {
    let iconSrc = '';

    switch (type) {
        case 'info':
            iconSrc = infoIcon;
            break;
        case 'warn':
            iconSrc = warnIcon;
            break;
        case 'error':
            iconSrc = errorIcon;
            break;
        default:
            break;
    }

    return (
            <div className={`horizontal message-box message-box-${type}`}>
                <img className="message-icon" src={iconSrc} alt={`${type} icon`} />
                <span className="message-text">{content}</span>
            </div>
    );
};

export default Message;
