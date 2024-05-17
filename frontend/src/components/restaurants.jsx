import Restaurant from './restaurant'

export default function Restaurants ({dataArray, emptyInput}) {
    let information;
    if (dataArray && dataArray.length > 0) {
        information = dataArray.map((info, key) => {
            return <Restaurant data={info} key={key}></Restaurant>;
        });
    } else {
        if (!emptyInput) information = <p style={{fontSize:20, alignItems:'end'}}>No results found</p>
    }
    return (<div className="restaurants">{information}</div>)

}