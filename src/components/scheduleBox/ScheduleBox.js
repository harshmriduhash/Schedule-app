import React from 'react';
import { Link } from 'react-router-dom';

const ScheduleBox = (props) => {
    const { matchSchedule } = props;
    const { matchScore } = matchSchedule;
    let completedStatus = ((matchSchedule.matchStatus === 'completed') && matchSchedule.matchResult) ? matchSchedule.matchResult : ((matchSchedule.matchStatus === 'completed') && !matchSchedule.matchResult && (matchScore[0].teamScore[0].runsScored - matchScore[1].teamScore[0].runsScored) > 0) ? `${matchScore[0].teamFullName} won the match` : ((matchSchedule.matchStatus === 'completed') && !matchSchedule.matchResult && (matchScore[0].teamScore[0].runsScored - matchScore[1].teamScore[0].runsScored) < 0) ? `${matchScore[1].teamFullName} won the match` : (matchSchedule.matchStatus === 'completed' && !matchSchedule.matchResult && (matchScore[0].teamScore[0].runsScored === matchScore[1].teamScore[0].runsScored)) ? 'It was a tie' : '';
    return (
        <div className="bg-white pb3 pr3 pl3 mt0 mb3 pt2" id={matchSchedule.matchID}>
            <div className="pb2 pb4 pt2 w-100 bg-light-gray">
                <Link to='/' className="">
                    <div className="fl f6 fw6 black-80 dib">{matchSchedule.seriesName ? matchSchedule.seriesName : 'Unnamed Series'}</div>
                    <div className="fr f5 fw4 black-60 dib"> > </div>
                </Link>
            </div>
            <div className="mt2 mb2 f6 fw6 black-80">{matchSchedule.matchNumber} - {matchSchedule.matchType ? matchSchedule.matchType : matchSchedule.matchStatus}</div>
            {(
                matchScore.map((team) => {
                    return (
                        <div className="mt2 mb2" key={team.teamID}>
                            <div className="f6 w-20 black-80 dib">{team.teamShortName}</div>
                            <div className="ml2 f6 fw6 black-80 dib">{team.teamFullName} {matchSchedule.matchStatus !== 'upcoming' && team.teamScore && team.teamScore[0] && team.teamScore[0].runsScored ? `(${team.teamScore[0].runsScored})` : '' }</div>
                        </div>
                    );
                })
            )}
            <div className="flex items-center justify-center flex-column mt3">
                <div className="w-60 tc pa1 pt1 pb1 br4 bg-washed-red f6 ttc">{completedStatus ? completedStatus : matchSchedule.toss ? matchSchedule.toss : matchSchedule.matchStatus}</div>
            </div>
        </div>
    );
}

export default ScheduleBox;