import { Link } from 'react-router-dom'
import './erro.css'

export default function Error() {
    return (
        <div className='pagina-erro'>
            <h1>404</h1>
            <h2>Pagina não encontrada..</h2>
            <Link to={"/"}>Veja todos os filmes!</Link>
        </div>
    )
}