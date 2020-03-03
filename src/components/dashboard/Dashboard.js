import React, { Component } from 'react';

import Navbar from '../navbar/Navbar';
import Matches from '../matches/Matches';

class Dashboard extends Component {

    state = {
        matchType: 'All',
        status: 'upcoming',
        refetch: false,
    };

    manageFilters = (e) => {
        const { refetch } = this.state;
        this.setState({
            [e.target.title]: e.target.id,
            refetch: !refetch,
        });
    }

    render() {
        const { matchType, status, refetch } = this.state;
        return (
            <div className="ph2">
                <div className="w-100">
                    <Navbar text='Schedule' />
                    <div className="f6 bg-white pt3 pb0 top-0 pos-sticky">
                        <div className="flex items-center justify-center flex-column mt2 mb2 tc">
                            <div className='cf dib'>
                                <div className={`${status === 'upcoming' ? 'red bg-white' : 'gray bg-light-gray'} b b--silver bb bl br--left br2 bt dib f6 fl ph2 pv1`} title="status" id="upcoming" onClick={this.manageFilters}>Upcoming</div>
                                <div className={`${status === 'running' ? 'red bg-white' : 'gray bg-light-gray'} b--silver b ba dib f6 fl ph2 pv1`} title="status" id="running" onClick={this.manageFilters}>Running</div>
                                <div className={`${status === 'completed' ? 'red bg-white' : 'gray bg-light-gray'} b--silver b dib f6 fl ph2 pv1 br--right br2 br bt bb`} title="status" id="completed" onClick={this.manageFilters}>Completed</div>
                            </div>
                        </div>
                        <nav className="pa3 pa4-ns pb0">
                            <div className="tc pb2">
                                <div className={`gray f6 f5-ns dib w-20 pb1 ${matchType === 'All' ? 'bb b--red' : ''}`} title="matchType" id="All" onClick={this.manageFilters}>All</div>
                                <div className={`gray f6 f5-ns dib w-50 pb1 ${matchType === 'International' ? 'bb b--red' : ''}`} title="matchType" id="International" onClick={this.manageFilters}>International</div>
                                <div className={`gray f6 f5-ns dib w-30 pb1 ${matchType === 'Domestic' ? 'bb b--red' : ''}`} title="matchType" id="Domestic" onClick={this.manageFilters}>Domestic</div>
                            </div>
                        </nav>
                    </div>
                    <Matches 
                        matchType={matchType}
                        status={status}
                        refetch={refetch}
                    />
                </div>
            </div>
        );
    }
}

export default Dashboard;