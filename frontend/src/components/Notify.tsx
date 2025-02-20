import {deleteData} from "../functions/EndPoints.ts";
import {ReactNode} from "react";

interface Props {
    text: ReactNode;
    onClose: () => void;
    type: string;
    requestId: number;
}

function Notify({ text, onClose, type, requestId }: Props) {
    async function handleDeleteRequest() {
        const response = await deleteData("/request/" + requestId);
        if(response?.status === 200) {
            alert("Alertă ștearsă.");
            window.location.reload();
        }
    }

    if(type === "alert"){
        return (
            <div className="alert-box">
                <button className="cancel-alert-button" onClick={handleDeleteRequest}>×</button>
                <p className="alert-text">{text}</p>
            </div>
        );
    }
    else if(type === "warning") {
        return (
            <div className="alert-box">
                <button className="cancel-alert-button" onClick={onClose}>×</button>
                <span className="alert-text">{text}</span>
            </div>
        );
    }
    return <></>;
}

export default Notify;