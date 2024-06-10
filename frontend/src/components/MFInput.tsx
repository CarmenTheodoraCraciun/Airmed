import {ChangeEvent, FC} from "react";

interface MFInputProps {
    inputName: string;
    initialValue: string | null;
    onChange: (value: string) => void;
    error?: string;
}

const MFInput: FC<MFInputProps> = ({ inputName, initialValue, onChange, error }) => {
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
            {error && <span className="error error-form">{error}</span>}
        </div>
    );
}

export default MFInput;