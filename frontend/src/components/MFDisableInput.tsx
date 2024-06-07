import React from 'react';

interface MFDisableInputProps {
    inputName: string;
    initialValue: string;
}

const MFDisableInput: React.FC<MFDisableInputProps> = ({ inputName, initialValue }) => {
    return (
        <div className="input-group-mf">
            <span className="input-span">{inputName}</span> <br/>
            <input className="input-mf-disable" type="text" value={initialValue} readOnly />
        </div>
    );
}

export default MFDisableInput;
