import Header from "../components/Header.tsx";
import noData from "../resources/img/no-data.png";

function PatientHome(){
    return (
        <>
            <Header/>
            <main>
                <span className="intro">Terapia nu e doar pentru cei care au gânduri urâte.</span>
                <div className="horizontal-1">
                    <div className="vertical-1">
                        Graficul stărilor fluctuante
                        <img id="big-graph-img" src={noData} alt=""/>
                    </div>
                    <div className="vertical-1">
                        <button className="feeling-btn">Cum te simți azi? Adaugă stare</button>
                        <textarea placeholder="Ce te apasă zilele astea?"></textarea>
                        <button className="button-1">Salvează</button>
                    </div>
                </div>
            </main>
        </>
    )
}

export default PatientHome;