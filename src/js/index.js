import Search from './models/Search';
import * as SearchView from './views/Searchview'
import {elements} from './views/base';

const state = {

};

const searchControl = async()=>{
    //Get query from view
    const query = SearchView.getInput();
    console.log(query);
    if (query) {
        //new search object to add to state
        state.search = new Search(query);

        //prepare UI for the result
        SearchView.clearInput();
        SearchView.clearList();
        //search for the recipes
       await state.search.getResults(); 

        // render restults  on UI
        SearchView.renderResults(state.search.result);
        
    }
}

elements.searchForm.addEventListener('submit',e=>{
    e.preventDefault();
    searchControl()

})


