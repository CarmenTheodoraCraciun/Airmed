interface TextIntroProps {
    intro2: string;
    intro3: string;
}
function TextIntro({intro2, intro3}: TextIntroProps){
    return <>
        <p id="intro-1"><span id="span-1">Airmed</span> este, în mitologia irlandeză, zeița vindecării.</p>
        <p id="intro-2">{intro2}</p>
        <p id="intro-3">{intro3}</p>
    </>
}
export default TextIntro;