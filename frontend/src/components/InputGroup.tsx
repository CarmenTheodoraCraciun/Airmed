import React from 'react';

interface InputGroupProps {
    label: string;
    name: string;
    type: string;
    value: string;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    error: string;
}

const InputGroup: React.FC<InputGroupProps> = ({ label, name, type, value, placeholder, onChange, error }) => {
    return (
        <div className="input-group-mf">
            <span className="input-span">{label}</span>
            <input
                className="input-mf"
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                autoComplete="off"
            />
            <br/>
            {error && <span className="error error-form">{error}</span>}
        </div>
    );
}

export default InputGroup;