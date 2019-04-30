import axios from 'axios';

export default class Search {
    constructor(query){
        this.query = query;
    }
    async getResults(){
        try {
            const apiKey = "8044242a42a64a10528b2d9863604d12";
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            let res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${apiKey}&q=${this.query}
            `); 
            this.result = res.data.recipes;
            console.log(this.result);
        } 
        catch (error) {
            alert(error)
        }
        }
}