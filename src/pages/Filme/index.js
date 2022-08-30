import './filme-info.css'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/api'
import {toast} from 'react-toastify'

export default function Filme() {
    const element = useParams()
    const [filme, setFilme] = useState([])
    const [loading, setLoading] = useState(true)
    const navegate = useNavigate()

    useEffect(() => {
        async function loadFilme() {
            const response = await api.get(`r-api/?api=filmes/${element.id}`)
            
            if(response.data.length === 0){
               navegate("/")
            return;
            }

            setFilme(response.data)
            setLoading(false)
        }

        loadFilme()

        return () => {
            console.log("COMPONENTE DESMONTADO");
        }

    }, [navegate, element.id])

    function salvaFilme(){
        const minhaLista = localStorage.getItem("filmes")

        let filmesSalvos = JSON.parse(minhaLista) || []

        //Se tiver algum filme salvo com o mesmo id, precisa iginorar
        const hasFilme = filmesSalvos.some( (filmeSalvo) => filmeSalvo.id === filme.id)

        if(hasFilme){
            toast.success("Você já possui esse filme salvo")
            return;
            //Para a execução do codigo aqui
        }

        filmesSalvos.push(filme)
        localStorage.setItem("filmes", JSON.stringify(filmesSalvos))
        toast.success("Filme salvo com sucesso")

    }


    if (loading) {
        return (
            <div className='filme-info'>
                <h1 className='carregando'>Carregando seu filme...</h1>
            </div>
        )
        
        
    }
    return (
        <article>
            <div className='filme-info'>
                <h1> {filme.nome} </h1>
                <img src={filme.foto} alt={filme.nome}/>

                <h3>Sinopse</h3>
                {filme.sinopse}

                <div>
            
                    <button className='botao-salvar' onClick={salvaFilme}>Salvar</button>            
                    
                    <a target="blank" href={`https://youtube.com/results?search_query=${filme.nome} Trailer`}>
                        Trailer
                    </a>
                   
                </div>
            </div>

        </article>
    )
}