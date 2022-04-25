import './css/Login.css';

const Login = (props) => {
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
                    <input type="text" name='user' placeholder='Usuario' />
                </div>
                <div className="campo">
                    <div className='campo-img'>
                        <img src='/images/bloquear.png' alt='' width="100%" />
                    </div>
                    <input type="password" name='password' placeholder='Contraseña' />
                </div>
                <div className="boton">INGRESAR</div>
            </div>
        </div>
    );
}

export default Login;