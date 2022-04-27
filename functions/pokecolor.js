import axios from "axios";

const pokecolor = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/'
})

export default pokecolor;