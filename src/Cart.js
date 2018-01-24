import React,  { Component } from "react"
import IqvisCoinContract from '../build/contracts/IqvisCoin.json'
import getWeb3 from './utils/getWeb3'
import {cartItems} from './store.js'
import {NavLink} from "react-router-dom";

class Cart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      acc1: '',
      acc2: '0x1C11f6b1A2d1c0b00ad4145eb067184736EB973f',
      web3: null,
      total: 0
    }
  }

  componentWillMount() {
    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      this.instantiateContract()
    })
    .catch(() => {
      console.log('Error finding web3.')
    })
  }

  instantiateContract() {
    const contract = require('truffle-contract')
    const IqvisCoin = contract(IqvisCoinContract)
    IqvisCoin.setProvider(this.state.web3.currentProvider)
    var IqvisCoinInstance
    this.state.web3.eth.getAccounts((error, accounts) => {
      IqvisCoin.deployed().then((instance) => {
        IqvisCoinInstance = instance
        this.setState({acc1: accounts[0]})
        return IqvisCoinInstance.balanceOf.call(this.state.acc1, {from: accounts[0]});
      }).then((value) => {
        document.getElementById("balance").innerHTML = value.valueOf();
        var mythis = this;
        this.state.web3.eth.getBalance(accounts[0], function (error, result) {
             if (!error) {
                var ether = mythis.state.web3.fromWei(result);
                document.getElementById("etherBalance").innerHTML = ether.valueOf();
             } else {
               console.error('error');
             }
        });
      })
    });
    var mytotal = 0;
    cartItems.map(function(item, i){
      mytotal += item[0].priceIqvisCoins;
      return true;
    });
    this.setState({ total: mytotal });
 }
  render() {
    return(
      <div>
        <div className="social-bar bar-fixed-right">
          <a href="#" className="sb-skype">
            <i className="fa fa-skype"></i>
          </a>
          <a href="#" className="sb-facebook">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="#" className="sb-twitter">
            <i className="fa fa-twitter"></i>
          </a>
        </div>

        <header className="navbar navbar-sticky">
          <div className="topbar">
            <div className="container">
              <a href="index.html" className="site-logo">
                <img src="img/logo.png" alt="Nucleus" />
              </a>
              <div className="nav-toggle"><span></span></div>
              </div>
          </div>

          <div className="container">
            <nav className="main-navigation">
              <ul className="menu">
                <li className="menu-item-has-children">
                  <a href="#"><i className="flaticon-chips1"></i>Wallet</a>
                  <div className="sub-menu">
                    <div className="content">
                    <img className="cryp-logo" src="img/qicon.png" alt="Iqvis"  />
                    <h6 className="balance" >Current Balance : <strong> <span id="balance">0</span></strong></h6>
                    <br className="br" />
                    <img className="cryp-logo" src="img/eth.png" alt="etherLogo"/>
                    <h6 className="balance">Current Balance : <strong><span id="etherBalance" >0</span></strong></h6>
                    </div>
                  </div>
                </li>
                <li className="menu-item-has-children ">
                  <a href="#"><i className="flaticon-wireless-internet6"></i>Products</a>
                  <ul className="sub-menu">
                    <li><NavLink to="/">Watches</NavLink></li>
                  </ul>
                </li>

                <li className="menu-item-has-children current-menu-item">
                  <a href="#"><i className="flaticon-drawing33"></i>Cart</a>
                  <ul className="sub-menu">
                    <li className="current-menu-item"><a href="#">Shopping Cart</a></li>
                  </ul>
                </li>

                <li className="menu-item-has-children">
                  <a href="#"><i className="flaticon-chatting"></i>Help</a>
                  <ul className="sub-menu">
                    <li><NavLink to="/help" >Help Centre</NavLink></li>
                  </ul>
                </li>

              </ul>
            </nav>
          </div>
          <div className="social-bar mobile-socials">
            <a href="#" className="sb-skype">
              <i className="fa fa-skype"></i>
            </a>
            <a href="#" className="sb-facebook">
              <i className="fa fa-facebook"></i>
            </a>
            <a href="#" className="sb-twitter">
              <i className="fa fa-twitter"></i>
            </a>
          </div>
        </header>

        <section className="container padding-top-2x">
          <form method="post" className="shopping-cart">
            <div className="row">
              <div className="col-lg-9 col-md-8">
                  {cartItems.map(function(item, i){
                    return (
                    <div key={i} className="shop-tile">
                      <a href="shop-single.html" className="thumbnail">
                        <span className="shop-label label-danger">Sale</span>
                        <img src={item[0].image} alt="Watch" />
                      </a>
                      <div className="description">
                        <div className="shop-meta">
                          <div className="column">
                            <span className="hidden-md">in</span>
                            <span>
                              <i className="icon-ribbon hidden-md"></i>
                              <a href="#">Smartwatch</a>
                            </span>
                          </div>
                          <div className="column">
                            <span className="subtotal"><span>Subtotal: </span>{item[0].priceIqvisCoins}-IQs</span>
                          </div>
                          <div className="column">
                            <span className="delete-item">&times;</span>
                          </div>
                        </div>
                        <h3 className="shop-title"><a href="#">{item[0].name}</a></h3>
                        <span className="price"><span>Price: </span>{item[0].priceIqvisCoins}-IQs</span>
                        <div className="count">
                          <span className="label">Qty: </span>
                          <div className="count-input">
                            <a className="incr-btn" data-action="decrease" href="#">–</a>
                            <input className="quantity" type="text" defaultValue="2" />
                            <a className="incr-btn" data-action="increase" href="#">+</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                  }, this)}
              </div>
              <div className="col-lg-3 col-md-4 ">
                <aside className="sidebar">
                  <section className="widget widget_shop_totals">
                    <div className="subtotal">
                      <div className="text-default">Subtotal</div>
                      <div className="text-right">{this.state.total}-IQs</div>
                    </div>
                    <div className="panel-group" id="accordion">
                      <div className="panel">
                        <div className="panel-heading">
                          <a className="panel-title collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
                            Delivery
                          </a>
                        </div>
                        <div id="collapseOne" className="panel-collapse collapse">
                          <div className="panel-body">
                            <select className="form-control" name="co_delivery">
                              <option value="local">Local delivery</option>
                              <option value="international">International delivery</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="panel">
                        <div className="panel-heading">
                          <a className="panel-title collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">
                            Coupon Code
                          </a>
                        </div>
                        <div id="collapseTwo" className="panel-collapse collapse" role="tabpanel">
                          <div className="panel-body">
                            <input type="text" name="co_coupon" className="form-control" placeholder="Enter code here" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="total">
                      <div className="text-default">Total</div>
                      <div className="text-right"><strong>{this.state.total}-IQs</strong></div>
                    </div>
                    <a onClick={this.payIqvisCoin.bind(this)} total={this.state.total} className="btn btn-primary btn-block waves-effect waves-light">
                      Checkout
                    </a>
                  </section>
                </aside>
              </div>
            </div>
          </form>
        </section>
     </div>
   );
  }

  payIqvisCoin(event) {
    const contract = require('truffle-contract')
    const IqvisCoin = contract(IqvisCoinContract)
    let total = event.target.getAttribute('total')
    IqvisCoin.setProvider(this.state.web3.currentProvider)
    let mythis = this;
    var IqvisCoinInstance
    this.state.web3.eth.getAccounts((error, accounts) => {
      IqvisCoin.deployed().then((instance) => {
        IqvisCoinInstance = instance
        return IqvisCoinInstance.transfer(mythis.state.acc2, total, {from: accounts[0]});
      }).then((result) => {
        return IqvisCoinInstance.balanceOf.call(accounts[0], {from: accounts[0]});
      }).then((value) => {
        document.getElementById("balance").innerHTML = value.valueOf();
        mythis.setState({ totalItems: 0 , main: true , items: [] , toralIqvisCoins : 0 , totalEthers: 0});
      })
    })
  }
}
export default Cart
