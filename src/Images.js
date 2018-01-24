import React, { Component } from 'react'

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'

class Image extends Component {
  constructor(props){
        super();

        this.state = {
            // some state
        }
    }
    render() {
        return (
            <div className="fix">
              <img className="img-size" src={this.props.src} alt="Paris" />
            </div>
        );
    }
}

export default Image
