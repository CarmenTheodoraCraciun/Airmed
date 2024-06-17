import {ChangeEvent, FC} from "react";

interface TextAreaGroupProps {
    label: string;
    name: string;
    value: string;
    placeholder: string;
    onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
    error?: string;
}

const TextAreaGroup: FC<TextAreaGroupProps> = ({ label, name, value, placeholder, onChange, error }) => {
    return (
        <div className="textarea-group-mf">
            <span className="textarea-span">{label}</span>
            <textarea
                className="textarea-mf"
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

export default TextAreaGroup;