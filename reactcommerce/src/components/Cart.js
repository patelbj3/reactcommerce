import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeFromCart } from '../actions/cartActions';
import { incrementCartProduct } from '../actions/cartActions';
import { decrementCartProduct } from '../actions/cartActions';
import initialState from '../reducers/initialState';

class Cart extends Component {
  render() {
    /**
     * this.props.cart is populated through the redux store and mapStateToProps
     * this.props.removeFromCart is added through mapDispatchToProps
     */
    const cartList = this.props.cart.map(( item, index) =>{
      return <tr key={index}><td><div> 
		<img className="cartImage" src={item.imgSrc} width="50" height="45" alt="not available"/>
		<button className="counter" onClick={() => this.props.decrementCartProduct(item)}>-</button>{item.quantity} 
		<button className="counter" onClick={() => this.props.incrementCartProduct(item)}>+</button>
	<p style={{ color: "#000"}}>@ ${item.price} each = $ {item.quantity * item.price}
		<a href="#" className="deleteButton"
                onClick={ () => this.props.removeFromCart(item)} >
			Delete        
		</a>
		</p>
        
      </div></td></tr>;
    });
	
	
	
	var total = 0;
		var tempcart = this.props.cart;
		Object.keys(tempcart).forEach(function(key) {
			total += tempcart[key]['price'] * tempcart[key]['quantity'];
			//console.log(total);
		});
	
    return (
      <div>
        <h3 className="shoppingCart">Shopping Cart</h3>
        <div  className="cart">
          <table className="cartTable"><tbody>{cartList}</tbody></table>
        </div>
		<hr style={{ height:"1px" }}/><p style={{float:"right", color:"white"}}>Total: ${total}</p>
		<a href="" style={{float:"right", color:"white", width:"200px",     textAlign: "right"}}> Empty Cart </a>
		<p><button className="buttonPurchase" onClick={ () => confirmPurchase()} style={{float:"right"}}>Confirm Purchase</button></p>
      </div>
    );
  }
}




function confirmPurchase(){
	var newProducts = JSON.parse(localStorage.storage);
	var tempcart = JSON.parse(localStorage.order);
	
	for(var i = 0; i < tempcart.length;i++){
		 for(var j = 0; j < newProducts.length; j++){
		   if(tempcart[i]['itemName']  === newProducts[j]['itemName']){  //look for match with name
			   newProducts[j]['quantityRemaining'] = newProducts[j]['quantityRemaining'] - tempcart[i]['quantity'];
		   }
		}
	}
	localStorage.setItem("storage", JSON.stringify(newProducts));  //put the object back
				console.log(JSON.parse(localStorage.storage));
				initialState.cart = {};
				initialState.products = JSON.parse(localStorage.storage);
				window.location.reload();
	return  alert('Thanks for your Order!');
}

function mapStateToProps(state, props) {
	localStorage.setItem('order', JSON.stringify(state.cart));
    return {
        cart: state.cart,
		
    };
}

function mapDispatchToProps(dispatch) {
    return {
        removeFromCart: item => dispatch(removeFromCart(item)),
		incrementCartProduct: item => dispatch(incrementCartProduct(item)),
		decrementCartProduct: item => dispatch(decrementCartProduct(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
