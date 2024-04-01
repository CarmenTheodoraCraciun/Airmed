import Header from "../components/Header.tsx";
import TextIntro from "../components/TextIntro.tsx";
import Accordion from "../components/Accordion.tsx";
import img from "../resources/img/img-3.png";

function ArePsychiatrist(){
    return (
        <>
            <Header/>
            <main>
                <div className="about-us">
                    <div className="about-us-1">
                        <TextIntro intro2="Iar noi suntem aici pentru a te ajuta să  îți menții toți pacineții aproape."
                                   intro3="Terapia nu se oprește când ieși din cabinetul medicului. "/>
                        <Accordion title="Cum mă poate ajuta această aplicație?">
                            <p>
                                Nu mereu pacienții sunt dispuși să își împărtășească toate trăirele, mai ales dacă a trecut un timp de când le-au avut. Ca și medic, trebuie să știi exact dacă schema de tratament funcționează și dacă pacientul chiar ține cont de ele. Astfel, noi venim ca un ajutor, prin creearea de facilități ale pacienților pe care să le poți vizualiza în timp real și din care să ai niște răspunsuri mai concrete.
                            </p>
                        </Accordion>
                        <Accordion title="Cum îmi fac cont?">
                            <p>
                                Accesând link-ul <a href='/create-psychiatrist' >acesta</a> și competând cu atenție toate datele din formularul resprectiv.
                            </p>
                        </Accordion>
                        <Accordion title="Cum adaug un utilizator în lista pacienților mei?">
                            <p>Primul pas este ca atât tu, cât și viitorul pacinet să aveți conturi create. Ai nevoie de un cont de medic pentru a putea adăga pacienți. Dacă nu știi cum se poate crea, ai mai sus un tutorial.</p>
                            <p>Al doilea pas este să te conectezi în aplicație, iar în partea de sus a paginii ce se va deschide să apeși butonul ”Adaugă pacient”. Îți va apărea o nouă componentă în pagină unde va trebui să completezi CNP-ul (Codul Numeric Personal) al pacientului, după care va trebui să apeși ”Adaugă”.</p>
                                <p>Dacă datele introduse conincid cu ale unui utilizator existent, atunci vei primi confirmarea cereri de a deveni medicul persoanei respective.</p>
                                <p>Ulterior, pacientul va trebui să se conecteze în aplicație și să confirme acceptarea cererii.</p>
                        </Accordion>
                    </div>
                    <img id="img-1" src={img}/>
                </div>
            </main>
        </>
    )
}
export default ArePsychiatrist;