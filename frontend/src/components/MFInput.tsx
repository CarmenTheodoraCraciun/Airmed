import React, { ChangeEvent } from 'react';

interface MFInputProps {
    inputName: string;
    initialValue: string | null;
    onChange: (value: string) => void;
}

const MFInput: React.FC<MFInputProps> = ({ inputName, initialValue, onChange }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return (
        <div className="input-group-mf">
            <span className="input-span">{inputName}</span> <br/>
            <input
                className="input-mf"
                type="text"
                placeholder={initialValue !== null ? initialValue : ''}
                onChange={handleChange}
            />
        </div>
    );
}

export default MFInput;