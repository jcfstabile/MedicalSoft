import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';

function App() {
    const [bases, setBases] = useState();
    const [msg, setMsg] = useState();
    const back = axios.create({
        baseURL: 'http://localhost:7777',
    });

    const getDatabases = () => {
        setBases(undefined)
        back.get('/list-of-databases')
            .then(response => {
                console.log(response.status)
                switch (response.status) {
                    case 200:
                        setBases(response.data.listOfBases)
                        break
                    // case 500:
                    //     setMsg(response.data.msg);
                    //     console.log("en 500", response)
                    //     break;
                    default:
                        setMsg("Status code is:${response.status}")
                }
            })
            .catch( err => {
                console.log("Get list of databases Error:", err);
                setMsg(err);
            })
    }

    useEffect( () => {
        // getDatabases()
    }, []);

    console.log(bases);
    console.log(msg);

    return (
        <div className="App">
            <header className="App-header">
                <>
                    <button onClick={getDatabases}>Get Databases</button>
                    <ul>{
                        bases ? bases.map(
                                (base) => <li key={base}>{base}</li>)
                            : msg ? <p>{msg.toString()}</p> : <p> </p>
                    }
                    </ul>
                </>
                Learn React
            </header>
        </div>
  );
}

export default React.memo(App);
