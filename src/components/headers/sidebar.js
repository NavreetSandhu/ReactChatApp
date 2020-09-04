import React, {Component} from 'react';
import Hamburger from './hamburger/Hamburger';
import SideDrawer from './SideDrawer/SideDrawer';

class Sidebar extends Component {
  constructor() {
    super();

    this.state = {
      sideDrawerOpen: false,
      isActive:false,
      isExpand:false
     
    };
  
  }
  
    drawerToggleClickHandler = () => {
      this.setState((prevState) => {
        return {sideDrawerOpen: !prevState.sideDrawerOpen, isActive: !prevState.isActive};
      });
    };
    
    toggleClickHandler = (e) => {
      e.preventDefault();
      this.setState({isExpand:!this.state.isExpand});
    };
        
    backdropClickHandler = () => {
      this.setState({sideDrawerOpen: false,  isActive:false, isExpand:false});
    };
  
    render() {
      let backdrop;
      if (this.state.sideDrawerOpen) {
        backdrop =  <div className="backdrop" onClick={this.backdropClickHandler} />;
      }
      return (
        <React.Fragment>
          <Hamburger drawerClickHandler={this.drawerToggleClickHandler}  activeclass={this.state.isActive}/>
              <SideDrawer hide={this.backdropClickHandler} show={this.state.sideDrawerOpen} toggleClick={this.toggleClickHandler} expand={this.state.isExpand}/>
          {backdrop}
          
        </React.Fragment>
      );
    }
  }
  
  export default Sidebar;
  

