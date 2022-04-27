import { useState } from 'react'
import pokeapi from '../functions/pokeapi'
import estilos from "../styles/pokemon-color.module.css"
import { FcSearch } from "react-icons/fc";

export default function pesquisaPokemon() {

    const [input, setInput] = useState('')
    const [pokemon, setPokemon] = useState({})
    const [pokeimage, setPokeimage] = useState('')
    const [pokecolor, setPokecolor] = useState('')

    async function handleSubmit() {

        if (input === "") {
            alert("informe o nome do pokemon")
            setInput('')
        } else if (input !== "") {
            try {
                const response = await pokeapi.get(`pokemon/${input}`)
                setPokemon(response.data)
                setPokeimage(response.data.sprites.other.home)
                const response2 = await pokeapi.get(`pokemon-species/${input}`)
                setPokecolor(response2.data.color)
                setInput('')
            }
            catch {
                alert('digite o nome certo de algum pokemon')
                setInput('')
            }        } 
    }

    return (
        <div className={estilos.corpo} style={
            {
                backgroundColor: pokecolor.name,
            }
        }>
            <div className={estilos.pesquisa}>
                <input type="text" value={input} placeholder="insira o pokemon" onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => {(e.key === 'Enter' ? handleSubmit() : null)}}/>
                <button onClick={handleSubmit} ><FcSearch /></button>
            </div>
            <div className='resultados'>
                <h1 className={estilos.pokenome}>{pokemon.name}</h1>
                <img className={estilos.imagemPokemon} src={pokeimage.front_shiny} />
            </div>

        </div>
    )
}