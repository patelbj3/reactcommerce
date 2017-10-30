import initialState from './initialState';

/**
 * Takes an empty array as initial state, then like the todo-example: either spreads
 * and adds a new item to the cart array, or removes the object with the specified ID
 */
export default function cart(state = initialState.cart, action) {
    switch (action.type) {
        case 'ADD':
            //If 'ADD' from 'cartActions.js', spread the previous state, and
            //add the new item. This will result in a new array with an added item
			//initialState.cart.push({'quantity':1})
			if(state.length > 0){
				
				var itemNameArray = [] ;
				for (var j = 0; j < state.length; j++) {
					itemNameArray.push(state[j].itemName);
				}
				if (itemNameArray.indexOf(action.item.itemName) > -1) {
						return state.map(i =>{
						if(i.itemName === action.item.itemName){
							if(i.quantityRemaining>1){	  return {"itemName":action.item.itemName,"imgSrc":action.item.imgSrc,"price":action.item.price,"quantityRemaining":i.quantityRemaining-1,"quantity":i.quantity+1};}
						}
							return i;
						  });
					}
					else{
						return [...state,{"itemName":action.item.itemName,"imgSrc":action.item.imgSrc,"price":action.item.price,"quantityRemaining":action.item.quantityRemaining,"quantity":1}];				
					}
			}
			else{
				
				return [...state,{"itemName":action.item.itemName,"imgSrc":action.item.imgSrc,"price":action.item.price,"quantityRemaining":action.item.quantityRemaining,"quantity":1}];
			}
        case 'REMOVE':
            //If 'REMOVE' from 'cartActions.js', return a new array without the
            //item with the ID we clicked on. filter returns a new array, don't
            //have to spread here
            return state.filter( i => i.itemName !== action.item.itemName);
        case 'INCREMENT':
			return state.map(i =>{
				if(i.itemName === action.item.itemName){
					if(i.quantityRemaining>1){	  return {itemName:action.item.itemName,imgSrc:action.item.imgSrc,price:action.item.price,quantityRemaining:action.item.quantityRemaining-1,quantity:action.item.quantity+1};}
				}
					return i;
				  });
		
		case 'DECREMENT':
			return state.map(i =>{
				if(i.itemName === action.item.itemName){
					if(i.quantity>0){	  return {itemName:action.item.itemName,imgSrc:action.item.imgSrc,price:action.item.price,quantityRemaining:action.item.quantityRemaining+1,quantity:action.item.quantity-1};}
				}
					return i;
				  });
		
        default:
            return state;
    }
	
};