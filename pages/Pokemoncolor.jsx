import { useState } from 'react'
import pokeapi from '../functions/pokeapi'
import estilos from "../styles/pokemon-color.module.css"
import { FcSearch } from "react-icons/fc";

export default function Pokemoncolor() {

    const [Input, setInput] = useState('')
    const [Pokemon, setPokemon] = useState({})
    const [Pokeimage, setPokeimage] = useState('')
    const [Pokecolor, setPokecolor] = useState('')

    async function handleSubmit() {

        if (Input === "") {
            alert("informe o nome do pokemon")
            setInput('')
        } else if (Input !== "") {
            try {
                const response = await pokeapi.get(`pokemon/${Input}`)
                setPokemon(response.data)
                setPokeimage(response.data.sprites.other.home)
                const response2 = await pokeapi.get(`pokemon-species/${Input}`)
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
                backgroundColor: Pokecolor.name,
            }
        }>
            <div className={estilos.pesquisa}>
                <input type="text" value={Input} placeholder="insira o pokemon" onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => {(e.key === 'Enter' ? handleSubmit() : null)}}/>
                <button onClick={handleSubmit} ><FcSearch /></button>
            </div>
            <div className='resultados'>
                <h1 className={estilos.pokenome}>{Pokemon.name}</h1>
                <img className={estilos.imagemPokemon} src={Pokeimage.front_shiny}/>
            </div>

        </div>
    )
}