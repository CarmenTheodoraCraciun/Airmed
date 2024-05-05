import React from 'react';

interface MFDisableInputProps {
    inputName: string;
    placeholderValue: string;
}

const MFDisableInput: React.FC<MFDisableInputProps> = ({ inputName, placeholderValue }) => {
    return (
        <div className="input-group-mf">
            <span className="input-span">{inputName}</span> <br/>
            <input className="input-mf-disable" type="text" placeholder={placeholderValue} disabled />
        </div>
    );
}

export default MFDisableInput;
