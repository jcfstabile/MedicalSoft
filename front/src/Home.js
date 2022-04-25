import './css/Home.css';
import { Link } from 'react-router-dom';

const Home = (props) => {
    return (
        <div className='contenedor'>
            <div className='nav'>
                <p>MedicalSoft</p>
                <img src='/images/electro.png' alt='' width="100%" />
                <div className='nav-boton'>
                    <span>Pacientes</span>
                    <div class="submenu">
                        <Link to='/agregarPaciente'>Agregar paciente</Link>
                    </div>
                </div>
            </div>
            <div className='imagenLogo'>
                <img src='/images/logoLogin.png' alt='' width="100%" />
            </div>
        </div>
    );
}

export default Home;