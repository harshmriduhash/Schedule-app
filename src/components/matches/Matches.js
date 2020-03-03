import React, { Component } from 'react';

import ScheduleBox from '../scheduleBox/ScheduleBox';

class Matches extends Component {

    state = {
        loading: false,
        data: null,
        error: null,
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.refetch !== this.props.refetch) {
            this.fetchData();
        }
    }

    fetchData = () => {
        this.setState({ loading: true }, () => {
            fetch('https://api.devcdc.com/cricket', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                        query($type: String, $status: String, $page: Int) { 
                            schedule(type: $type, status: $status, page: $page) {
                                matchType
                                seriesName
                                matchID
                                matchStatus
                                matchNumber
                                matchResult
                                toss
                                matchScore {
                                    teamID
                                    teamFullName
                                    teamShortName
                                    teamScore {
                                        runsScored
                                    }
                                }
                            }
                        }`,
                        variables: {
                            type: this.props.matchType,
                            status: this.props.status,
                            page: 0
                        },
                }),
            })
            .then(response => {
              return response.json()
            })
            .then(responseAsJson => {
                if (responseAsJson.errors) {
                    this.setState({
                        loading: false,
                        error: responseAsJson.errors[0],
                        data: responseAsJson.data,
                    });
                } else {
                    this.setState({
                        loading: false,
                        error: null,
                        data: responseAsJson.data,
                    });
                }
            })
            .catch(error => {
                this.setState({
                    loading: false,
                    error,
                    data: null,
                });
            });
        });
    }

    render() {
        const { matchType, status } = this.props;
        const { loading, data, error } = this.state;

        if (error) return <p>Error! {error.message}</p>

        if (!data || loading) return <p>Loading...</p>;

        const schedules = data && data.schedule ? data.schedule : [];
        let scheduleHtml = [];
        schedules && schedules.length > 0 && schedules.map((schedule) => {
            scheduleHtml.push(
                <ScheduleBox 
                    matchSchedule={schedule}
                    key={schedule.matchID}
                />
            );
            return schedule;
        });

        if (scheduleHtml.length === 0) {
            scheduleHtml.push(<div className="bg-white pa2">No Matches Scheduled</div>);
        }

        return scheduleHtml;
    }
}

export default Matches;