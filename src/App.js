import React, { Component } from 'react';
import './App.css';

class App extends Component {

  componentDidMount() {
    this.renderMap();
  }
  renderMap = () => {
    loadJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyBliaNHM1mAeIbnRVVwrMeZjsdIQ7iGB6c&callback=initMap")
    window.initMap = this.initMap;
  }

  initMap = () => {
   const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });
  }
  render() {
    return (
      <main>
        <div id='map'></div>
      </main>
    );
  }

 
}

export default App;
function loadJS(url){
  var index = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src= url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
}