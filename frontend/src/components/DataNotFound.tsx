const DateNotFound = () => {
    return (
        <div className="date-not-found">
            <div className="icon">&#x1F50D;</div> {/* Unicode character for magnifying glass */}
            <h2>Oops! Date negăsite</h2>
            <p>Ne pare rău, dar nu am găsit datele pe care le căutați.</p>
            <p>Vă rugăm să verificați dacă ați introdus corect informațiile și să încercați din nou.</p>
            <button className="retry-button" onClick={() => window.location.reload()}>Încercați din nou</button>
        </div>
    );
}

export default DateNotFound;
