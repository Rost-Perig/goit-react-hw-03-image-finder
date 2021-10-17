import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Searchbar from './componets/Searchbar';
import ImageGallery from './componets/ImageGallery';
import BtnToTop from './componets/BtnToTop';


class App extends Component {

  state = {
    searchQuery: '',
  };

  searchQuerySubmit = searchQuery => this.setState({ searchQuery });
      
  render() {

    const { searchQuery } = this.state;
    const {searchQuerySubmit } = this;

    return (

      <div className="App">

        <Searchbar searchQueryToUp={searchQuerySubmit} />
        
        <ImageGallery searchQuery={searchQuery}/>
        
        <ToastContainer/>

        <BtnToTop />

      </div>
    )
  };
};

export default App;
