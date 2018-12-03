import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  
  state = {
    places: []
  }

  componentDidMount() {
    this.getPlaces();
  }
  
  renderMap = () => {
    loadJS("https://maps.googleapis.com/maps/api/js?key=AIzaSyBliaNHM1mAeIbnRVVwrMeZjsdIQ7iGB6c&callback=initMap")
    window.initMap = this.initMap;
  }

  getPlaces = () =>{
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "FBRMHIZAKAMN34GV2ABYJM30G4S25YVQMPR3GRBS0TEUT51D",
      client_secret: "DH4TLWCTN2EXLQFXJ3B1K5OXCILCYTEGSODX5WBB1ED3E45K",
      query:"thai food",
      near:"Philadelphia",
      v:"20180323"
    }
    
    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
       
        this.setState({
          places: response.data.response.groups[0].items
        }, this.renderMap())
      })
      .catch(error => {
        console.log("ERROR "+error);
      });
  }


  initMap = () => {
   const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat:39.991603 , lng: -75.177727},
      zoom: 8
    });

    this.state.places.map(myPlace => {
      var latLng = new window.google.maps.LatLng(parseFloat(myPlace.venue.location.lat), 
      parseFloat(myPlace.venue.location.lng));
      
      var marker = new window.google.maps.Marker({
        position: latLng,
        map: map,
        title: myPlace.venue.name
      })
    })
   
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