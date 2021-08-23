// Imported react libraries.
import React from 'react';
// Imported moment from moment.js to assist displaying the formats of the date and time.
import moment from 'moment';
// Imported icons from Font Awesome.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faClock } from '@fortawesome/free-solid-svg-icons';

// Created a function to update the time per second interval and moment() to set the format of the time.
let update = function () {
    document.getElementById("time")
        .innerHTML = moment().format('LTS');
}
setInterval(update, 1000);

// Created a header for the weather app and used moment() to display the date format.
function Header() {
    return (
        <div id="container">
            <header>
                <div>
                    <img src="./images/logo.png" alt="Logo" id="logo" />
                </div>
                <div id="datetime">
                    <p id="date"><FontAwesomeIcon icon={faCalendarCheck} />{moment().format('dddd, MMMM Do YYYY')}</p>
                    <div id="timecontainer">
                        <FontAwesomeIcon icon={faClock} />
                        <p id="time"></p>
                    </div>
                </div>
            </header>
        </div>
    );
}

// Exported Header to App.js.
export default Header;