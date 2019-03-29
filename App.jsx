import React, { Component } from "react";
import { render } from "react-dom";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

const stamenTonerTiles = "http://{s}.tile.osm.org/{z}/{x}/{y}.png";
const stamenTonerAttr =
  'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zoomLevel: 12,
      lat: 59.8,
      lng: 10.64,
      markers: [
        {
          key: "0",
          position: [59.81, 10.64],
          lat: 59.81,
          lng: 10.64,
          content: "Red tail is considered extremly cute"
        },
        {
          key: "1",
          position: [59.82, 10.63],
          lat: 59.82,
          lng: 10.63,
          content: "White tail will eat from your hand"
        },
        {
          key: "2",
          position: [59.8, 10.62],
          lat: 59.8,
          lng: 10.62,
          content: "Miss Foxy is quite shy"
        },
        {
          key: "3",
          position: [59.81, 10.65],
          lat: 59.81,
          lng: 10.65,
          content: "Mr Tail is considered extremly cute"
        },
        {
          key: "4",
          position: [59.82, 10.63],
          lat: 59.82,
          lng: 10.63,
          content: "Fort Fox will eat from your hand"
        },
        {
          key: "5",
          position: [59.78, 10.66],
          lat: 59.78,
          lng: 10.66,
          content: "Foxy is quite shy"
        }
      ]
    };
  }
  componentDidMount() {}

  onUpdateMarkers = () => {
    this.setState(state => {
      const markers = state.markers.map(marker => ({
        key: marker.key,
        position: [marker.lat * 1.1, marker.lng * 1.1], //marker.position,
        lat: marker.lat * 1.1,
        lng: marker.lng * 1.1,
        content: marker.content
      }));
      console.log(markers);
      return {
        markers
      }; //end return
    }); //end set state
    this.forceUpdate();
  };

  render() {
    let position = [this.state.lat, this.state.lng];

    return (
      <div>
        <Map
          id="mapid"
          center={position}
          zoom={this.state.zoomLevel}
          onClick={this.addPopup}
        >
          <TileLayer attribution={stamenTonerAttr} url={stamenTonerTiles} />

          {this.state.markers.map(marker => (
            <Marker position={marker.position} id={marker.key}>
              <Popup>
                <div>
                  <img src="./fox-icon.png" style={{ width: 66, height: 58 }} />
                  <p>{marker.content}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </Map>
        <button onClick={this.onUpdateMarkers}>Refresh positions</button>
      </div>
    );
  }
}

render(<App />, document.getElementById("mount"));
