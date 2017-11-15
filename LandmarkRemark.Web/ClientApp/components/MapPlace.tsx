import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import PropTypes from 'prop-types';

interface IMapPlacetProps {
    key: string
    username:string
    text: string;
    lat: number;
    lng: number;
    className: string;
}


export class MapPlace extends React.Component<IMapPlacetProps, {}> {

    static defaultProps = {};

    render() {
        return (
            <div className="hint--html hint--top">
                <div className={this.props.className}>
                    <div>
                    </div>
                </div>
                <div className="hint__content">
                    <h5>{this.props.username}</h5>
                    {this.props.text}
                    <br />
                    <br />
                    Location: {this.props.lat},{this.props.lng}
                </div>
            </div>
    );
    }
}