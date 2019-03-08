import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Paper from '@material-ui/core/Paper';
import { fetchAppointments } from '../../redux/actions/appointmentAction';
require('react-big-calendar/lib/css/react-big-calendar.css');

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment) // or globalizeLocalizer
const myEventsList = [{
      'title': 'All Day Event very long title',
      'allDay': true,
      'start': new Date(2019, 2, 7),
      'end': new Date(2019, 2, 7)
    },
      {
        'title': 'Long Event',
        'start': new Date(2019, 2, 7),
        'end': new Date(2019, 2, 7)
      }
  ]
let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

 class appointments extends Component {
   componentDidMount() {
     const url = '';
     this.props.fetchAppointments();
   }
   
  render() {
    // const { classes } = this.props;
    return (
      <div>
        <Paper elevation={1}>
          <BigCalendar
            localizer={localizer}
            events={myEventsList}
            startAccessor="start"
            endAccessor="end"
            views={allViews}
            step={60}
            showMultiDayTimes
            style={{ height:600 }}
            // max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
            defaultDate={new Date()}
          />
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  appointments: state.appointment.appointments,
  isLoading: state.appointment.isLoading,
  hasError: state.appointment.hasError
});

const mapDispatchToProps = dispatch => ({
  fetchAppointments: (url) => dispatch(fetchAppointments(url))
});

export default compose(connect(mapStateToProps, { fetchAppointments }))(appointments);