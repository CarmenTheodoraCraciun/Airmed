import Logo from "./Logo.tsx";
import {useNavigate} from "react-router-dom";
function Header(){
    const navigate = useNavigate();
    function handleNewButtonClick() {
        navigate('/create-patient');
    }

    function handleLoginButtonClick(){
        navigate('/login');
    }

    return <header>
        <div className="header-all">
            <Logo/>
            <ul className="header-ul">
                <li>
                   <a href="/home" className="header-el">Despre noi</a>
                </li>
                <li>
                    <a href="/psychiatrist" className="header-el">Esti medic psihiatru?</a>
                </li>
                <li>
                    <a href="/psychotherapist" className="header-el">Esti psihoterapeut?</a>
                </li>
                <li>
                    <button className="button-header" onClick={handleNewButtonClick}>Esti nou?</button>
                </li>
                <li>
                    <button className="button-header" onClick={handleLoginButtonClick}>Conectează-te</button>
                </li>
            </ul>
        </div>
    </header>
}

export default Header;