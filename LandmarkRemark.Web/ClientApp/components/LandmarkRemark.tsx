import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';
import { Map } from './Map';
import { LandmarkRemarkList } from './LandmarkRemarkList';

//This is a temp workaround for an authenticated logged in user - to be replaced by real authentication mechanism
const MY_USERNAME = "sam";

//Sydney as default location
var MY_CURRENT_LOCATION_DEFAULT = [-33.8737, 151.1957];


interface IFetchLandmarkRemarkState {
    landmarkRemarks: LanmarkRemark[];
    loading: boolean;
    myCurrentNote: string;
    myCurrentLat: number;
    myCurrentLng: number;
}

export class LandmarkRemark extends React.Component<RouteComponentProps<{}>, IFetchLandmarkRemarkState> {

    constructor() {
        super();
        this.state = {
            landmarkRemarks: [],
            loading: true,
            myCurrentNote: '',
            myCurrentLat: MY_CURRENT_LOCATION_DEFAULT[0],
            myCurrentLng: MY_CURRENT_LOCATION_DEFAULT[1]
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        //obtain location from browser otherwise if rejected/error set to default
        var component = this;
        navigator.geolocation.getCurrentPosition(
            function (position) {
                component.setState({ myCurrentLat: position.coords.latitude, myCurrentLng: position.coords.longitude });
            },
            function (error) {
                component.setState({ myCurrentLat: MY_CURRENT_LOCATION_DEFAULT[0], myCurrentLng: MY_CURRENT_LOCATION_DEFAULT[1] });
            },
            { maximumAge: 60000, timeout: 5000, enableHighAccuracy: true });
       
        this.loadMapData();
    }

    //Funciton to obtain all the landmarks
    loadMapData() {
        
        fetch('api/landmarkremarks/all')
            .then(response => response.json() as Promise<LanmarkRemark[]>)
            .then(data => {
                this.setState({ landmarkRemarks: data, loading: false });
            });
    }

     handleSubmit(event) {
         
         event.preventDefault();

         var component = this;

         let newLanmarkRemark = {
             Username: MY_USERNAME,
             Text: this.state.myCurrentNote,
             LatLng: [this.state.myCurrentLat, this.state.myCurrentLng]
         }

         fetch('api/landmarkremarks/add', {
             method: 'POST',
             headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify(newLanmarkRemark)
         }).then(function (resp) {

             console.log(resp);
             component.loadMapData();

         }).catch(function (error) {
             console.log(error);
                //todo: handle error
                alert(error);
             });
  
    }

     handleInputChange(event) {
         const target = event.target;
         const value = target.value;
         const name = target.name;

         this.setState({
             [name]: value
         });
     }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : (
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <header>
                            <div>
                                Lat Long fields are there as a workaround to allow entering multiple notes at dirrent locations. Change these to place marker at different locations
                            </div>
                        </header>
                        <div>
                            <label>Current Lat</label>
                            <div>
                                <input name="myCurrentLat" type="text" value={this.state.myCurrentLat} onChange={this.handleInputChange} />
                            </div>
                        </div>
                        <div>
                            <label>Current Long</label>
                            <div>
                                <input name="myCurrentLng" type="text" value={this.state.myCurrentLng} onChange={this.handleInputChange} />
                            </div>
                        </div>
                        <div>
                            <label id="note">
                                Note for my current location
			               </label>
                            <div>
                                <textarea name="myCurrentNote" value={this.state.myCurrentNote} onChange={this.handleInputChange} maxLength={100} />
                            </div>

                        </div>
                        <div>
                            <div>
                                <input type="submit" value="Add a Note" />
                            </div>
                        </div>
                    </form>
                    <br />


                    {LandmarkRemark.renderMap([this.state.myCurrentLat, this.state.myCurrentLng], this.state.landmarkRemarks)} 
                    <br />
                    <LandmarkRemarkList places={this.state.landmarkRemarks} />
                </div>
                
                );

        return <div>
            <h1>Landmark Remarks</h1>
            
            {contents}


        </div>;
    }

    private static renderMap(myCurrentLocation: number[], landmarkRemarks: LanmarkRemark[]) {

        //split up the markers into 2 sets the users and all others

        var myLandmarkRemarks = landmarkRemarks.filter(function (myLandmarkRemark) {
            return myLandmarkRemark.username == MY_USERNAME;
        });

        var otherLandmarkRemarks = landmarkRemarks.filter(function (myLandmarkRemark) {
            return myLandmarkRemark.username != MY_USERNAME;
        });

        return (<div className="map">
                    <div>
                        <div>
                            <Map zoom={11} center={myCurrentLocation} myMapPlaces={myLandmarkRemarks} otherMapPlaces={otherLandmarkRemarks} />
                        </div>
                    </div>
                </div>);
    }
}

interface LanmarkRemark {
    key: string;
    username: string;
    text: string;
    latLng: number[];
}
