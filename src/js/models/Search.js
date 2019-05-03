import axios from 'axios';
import { apiKey,proxy } from "../config";

export default class Search {
    constructor(query){
        this.query = query;
    }
    async getResults(){
        try {
            let res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${apiKey}&q=${this.query}`); 
            this.result = res.data.recipes;
            console.log(this.result);
        } 
        catch (error) {
            alert(error)
        }
        }
}