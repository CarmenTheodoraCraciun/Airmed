export default function Widget() {
    return (
        <div className="flex flex-col items-center space-y-4 p-4">
            <div id="energyLevelLabel" className="text-lg font-semibold">Nivelul meu de energie este sus azi.</div>
            <div className="flex space-x-2">
                <label className="flex flex-col items-center">
                    <input type="radio" name="energy" value="1" className="form-radio h-5 w-5 text-blue-600"/>
                    <span className="text-sm">1</span>
                </label>
                <label className="flex flex-col items-center">
                    <input type="radio" name="energy" value="2" className="form-radio h-5 w-5 text-zinc-300"/>
                    <span className="text-sm">2</span>
                </label>
                <label className="flex flex-col items-center">
                    <input type="radio" name="energy" value="3" className="form-radio h-5 w-5 text-zinc-300"/>
                    <span className="text-sm">3</span>
                </label>
                <label className="flex flex-col items-center">
                    <input type="radio" name="energy" value="4" className="form-radio h-5 w-5 text-zinc-300"/>
                    <span className="text-sm">4</span>
                </label>
                <label className="flex flex-col items-center">
                    <input type="radio" name="energy" value="5" className="form-radio h-5 w-5 text-zinc-300"/>
                    <span className="text-sm">5</span>
                </label>
            </div>
        </div>
    )
}