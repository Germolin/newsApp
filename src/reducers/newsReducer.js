export default (state = {news: []}, action) => {
    switch(action.type){
        case 'news_loaded':
          return { ...state, news: action.payload }
        default: 
          return state;
    }
};