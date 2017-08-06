import React, { Component } from 'react';
import api from './utils/api.js';

class ShowDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seasons: [],
            episodes: []
        }
    }

    componentDidMount() {
        this.getShowDetail().then(res => {
            if (res.success) {
                let seasons = res.payload.reduce((prev, curr) => {
                        if (prev.indexOf(curr.season) < 0) {
                            prev.push(curr.season)
                        }
                        return prev;
                    }, []);
                this.setState({
                    seasons: seasons
                })
            }
        });
    }

    getShowDetail() {
        return api.showDetail(this.props.location.pathname.substr(6));
    }

    render() {
        return (
            <div>
                {this.state.seasons.map((season, index) => {
                    return <div key={index} style={{fontSize: 'x-large'}}>
                        Season {season}
                        </div>
                })}
            </div>
        );
    }
}

export default ShowDetail;