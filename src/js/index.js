import axios from 'axios';

const getResults = async (query) =>{

    const apiKey = "8044242a42a64a10528b2d9863604d12";
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    let res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${apiKey}&q=${query}
    `);
    const recipes = res.data.recipes;
    console.log(recipes);
    
}

getResults("iced tea");