import React,  { Component } from "react"
import IqvisCoinContract from '../build/contracts/IqvisCoin.json'
import getWeb3 from './utils/getWeb3'
import {NavLink} from "react-router-dom";

class Help extends Component {
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
                    <li><NavLink to="/" >Watches</NavLink></li>
                  </ul>
                </li>

                <li className="menu-item-has-children">
                  <a href="#"><i className="flaticon-drawing33"></i>Cart</a>
                  <ul className="sub-menu">
                    <li><NavLink to="/cart" >Shopping Cart</NavLink></li>
                  </ul>
                </li>

                <li className="menu-item-has-children current-menu-item">
                  <a href="#"><i className="flaticon-chatting"></i>Help</a>
                  <ul className="sub-menu">
                    <li className="current-menu-item"><a href="#">Help Centre</a></li>
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

        <div className="container padding-bottom padding-top-2x">

          <form method="get" className="help-search">
            <input type="text" className="form-control" placeholder="Search Help Center" />
            <button type="submit" className="waves-effect waves-light"><i className="icon-search"></i></button>
          </form>

          <div className="row padding-top">
            <div className="col-lg-8 col-md-8 col-lg-offset-1 col-lg-push-3 col-md-push-4">
              <h2 className="block-title">
                Space and storage
                <small>Relevant information</small>
              </h2>
              <img src="img/help-center/image.jpg" className="space-bottom" alt="help" />
              <p className="padding-bottom">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum.</p>
              <div className="panel-group" id="accordion">
                <div className="panel">
                  <div className="panel-heading">
                    <a className="panel-title collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
                      How do I link to a file or folder?
                    </a>
                  </div>
                  <div id="collapseOne" className="panel-collapse collapse">
                    <div className="panel-body">
                      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                    </div>
                  </div>
                </div>
                <div className="panel">
                  <div className="panel-heading">
                    <a className="panel-title collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">
                      How do I share folders with other people?
                    </a>
                  </div>
                  <div id="collapseTwo" className="panel-collapse collapse" role="tabpanel">
                    <div className="panel-body">
                      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                    </div>
                  </div>
                </div>
                <div className="panel">
                  <div className="panel-heading">
                    <a className="panel-title" data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
                      How do I sync files between computers?
                    </a>
                  </div>
                  <div id="collapseThree" className="panel-collapse collapse in">
                    <div className="panel-body">
                      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                    </div>
                  </div>
                </div>
                <div className="panel">
                  <div className="panel-heading">
                    <a className="panel-title collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFour">
                      How do I enable two-step verification on my account?
                    </a>
                  </div>
                  <div id="collapseFour" className="panel-collapse collapse">
                    <div className="panel-body">
                      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-lg-pull-9 col-md-pull-8">
              <div className="space-top-3x visible-sm visible-xs"></div>
              <aside className="sidebar space-bottom-2x">
                <section className="widget widget_categories">
                  <h3 className="widget-title">
                    <i className="icon-ribbon"></i>
                    Help Center
                  </h3>
                  <ul>
                    <li><a href="#">Support<span>3</span></a></li>
                    <li><a href="#">Space and storage<span>4</span></a></li>
                    <li><a href="#">Hosting<span>11</span></a></li>
                    <li><a href="#">Manage account<span>6</span></a></li>
                    <li><a href="#">Desctop client and web app<span>13</span></a></li>
                    <li><a href="#">Security and privacy<span>9</span></a></li>
                    <li><a href="#">Payments and billing<span>7</span></a></li>
                    <li><a href="#">Mobile<span>18</span></a></li>
                  </ul>
                </section>
              </aside>
              <h6 className="text-normal text-muted">Relevant articles</h6>
              <hr className="space-bottom" />
              <ul className="list-featured">
                <li><a href="#" className="no-border">Common WordPress Installation</a></li>
                <li><a href="#" className="no-border">How Do I Check Compatibility?</a></li>
                <li><a href="#" className="no-border">Item Installation Guide &amp; Help Documentation</a></li>
                <li><a href="#" className="no-border">Manage account</a></li>
              </ul>
            </div>
          </div>
        </div>
     </div>
   );
  }
}
export default Help
