import React, { ChangeEvent } from 'react';

interface MFInputProps {
    inputName: string;
    initialValue: string | null;
    onChange: (value: string | null) => void;
}

const MFInput: React.FC<MFInputProps> = ({ inputName, initialValue, onChange }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value !== '' ? e.target.value : null);
    };

    return (
        <div className="input-group-mf">
            <span className="input-span">{inputName}</span> <br/>
            <input
                className="input-mf"
                type="text"
                value={initialValue !== null ? initialValue : ''}
                onChange={handleChange}
            />
        </div>
    );
}

export default MFInput;