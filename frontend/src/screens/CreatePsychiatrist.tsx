import Header from "../components/Header.tsx";
import Message from "../components/Message.tsx";
import Form from "../components/Form.tsx";

function CreatePsychiatrist(){
    return <>
        <Header/>
        <main className="conteiner-create-acc">
            <div>
                <div className="align-start">
                    <Message type="warn" content={
                        <>
                            <p className="message-content">Aici poți crea doar conturi de pacient.</p>
                            <p className="message-content">Dacă ești un posibil pacient urmează link-ul următor pentru creare contului special: <a className="message-link" href="/create-patient">link</a>.</p>
                            <p className="message-content">Dacă ești psihoterapeut urmează link-ul următor pentru creare contului special:  <a className="message-link" href="/create-psychotherapist">link</a>.</p>
                        </>
                    } />
                </div>
                <Form type="psychiatrist"/>
            </div>
        </main>
    </>;
}
export default CreatePsychiatrist;