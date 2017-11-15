import * as React from 'react';
import PropTypes from 'prop-types';
import SearchInput, { createFilter } from 'react-search-input'

const KEYS_TO_FILTERS = ['username', 'text'];

export interface ILandmarkRemarkListProps {
    places: PropTypes.array
}

interface ILandmarkRemarkListState {
    searchTerm: string;
}

export class LandmarkRemarkList extends React.Component<ILandmarkRemarkListProps, ILandmarkRemarkListState> {
    constructor(props) {
        super(props)
        this.state = {
            searchTerm: ''
        }
        this.searchUpdated = this.searchUpdated.bind(this)
    }

    render() {
        const filteredLandmarkRemarks = this.props.places.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

        return (
            <div>
                <SearchInput className="search-input" onChange={this.searchUpdated} />
                {filteredLandmarkRemarks.map(landmarkRemark => {
                    return (
                        <div className="search-result" key={landmarkRemark.key}>
                            <div className="search-result-name">{landmarkRemark.username}</div>
                            <div className="">{landmarkRemark.text}</div>
                            <div className="">{landmarkRemark.latLng[0]},{landmarkRemark.latLng[1]}</div>
                        </div>
                    )
                })}
            </div>
        )
    }

    searchUpdated(term) {
        this.setState({ searchTerm: term })
    }
}


