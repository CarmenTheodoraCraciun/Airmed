interface Props {
    text: string;
    onClose: () => void;
}

function Notify({ text, onClose }: Props) {
    return (
        <div className="notify-box">
            <button className="cancel-notify-button" onClick={onClose}>×</button>
            <span className="notify-text">{text}</span>
        </div>
    );
}

export default Notify;