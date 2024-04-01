import Header from "../components/Header.tsx";
import Accordion from "../components/Accordion.tsx";
import TextIntro from "../components/TextIntro.tsx";

import img from '../resources/img/img-3.png';

function AboutUs(){
    return (
        <>
            <Header/>
            <main>
                <div className="about-us">
                    <div className="about-us-1">
                        <TextIntro intro2="Iar noi suntem aici pentru a te ajuta să  treci prin viață cu brio."
                                   intro3="Terapia nu e doar pentru cei care au gânduri urâte."/>
                        <Accordion title="Cum pot obține terapie gratuită în România?">
                            <p><ol>
                                <li>Poți solicita de la medicul de familie un bilet de trimitere către Psihiatrie, decontat de CNAS (Casa Națională de Asigurări de Sănătate). Cu acest bilet îți poți programa un consult la un medic psihiatru ce lucrează cu CNAS. Ulterior, medicul te va redirecționa către un psihoterapeut cu care lucrează, alături de trimitere către consiliere.</li>
                                <li>Poți solicita un bilet de tratament de la Casa Națională de Pensii Publice (CNPP), dacă ești pensionar. Pentru aceasta trebuie să depui o cerere tip la CNPP și să prezinți actul de identitate și talonul de plată a pensiei.</li>
                                <li>Poți căuta un psiholog care oferă ședințe gratuite sau la preț redus, în cadrul unor programe de voluntariat sau de formare profesională.</li>
                            </ol></p>
                        </Accordion>
                        <Accordion title="Care sunt diferențele dintre un medic psihiatru și un psihoterapeut?">
                            <p>Un medic psihiatru și un psihoterapeut sunt doi specialiști care se ocupă de sănătatea mintală a oamenilor, dar au diferențe importante în pregătirea și metodele lor de tratament.</p>
                            <p>Un <b>medic psihiatru</b> este un doctor care a absolvit o facultate de medicină și o specializare în psihiatrie. El este singurul care poate prescrie medicamente psihiatrice, cum ar fi anxiolitice, antidepresive sau antipsihotice. El poate trata pacienți cu afecțiuni psihice severe, care necesită internare sau supraveghere medicală. O consultație la psihiatru durează de obicei între 10 și 30 de minute și are loc rar.</p>
                            <p>Un <b>psihoterapeut</b> este un specialist care a absolvit o facultate de psihologie sau o altă știință umanistă și a urmat o formare suplimentară într-o anumită școală de psihoterapie. El nu poate prescrie medicamente, ci folosește metode verbale sau non-verbale pentru a ajuta pacienții să își rezolve problemele emoționale, comportamentale sau relaționale. El poate trata pacienți cu afecțiuni psihice ușoare sau moderate, care nu necesită internare. O ședință de psihoterapie durează de obicei între 45 și 60 de minute și are loc frecvent.</p>
                        </Accordion>
                    </div>
                <img id="img-1" src={img}/>
                </div>
            </main>
        </>
    )
}

export default AboutUs;