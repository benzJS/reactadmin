import React, { useEffect, useState, Component } from 'react';
import $ from 'jquery';
import moment from 'moment';
window.jQuery = $;
require('signalr');

class Leading extends Component {
    state = {
        leadingMessages: []
    }
    componentDidMount() {
        fetch('https://test.bdtnetworks.com/api/test/loadreward')
            .then(res => res.json())
            .then(data => this.setState({ leadingMessages: data.data }));
        let connection = $.hubConnection('https://api.bdtnetworks.com/signalr/hubs');
        let proxy = connection.createHubProxy('chatHub');
        
        proxy.on('loadReward', function() {
            fetch('https://test.bdtnetworks.com/api/test/loadreward')
                .then(res => res.json())
                .then(data => this.setState({ leadingMessages: data.data }));
        })

        // atempt connection, and handle errors
        connection.start()
            .done(function(){ console.log('Now connected, connection ID=' + connection.id); })
            .fail(function(){ console.log('Could not connect'); });
    }
    render() {
        return <div className="content">
            <ul style={{height: 500, overflow: 'auto', lineHeight: 2}}>
                {
                    this.state.leadingMessages.map(message => {
                        const timeago = message.TimeAgo.replace(/Z/gi, '');
                        return <li>
                            <p>
                                (<time class="text-success"> {moment(timeago).fromNow()} </time>)
                                <strong> {message.User}</strong> lead campaign
                                <strong> {message.CamName}</strong> earn
                                <strong> {message.Point}</strong> points
                            </p>
                            <p>
                                Network: <strong>{message.Network}</strong> | IP: <strong>{message.IP}</strong>
                            </p>
                            <p>
                                Time click: <strong>{message.DateClick}</strong> | Time lead: <strong>{message.DateLead}</strong>
                            </p>
                        </li>
                    })
                }
            </ul>
        </div>
    }
}

export default Leading;