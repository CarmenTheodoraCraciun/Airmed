import logoImage from '../resources/logo.png';

function Logo() {
    const isLog = sessionStorage.getItem('patient')
        || sessionStorage.getItem('psychiatrist')
        || sessionStorage.getItem('psychotherapist');
    const homePath = isLog !== null? "/home" : "/about-us";
    return (
        <div className="logo horizontal">
            <a href={homePath} className="logo-link horizontal" id="home-link">
                <img id="logo-img" src={logoImage} alt="Our logo" />
                <div className="logo-name vertical">
                    <span className="logo-name" id="logo-name-airmed">Airmed</span>
                    <span className="logo-name" id="logo-name-heal-up">heal up</span>
                </div>
            </a>
        </div>
    );
}

export default Logo;
