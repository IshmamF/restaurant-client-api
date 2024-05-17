import './App.css';
import {useState, useEffect} from 'react';

function App() {
  const [input, setInput] = useState('');
  const [data, setData] = useState([]);
  let emptyInput;
  
  useEffect(() => {
    setTimeout(() => 
    {
    if (input.trim() !== '')
      {
        fetch("http://localhost:8080/search?restaurant_name=" + input)
        .then(info => info.json())
        .then((res) => {setData(res);})
        .catch((error) => console.log(error));
      } 
      else {
        setData([]);
      }
    }, 500);
  }, [input]);

  if (input == '') {
    emptyInput = true;
  } else {
    emptyInput = false
  }

  function onType(newInput) {
    setInput(newInput);
  }

  return (
    <>
      <style>{`
        .banner {
          text-align: center;
          background-color: black;
          color: white;
          margin-top: 0;
          padding-top: 20px;
          padding-bottom: 20px;
        }

        .searchbox {
          margin-top: 50px;
          display: flex;
          justify-content: center;
        }

        .inputBox {
          width: 50em;
          border-radius: 5px;
          padding: 12px;
          border: 1px solid gainsboro;
          outline-color: black;
        }

        .restaurants {
          display: flex;
          flex-direction: column;
          align-items: center; 
          padding: 20px; 
        }

        .restaurant {
          width: 100%; 
          max-width: 600px; 
          margin-bottom: 20px;
          border: 1px solid #ccc;
          box-sizing: border-box;
          border-radius: 0.5em;
        }

        .restaurant-header {
          color: #333; 
          border-bottom: 1px solid #ccc;
        }

        .restaurant-header p {
          margin-left: 1em;
          margin-top: 5px;
          margin-bottom: 5px;
        }

        .restaurant-data div {
          margin: 1em;
          margin-bottom: 1em;
        }
      `}</style>
      <Banner></Banner>
      <Searchbox input={input} onType={onType}></Searchbox>
      <Restaurants dataArray={data.data} emptyInput={emptyInput}></Restaurants>
    </>
  )
}

function Banner() {
  return (
      <h1 className='banner'>Restaurant Inspection Search</h1>
  );
}

function Restaurants ({dataArray, emptyInput}) {
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

function Restaurant({data}) {
  return(
      <div className="restaurant">
          <div className="restaurant-header"><p>{data.restaurant_name}</p></div>
          <div className="restaurant-data">
              <div>Borough: {data.borough}</div>
              <div>Cuisine: {data.cuisine}</div>
              <div>Grade: {data.grade}</div>
              <div>Grade Date: {data.grade_date}</div>
              <div>Restaurant ID: {data.restaurant_id}</div>
              <div>Score: {data.score}</div>
              <div>Violation Code: {data.violation_code}</div>
              <div>Violation Description: {data.violation_description}</div>
              <div>Zipcode: {data.zipcode}</div>
          </div>
      </div>
  );
}

function Searchbox ({input, onType}) {
  return(
      <div className="searchbox">  
          <label>
              Restaurant Name: <br/>
              <input className="inputBox" type='text' placeholder="Search Restaurant..." value={input} onChange={(e) => onType(e.target.value)}></input>
          </label>
      </div>
  )
}


export default App
