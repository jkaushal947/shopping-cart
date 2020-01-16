import Item1 from '../../images/affirmation.jpg'
import Item2 from '../../images/all_the_right_reasons.jpg'
import Item3 from '../../images/breakaway.jpg'
import Item4 from '../../images/fever.jpg'
import Item5 from '../../images/futuresex_lovesounds.jpg'
import Item6 from '../../images/it_wont_be_soon_before_long.jpg'
import Item7 from '../../images/midnight_memories.png'
import Item8 from '../../images/millennium.jpg'
import Item9 from '../../images/no_strings_attached.jpg'
import Item10 from '../../images/red.jpg'
import Item11 from '../../images/x&y.png'
import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING } from '../actions/action-types/cart-actions'


const initState = {
    items: [
        {id:1,title:'Affirmation by Savage Garden', desc: "Release Date: 9th November 1999", price:7.99,img:Item1},
        {id:2,title:'All The Right Reasons by Nickelback', desc: "Release Date: 4th October 2005", price:7.99,img: Item2},
        {id:3,title:'Breakaway by Kelly Clarkson', desc: "Release Date: 19th July 2004",price:7.99,img: Item3},
        {id:4,title:'Fever by Kylie Minogue', desc: "Release Date: 1st October 2001", price:7.99,img:Item4},
        {id:5,title:'FutureSex/LoveSounds by Justin Timberlake', desc: "Release Date: 8th September 2006", price:7.99,img: Item5},
        {id:6,title:'It Wont Be Soon Before Long by Maroon 5', desc: "Release Date: 16th May 2007",price:7.99,img: Item6},
        {id:7,title:'All The Right Reasons by Nickelback', desc: "Release Date: 25th November 2013", price:7.99,img: Item7},
        {id:8,title:'Millennium by Backstreet Boys', desc: "Release Date: 18th amy 1999",price:7.99,img: Item8},
        {id:9,title:'No Strings Attached by NSYNC', desc: "Release Date: 21st March 2000", price:7.99,img:Item9},
        {id:10,title:'Red by Taylor Swift', desc: "Release Date: 22nd October 2012", price:7.99,img: Item10},
        {id:11,title:'X&Y by Coldplay', desc: "Release Date: 6th June 2005",price:7.99,img: Item11}
    ],
    addedItems:[],
    total: 0

}
const cartReducer= (state = initState,action)=>{
   
    //INSIDE HOME COMPONENT
    if(action.type === ADD_TO_CART){
          let addedItem = state.items.find(item=> item.id === action.id)
          //check if the action id exists in the addedItems
         let existed_item= state.addedItems.find(item=> action.id === item.id)
         if(existed_item)
         {
            addedItem.quantity += 1 
             return{
                ...state,
                 total: state.total + addedItem.price 
                  }
        }
         else{
            addedItem.quantity = 1;
            //calculating the total
            let newTotal = state.total + addedItem.price 
            
            return{
                ...state,
                addedItems: [...state.addedItems, addedItem],
                total : newTotal
            }
            
        }
    }
    if(action.type === REMOVE_ITEM){
        let itemToRemove= state.addedItems.find(item=> action.id === item.id)
        let new_items = state.addedItems.filter(item=> action.id !== item.id)
        
        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
        console.log(itemToRemove)
        return{
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if(action.type=== ADD_QUANTITY){
        let addedItem = state.items.find(item=> item.id === action.id)
          addedItem.quantity += 1 
          let newTotal = state.total + addedItem.price
          return{
              ...state,
              total: newTotal
          }
    }
    if(action.type=== SUB_QUANTITY){  
        let addedItem = state.items.find(item=> item.id === action.id) 
        //if the qt == 0 then it should be removed
        if(addedItem.quantity === 1){
            let new_items = state.addedItems.filter(item=>item.id !== action.id)
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return{
                ...state,
                total: newTotal
            }
        }
        
    }

    if(action.type=== ADD_SHIPPING){
          return{
              ...state,
              total: state.total + 6
          }
    }

    if(action.type=== 'SUB_SHIPPING'){
        return{
            ...state,
            total: state.total - 6
        }
  }
    
  else{
    return state
    }
    
}

export default cartReducer
