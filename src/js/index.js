import Search from './models/Search';
import Recipe from "./models/Recipe";
import * as SearchView from './views/Searchview'
import * as RecipeView from './views/RecipeView'
import {elements,renderLoader, clearLoader} from './views/base';
import { stat } from 'fs';


//state of the app
const state = {};  

/*
 **Search Controller 
 */

const searchControl = async()=>{
    //Get query from view
    const query = SearchView.getInput();
    console.log(query);
    if (query) {
    
    //new search object to add to state
    state.search = new Search(query);
    try {
    
    //prepare UI for the result
    SearchView.clearInput();
    SearchView.clearList();
    renderLoader(elements.searchRes);
    
    
    //search for the recipes
    await state.search.getResults(); 
        console.log(state.search.result);
        
    // render restults  on UI
    clearLoader();
    SearchView.renderResults(state.search.result);
    }

    catch (error) {
        console.log(error);
        clearLoader();
    }

        
    }
}

elements.searchForm.addEventListener('submit',e=>{
    e.preventDefault();
    searchControl()

})

elements.searchResPages.addEventListener('click', e=>{
    const btn = e.target.closest('.btn-inline');
    console.log(btn);
    
     if(btn){
        const goTopage = parseInt(btn.dataset.goto,10);
        SearchView.clearList();
        SearchView.renderResults(state.search.result, goTopage);              
    }
    
}); 



/* 
***Recipe Controller 
*/
const controlRecipe = async ()=>{
    //get the id from the url
    const id = window.location.hash.slice(1);
    console.log(id);

    if (id) {
        //prepare the UI for the changes
        renderLoader(elements.recipe);

        //create new Recipe object
        state.recipe = new Recipe(id);
try {

     //get Recipe data
     await state.recipe.getRecipe();
     state.recipe.parseIngredients();

     //calculate servings and time
     state.recipe.calcTime();
     state.recipe.calcServings();
     
     //render the recipe
     clearLoader();
    RecipeView.renderRecipe(state.recipe);
     console.log(state.recipe);
    
}
catch (error)
{
    console.log('something went wrong');
}
       
    }
}

//double function eventListener
['hashchange','load'].forEach(el=>window.addEventListener(el,controlRecipe));
