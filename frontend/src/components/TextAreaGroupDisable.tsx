import { FC } from 'react';

interface Props {
    label: string;
    value: string;
}

const TextAreaGroupDisable: FC<Props> = ({ label, value }) => {
    return (
        <div className="input-group-mf">
            <span className="textarea-span">{label}</span>
            <textarea
                className="textarea-mf"
                value={value}
                readOnly
            />
            <br />
        </div>
    );
}

export default TextAreaGroupDisable;
