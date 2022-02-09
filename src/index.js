import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import mapboxgl from 'mapbox-gl';

//components
mapboxgl.accessToken = 'pk.eyJ1Ijoic2FtdWVsbXVuZGlhIiwiYSI6ImNrejZvNmgwYzBlM3Mydm54cDV5Z3NuMjIifQ.0K9TY0yjH-imyVxml5PJNg';

export default class App extends React.PureComponent {
    //State to store Lat, Long, Zoom
    constructor(props) {
        super(props);
        this.state = {
          lng: 36.81,
          lat: -1.28,
          zoom: 12
        };
        this.mapContainer = React.createRef();

      }

      //map initialization
      //happens after react loads elements
      componentDidMount() {
        const { lng, lat, zoom } = this.state;
        const map = new mapboxgl.Map({
          container: this.mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [lng, lat],
          zoom: zoom
        });

        //add control
        map.addControl(new mapboxgl.NavigationControl(), 'top-left');

        //marker
        var marker = new mapboxgl.Marker()
        .setLngLat([36.81,-1.28])
        .addTo(map);
        
        //map state
        map.on('move', () => {
            this.setState({
              lng: map.getCenter().lng.toFixed(4),
              lat: map.getCenter().lat.toFixed(4),
              zoom: map.getZoom().toFixed(2)
            });
          });

      };
        

      render() {
        const { lng, lat, zoom } = this.state;
        return (
          <div>
          <div className="sidebar">
            Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
            <div ref={this.mapContainer} className="map-container" />
          </div>
        );
      }
}

ReactDOM.render(
    <React.StrictMode>
    <App />
    </React.StrictMode>,
    document.getElementById('root')
    );