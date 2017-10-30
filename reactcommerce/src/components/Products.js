import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../actions/cartActions';

class Products extends Component {

  render() {
    /**
     * this.props.products is populated through the redux store and mapStateToProps
     * this.props.addToCart is added through mapDispatchToProps
     */
    const productList = this.props.products.map( (item,index)  => {
      return <div key={index} className="product"> 
		<img src={item.imgSrc} width="200" height="120" alt="not available"/>
        <p className="textTransform" style={{ color: "#000"}}>{item.itemName} </p>
		<p style={{ color: "#000"}}><font size="5">${item.price} </font> {item.quantityRemaining} In Stock </p>
        <button className="button"
                onClick={() => this.props.addToCart(item)}>
          Add To Cart
        </button> 
      </div>
    });

    return (
      <div className= "products">
         { productList }
      </div>
    );
  }
}

function mapStateToProps(state, props) {
    return {
        products: state.products
    };
}

function mapDispatchToProps(dispatch) {
    return {
        addToCart: item => dispatch(addToCart(item))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Products);

