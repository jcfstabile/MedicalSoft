import './css/Login.css';

const Login = () => {
    return (
        <div className='container'>
            <div className="box">
                {/* <div className="logo">
                    <img src='/images/logo.png' alt='' width="100%" />
                </div> */}
                <p>INICIAR SESIÓN</p>
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