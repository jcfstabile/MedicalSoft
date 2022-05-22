import './css/Home.css';
import { Link } from 'react-router-dom';

const Home = (props) => {
    return (
        <div className='contenedor'>
            <div className='nav'>
                <img className="navlogo" src='/images/logoNombre.png' alt='' width="100%" />
                <div className='nav-boton'>
                    <span>Pacientes</span>
                    <div class="submenu">
                        <img src='/images/hospitalizacion.png' alt='' width="100%" />
                        <Link to='/agregarPaciente'>Agregar paciente</Link>
                        <Link to='/buscarPaciente'>Buscar paciente</Link>
                    </div>
                </div>
            </div>
            <div className='imagenLogo'>
                <img src='/images/logoNombre.png' alt='' width="100%" />
            </div>
        </div>
    );
}

export default Home;