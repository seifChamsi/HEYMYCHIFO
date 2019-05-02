import Search from './models/Search';
import * as SearchView from './views/Searchview'
import {elements,renderLoader, clearLoader} from './views/base';


//state of the app
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
    renderLoader(elements.searchRes);
    
    
    //search for the recipes
    await state.search.getResults(); 

    // render restults  on UI
    clearLoader();
    SearchView.renderResults(state.search.result);
        
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

