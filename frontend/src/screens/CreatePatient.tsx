import Header from "../components/Header.tsx";
import Message from "../components/Message.tsx";
import Form from "../components/Form.tsx";

import img from '../resources/img/img-4.png';
function CreatePatient(){
    return <>
        <Header/>
        <main className="conteiner-create-acc">
            <div>
                <div className="align-start">
                    <Message type="warn" content={
                        <>
                            <p className="message-content">Aici poți crea doar conturi de pacient.</p>
                            <p className="message-content">Dacă ești un medic urmează link-ul următor pentru creare contului special: <a className="message-link" href="/create-psychiatrist">link</a>.</p>
                            <p className="message-content">Dacă ești psihoterapeut urmează link-ul următor pentru creare contului special:  <a className="message-link" href="/crete-psychotherapist">link</a>.</p>
                        </>
                    } />
                    <Message type="error" content={
                        <>
                            <p className="message-content">
                                Numele și CNP-ul nu mai pot fi modificate. Verifică corectitudinea lor înainte de a crea contul.
                            </p>
                        </>
                    } />
                </div>
                <Form type="patient"/>
            </div>
            <img id="img-2" src={img}/>
        </main>
    </>;
}
export default CreatePatient;