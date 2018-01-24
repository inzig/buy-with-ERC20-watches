import React, { Component } from 'react'
import IqvisCoinContract from '../build/contracts/IqvisCoin.json'
import getWeb3 from './utils/getWeb3'
import {cartItems} from './store.js'
import {NavLink} from "react-router-dom";
import watches from './utils/watches'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      acc1: '',
      acc2: '0x1C11f6b1A2d1c0b00ad4145eb067184736EB973f',
      web3: null,
      main: true,
      totalItems: 0,
      toralIqvisCoins: 0,
      totalEthers: 0,
      items : []
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
    })
  }

  render() {
      return (
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
                  <li className="menu-item-has-children current-menu-item">
                    <a href="#"><i className="flaticon-wireless-internet6"></i>Products</a>
                    <ul className="sub-menu">
                      <li className="current-menu-item"><a href="#">Watches</a></li>
                    </ul>
                  </li>

                  <li className="menu-item-has-children">
                    <a href="#"><i className="flaticon-drawing33"></i>Cart</a>
                    <ul className="sub-menu">
                      <li><NavLink to="/cart" >Shopping Cart</NavLink></li>
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

         <section className="fw-section bg-parallax next-to-footer padding-top-3x padding-bottom-3x b-image" data-stellar-background-ratio="0.65">
            <span className="overlay overlay-light" styles={{opacity: '.51'}}></span>
            <div className="container padding-top">
              <h2 className="block-title text-center">
                Shop Our Watches
                <small>More categories will come here soon!!!</small>
              </h2>
              <div className="padding-top">
                <div className="row">
                  {watches.map(function(item, i){
                      return (
                      <div key={i} className="col-md-6">
                        <div className="shop-tile">
                          <a href="#" className="thumbnail">
                            <img src={item.image} alt="Watch" />
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
                                <span className="price">{item.iqvicoin}-IQs</span>
                              </div>
                              <div className="column">
                                <a href="#" name={item.name} image={item.image} iqviscoin={item.iqvicoin} ether={item.ether} onClick={this.addToCart.bind(this)} className="btn btn-sm btn-primary btn-icon-right waves-effect waves-light">
                                  Add to Cart
                                  <i className="icon-bag"></i>
                                </a>
                              </div>
                            </div>
                            <h3 className="shop-title"><a href="#">{item.name}</a></h3>
                            <p>{item.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                }, this)}
                </div>
              </div>
            </div>
          </section>

          <section className="fw-section next-to-footer padding-top-3x padding-bottom-3x b-img2">
            <div className="container padding-top text-center">
              <div className="row">
                <div className="col-md-10 col-md-offset-1">
                  <h2 className="block-title text-light">
                    Future of payment gateways is here
                    <small>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt<br /> ut labore et dolore magna aliqua.</small>
                  </h2>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4 col-lg-offset-4 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                  <a href="#" className="btn btn-3d btn-primary btn-block">Enter Promo Code CM2018</a>
                  <p className="text-sm text-muted text-uppercase">Promo Expires on 02 / 12 / 18</p>
                </div>
              </div>
            </div>
          </section>

          <a href="#" className="scroll-to-top-btn">
            <i className="icon-arrow-up"></i>
          </a>
        </div>
      );
}

  addToCart(event){
    let itemName = event.target.getAttribute('name');
    let image = event.target.getAttribute('image');
    let IqvisCoins = parseInt(event.target.getAttribute('iqviscoin') , 10);
    let Ethers = parseFloat(event.target.getAttribute('ether'));
    let temp = this.state.items;
    // let toralIqvisCoins = this.state.toralIqvisCoins + IqvisCoins;
    // let totalEthers = this.state.totalEthers + Ethers;
    temp[temp.length] = {'name': itemName, 'image': image, 'priceIqvisCoins': IqvisCoins, 'priceEthers': Ethers};
    // this.setState({
    //               totalItems: this.state.totalItems + 1 ,
    //               items: temp ,
    //               toralIqvisCoins : toralIqvisCoins ,
    //               totalEthers: totalEthers
    //             });

    cartItems.push(temp);
  }

  checkout() {
    this.setState({ main: false });
  }

  home() {
    this.setState({ main: true });
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

  payEther(event) {
    let acc1 = this.state.acc1;
    let acc2 = this.state.acc2;
    let mythis = this;
    let total = event.target.getAttribute('total');
    this.state.web3.eth.sendTransaction({from: acc1, to: acc2, value: this.state.web3.toWei( total, 'ether'), gasLimit: 21000, gasPrice: 20000000000}, function(err, transactionHash){
      if(err){
        console.log('err');
      } else {
        setTimeout(function(){
          mythis.state.web3.eth.getBalance(acc1 , function (error, result) {
               if (!error) {
                  let myether = mythis.state.web3.fromWei(result);
                  document.getElementById("etherBalance").innerHTML = myether.valueOf();
                  mythis.setState({ totalItems: 0 , main: true , items: [] , toralIqvisCoins : 0 , totalEthers: 0});
               } else {
                 console.error('error');
               }
          });
        }, 4000);
      }
    });
  }

}

export default App
