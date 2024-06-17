import {FC} from 'react';

interface Props {
    inputName: string;
    initialValue: string;
}

const InputGroupDisable: FC<Props> = ({ inputName, initialValue }) => {
    return (
        <div className="input-group-mf">
            <span className="input-span">{inputName}</span> <br/>
            <input className="input-mf-disable" type="text" value={initialValue} readOnly />
        </div>
    );
}

export default InputGroupDisable;
