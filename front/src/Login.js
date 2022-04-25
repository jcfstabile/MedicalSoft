import './css/Login.css';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Api from './Api';

const Login = (props) => {
    const [username,setUsernameLog] = useState ("");
    const [password,setPasswordLog] = useState ("");
    const [redirect,setRedirect]    = useState (false)
    
    const loguear = (event) =>{
        let datosUsuario = {
            username : username,
            password : password
        }
        Api.login (datosUsuario)
        .then( (response)=>{
            console.log(response);
            setRedirect(true)
        })
    }

    if (redirect){
        return <Navigate to='/home'/>        
   }

    return (
        <div className='container'>
            <div className="box">
                <div className="logo">
                    <img src='/images/logoLogin.png' alt='' width="100%" />
                </div>
                <hr width="80%" />  
                <p>INICIAR SESIÓN</p>
                <hr width="80%" />
                <div className="campo">
                    <div className='campo-img'>
                        <img src='/images/usuario.png' alt='' width="100%" />
                    </div>
                    <input  type="text" 
                            name='user' 
                            placeholder='Usuario' 
                            onChange={(e)=>{
                                setUsernameLog (e.target.value);
                            }}/>
                </div>
                <div className="campo">
                    <div className='campo-img'>
                        <img src='/images/bloquear.png' alt='' width="100%" />
                    </div>
                    <input  type="password" 
                            name='password' 
                            placeholder='Contraseña' 
                            onChange={(e) =>{
                                setPasswordLog (e.target.value);
                            }}/>
                </div>
                <button className='boton' onClick={loguear}>INGRESAR</button>
            </div>
        </div>
    );
}

export default Login;