import {elements} from './base';

export const getInput = ()=> elements.searchInput.value;
 
//function to limit recipe title 

const limitRecipeTitle = (title,limit=17)=>{
    const newTitle= [];
    if(title.length > limit){
        title.split(' ').reduce((acc, cur)=>{
           if(acc+cur.length<=limit){
            newTitle.push(cur);
           } 
           return acc+cur.length
        }, 0);
    return  `${newTitle.join(' ')}...`;
        
    }
    return title;
}

const renderRecipe = recipe =>{
    const HtmlRecipe = `<li>
   <a class="results__link results__link--active" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="Test">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
</li>`
elements.searchResList.insertAdjacentHTML("afterend",HtmlRecipe);
}

export const clearInput = ()=>elements.searchInput.value='';

export const clearList = ()=>{
    elements.searchResList.value='';
    elements.searchResPages.innerHTML = '';
   
}
//pagination

const CreateBtn = (page,type)=> `
<button class="btn-inline results__btn--${type}"
data-goto=${type ==='prev'?page= 1 : page+1}>
<svg class="search__icon">
    <use href="img/icons.svg#icon-triangle-${type ==='prev'?'left' : 'right'}"></use>
</svg>
<span>Page ${type ==='prev'?page-1 : page+1}</span>
</button>
`;


const renderButtons = (page,numResults,resPerPage)=>{
    const pages = Math.ceil(numResults/resPerPage);

    let btn;
    if (page === 1 && pages > 1) {
        //display The next page button
        btn = CreateBtn(page,'next');

    } else if(page < pages) {
        //Display both buttons
        btn = `
            ${CreateBtn(page,'prev')}
            ${CreateBtn(page,'next')}
        `;
    }
    else if(page ===pages && pages>1){
        //only the prev page will display
        btn = CreateBtn(page,'prev');
    }
    elements.searchResPages.insertAdjacentHTML('afterbegin',btn); 
};

export const renderResults = (recipes,page = 1,resPerPage = 10) =>{
    //render result of current page
    const start = (page-1)*resPerPage;
    const end = page * resPerPage;
    
    //this to get only 10 results per page    
    recipes.slice(start,end).forEach(renderRecipe);

    //render pagination buttons
    renderButtons(page,recipes.length,resPerPage)
}