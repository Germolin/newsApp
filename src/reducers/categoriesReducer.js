export default (state = { categories: '',  }, action) => {
    switch(action.type) {
        case "load_categories":
          console.log('SOMETHING CAME!!!!!!!!!!!!!!')
          return {...state, categories: action.payload }
        default:
          return {...state};
    }
};