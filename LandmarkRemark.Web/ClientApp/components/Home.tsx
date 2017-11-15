import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <h1>Landmark Remark</h1>
            <h2>Background</h2>
            <p>
                <ul>
                    <li>The font-end technology used was React.  This was an opportunity to get familiar with React SPAs, as I have not worked with this library before.</li>
                    <li>The backend technology used was .NET Core 2. Took advantage of .NET core JavaScriptServices which facilitate building client-side resources using Webpack</li>
                    <li>The database is SQL Server (embedded into application)</li>
                </ul>

                
                The code is available at: <a href="https://github.com/sammy-gee/landmarkremark/" target="_blank"> https://github.com/sammy-gee/landmarkremark/ </a>

                <br />
                <br />

                Open the solution file with Visual Studio 2017 (with .NET Core 2 and Node.js installed) and build to restore the packages both NuGet and NPM 
                After successful build, the applicaiton should be runnable through Visual Studio
                <br />
                <br />

                <NavLink to={'/landmarkremark'}>
                    <span></span>  Got to app
                </NavLink>
            </p>

            <h2>Approach</h2>
            <p>
                To ensure that the deadline is met, the approach to this build was to deliver a MVP.
                <br />
                <br />
                The application:
                <br />
                <ul>
                    <li>Allows the user to enter a message at their current location. Once a message is saved a marker for entry should appear on the map and the list. For the sake of testing the application at multiple locations, the user can override the coordinates of their current location.</li>
                    <li>Displays all landmark remarks on the map for all users. The current logged in user's remarks are displayed as green markers. The other users have red markers displayed. When a user hovers over a marker the username, message and the coordinates are displayed in a popup.</li>
                    <li>Lists all the entries made by all users. Each entry has the username, message and coordinates.</li>
                    <li>Allows the user to search the list by username and text, which shortens the results displayed based on search terms entered. </li>
                </ul>
            </p>
            <h2>Limitations</h2>
            <p>
                Some limitations that spring to mind are:
                <br />

                <h3>Functional</h3>
                    <ul>
                    <li>The application currently does not have an identity management, as there wasnt enough time to implement and wire this up. The logged in username is hardcoded (at the top of LandmarkRemark.tsx - change this to be logged in as a different user). Implementing this will affect the database structure.</li>
                    <li>Currently user's location is represented by raw coordinates. However is would be more intuitive to add an actual address/place name that can be retrieved from the map provider. Need a bit more effort for this.</li>
                    <li>Initialy the app had a pin at current location on map. This funcitonality was removed. The reason being is that when a user adds a message at their current location a new marker should automatically appear on map (exactly at same location). But it would not be visible as it would be blocked by the current location pin. Need a better way to visualise the user's current location </li>
                    <li>Currently the map only centres based on the user's current location. Ideally it should centre based on numerous actions. Example if a user clicks on one of the search results, the map would re-centre to that landmark remark marker.</li>
                    <li>UX is quite primitive. Changing it to something more sophisticated will/could affect the code design of the application</li>
                    <li>Even though the application is responsive, the styling needs further attention</li>
                    </ul>

                <h3>Non-Functional</h3>
                <ul>
                    <li>API security is yet to be implemented</li>
                    <li>There wasnt time to implement proper logging and exception management</li>
                    <li>Currently all the landmark remarks are retrieved and displayed on map/list. This would not be a viable solution for huge amounts of data. The large amounts of data, it should be filtered and represented by some kind of factor like the current region displayed on the map.</li>
                    <li>The current search and list are just a filter of results already on screen. For large amounts of data, a proper search would probably need query the data store on the server.</li>
                    <li>Due to time constraints validation was not implement. For example, on the form</li>
                    <li>Core can be further re-factored. For example, the Message Form in LandmarkRemark.tsx can be put into its own component and and putting the google api key into config.</li>
                    <li>No unit tests due to time constraints</li>
                    <li>More proper multi-device tests are needed to ensure compatability</li>
                    <li>To save time 3rd party ReactJS libraries were utilised. e.g. the maps and filtering. These need to be analysed to see if they would be viable in a production environment. E.g. Limitations on functionality, support, ease of customisation, performance, etc</li>
                </ul>
            </p>
            <h2>Observations</h2>
                <p>
                    Setup and implementation of the database and .NET backend part was relatively quick. At most a couple of hours.
                    The rest was spent to the React front-end. Probably even more than the recommended time, as some time was spent understanding aspects of React and getting it to "work".

                    <br />
                    <br />

                    Still quite a bit to learn about React bu it was a good start tot he technology. 
                </p>
        </div>;
    }
}
