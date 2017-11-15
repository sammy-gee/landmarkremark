import * as React from 'react';
import GoogleMap from 'google-map-react';
import PropTypes from 'prop-types';
import { MapPlace } from './MapPlace';

export interface IMapProps {
    center: PropTypes.array, 
    zoom: PropTypes.number, 
    myMapPlaces: PropTypes.array,
    otherMapPlaces: PropTypes.array
}


export class Map extends React.Component<IMapProps, {}> {

    static defaultProps = {}


    constructor(props) {
        super(props);
    }


    render() {

        console.log(this.props.center)

        const MyMapPlaces = this.props.myMapPlaces.map(marker => (
            <MapPlace
                key={marker.id}
                username={marker.username}
                lat={marker.latLng[0]}
                lng={marker.latLng[1]}
                text={marker.text}
                className={'map-marker-mine'}
            />
        ));

        const OtherMapPlaces = this.props.otherMapPlaces.map(marker => (
            <MapPlace
                key={marker.id}
                username={marker.username}
                lat={marker.latLng[0]}
                lng={marker.latLng[1]}
                text={marker.text}
                className={'map-marker-others'}
            />
        ));


        return (
            <GoogleMap
                apiKey={"AIzaSyDuZ-Beep7SRDxrglycb8zAODj6P7uylFc"} 
                defaultCenter={this.props.center}
                zoom={this.props.zoom}>
                {OtherMapPlaces} 
                {MyMapPlaces}
            </GoogleMap>
        );
    }
}



