export default function Searchbox ({input, onType}) {
    return(
        <div className="searchbox">  
            <label>
                Restaurant Name: <br/>
                <input className="inputBox" type='text' placeholder="Search Restaurant..." value={input} onChange={(e) => onType(e.target.value)}></input>
            </label>
        </div>
    )
}