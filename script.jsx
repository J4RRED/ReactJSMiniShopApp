// written using reactjs and jsx 

var Product = React.createClass({
  getInitialState: function () {
    return {qty: 0};
  },
  
  add: function() {
    this.setState({qty: this.state.qty + 1});
    this.props.handleTotal(this.props.price);
  },
  
  show: function() {
    this.props.handleShow(this.props.name);
  },
  
  render: function() {
    return (
      <div>
      <p class="main" id="pe">{this.props.name} - ${this.props.price}</p>
      <button onClick={this.add}>Add</button>
      <button onClick={this.show}>Show</button>
          <h4>Qty: {this.state.qty} item(s)</h4>
      <hr/>
      </div>
    );
  }
});

var Total = React.createClass({ 
  render: function() {
    return (
      <div class="main" id="bottom">
          <h3>Total Price: ${this.props.total}</h3>
        <a href="#top">Click me to scroll to the top!</a>
      </div>  
    );
  }
});

var ProductForm = React.createClass({
  submit: function(e) {
    e.preventDefault();
    
    var product = {
      name: this.refs.name.value,
      price: parseInt(this.refs.price.value)
    } 
    
    this.props.handleCreate(product);
    
    this.refs.name.value = "";
    this.refs.name.price = "";
  },
  
  render: function () {
    return (
      <form onSubmit={this.submit}>
        <p class= "main" id="pc">Welcome to the Shopping List App!</p>
        <p class= "main" id="pd">Add items in the text box below, to get started.
        Click 'add' whenver you are ready to add the item to your total quantity.</p>
        <div class="main" id="top">
          <a href="#bottom">Click me to scroll to the bottom!</a>
        </div>
        <br/>
          <input type="text" placeholder="Item Name" ref="name"/>
          <input type="text" placeholder="Item Price" ref="price"/>
        <br/><br/>
          <button>Add Item</button>
        <hr/><hr/><hr/>
      </form>
    );
  }
});

var ProductList = React.createClass({
  getInitialState: function() {
    return {
      total: 0,
      productList: [
      ]
    };
  },
  
  createProduct: function(product) {
    this.setState({ 
      productList: this.state.productList.concat(product)
    })
  },
  
  calculateTotal: function(price) {
    this.setState({total: this.state.total + price});
  },
  
  showProduct: function(name) {
    alert("You have selected " + name + "." + 
    " Please select 'add' to add this item to your list");
  },
  
  render: function() {
    var component = this;
    var products = this.state.productList.map(function(product) {
      return (
        <Product name={product.name} price={product.price}
            handleShow={component.showProduct}
            handleTotal={component.calculateTotal}/>
      );
    });
    
    return( 
      <div>
        <ProductForm handleCreate={this.createProduct}/>
        {products}
        <Total total={this.state.total}/>
      </div>
    );
  }
})

React.render(<ProductList/>, document.getElementById("root"));
