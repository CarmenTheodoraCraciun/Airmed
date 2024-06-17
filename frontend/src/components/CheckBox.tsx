import {ChangeEvent, FC} from 'react';

interface CheckboxGroupProps {
    label: string;
    name: string;
    checked: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxGroup: FC<CheckboxGroupProps> = ({ label, name, checked, onChange }) => {
    return (
        <label className="material-checkbox">
            <input type="checkbox" name={name} checked={checked} onChange={onChange} />
            <span className={`checkmark ${checked ? 'checked' : ''}`}></span>
            {label}
        </label>
    );
}

export default CheckboxGroup;
