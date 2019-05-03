import axios from "axios";
import { apiKey,proxy } from "../config";


export default class Recipe{
    constructor(id){
        this.id = id;
    }

    async getRecipe(){
        try {
            let res = await axios(`${proxy}https://www.food2fork.com/api/get?key=${apiKey}&rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        } catch (error) {
            console.log(error);
            alert('There is an error :(');
        }
    }

    calcTime(){
        //we suppose that we need 15min Per 3 ingredients
        const numIng = this.ingredients.length;
        const period = Math.ceil(numIng / 3);
        this.time = period*15;
    }
    
    calcServings(){
        this.servings = 4;
    }
}