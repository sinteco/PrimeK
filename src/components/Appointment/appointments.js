import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Paper from '@material-ui/core/Paper';
import propTypes from 'prop-types';
import { fetchAppointments } from '../../redux/actions/appointmentAction';
require('react-big-calendar/lib/css/react-big-calendar.css');

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer
let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

 class appointments extends Component {
   constructor(props) {
     super(props);
     this.state = {
       Events: []
     }
    }
   componentDidMount() {
     const url = '/Appointments';
     this.props.fetchAppointments(url);
   }
   EventsList() {
     var event = new Array();
     this.props.Appointment.map((item)=>{
      event.push(
         {
           'title': item.Note,
           'start': item.Date,
           'end': item.Date
         }
       )
     });
     return event;
   }
  render() {
    // const { classes } = this.props;
    return (
      <div>
        <Paper elevation={1}>
          <BigCalendar
            localizer={localizer}
            events={this.EventsList()}
            startAccessor="start"
            endAccessor="end"
            views={allViews}
            step={60}
            showMultiDayTimes
            style={{ height:550 }}
            // max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
            defaultDate={new Date()}
          />
        </Paper>
      </div>
    )
  }
}
appointments.propTypes = {
    fetchAppointments: propTypes.func.isRequired,
    isLoading: propTypes.bool.isRequired,
    hasError: propTypes.bool.isRequired,
    Appointment: propTypes.array.isRequired
}
const mapStateToProps = (state) => ({
  Appointment: state.appointment.appointments,
  isLoading: state.appointment.isLoading,
  hasError: state.appointment.hasError
});

const mapDispatchToProps = dispatch => ({
  fetchAppointments: (url) => dispatch(fetchAppointments(url))
});

export default compose(connect(mapStateToProps, { fetchAppointments }))(appointments);