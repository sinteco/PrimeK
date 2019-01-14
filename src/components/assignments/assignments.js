import React, {Component} from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "../Table/CustomTable";
import Moment from 'moment';
import GridItem from "../Grid/GridItem.jsx";
import GridContainer from "../Grid/GridContainer.jsx";
import Card from "../Card/Card.jsx";
import CardHeader from "../Card/CardHeader.jsx";
import CardBody from "../Card/CardBody.jsx";
import Button from "../CustomButtons/Button.jsx";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import CircularProgress from '@material-ui/core/CircularProgress';
import Pagination from "material-ui-flat-pagination";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { FormGroup } from '@material-ui/core';
import { connect } from 'react-redux';
import { fetchDepartment } from '../../redux/actions/assignmentAction';
import { fetchDoctor } from '../../redux/actions/assignmentAction';
import propTypes from 'prop-types';
import { compose } from 'redux';
import { fetchAssignment } from '../../redux/actions/assignmentAction';
import { fetchSeen } from '../../redux/actions/assignmentAction';
import { fetchTriaged } from '../../redux/actions/assignmentAction';
import { fetchCancelled } from '../../redux/actions/assignmentAction';
import { fetchAbsent } from '../../redux/actions/assignmentAction';
import AddAlert from "@material-ui/icons/AddAlert";
import Snackbar from "components/Snackbar/Snackbar.jsx";


const styles = {
    cardCategoryWhite: {
      "&,& a,& a:hover,& a:focus": {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
      },
      "& a,& a:hover,& a:focus": {
        color: "#FFFFFF"
      }
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none",
      "& small": {
        color: "#777",
        fontSize: "65%",
        fontWeight: "400",
        lineHeight: "1"
      }
    },input:
    {
        color: "white !important"
    },cssLabel: {
    '&$cssFocused': {
      color: "white !important"
    },
  },
  cssFocused: {color: "white !important"},
    formControl: {
        minWidth: 300,
    },
    checkboxLabelA: {
        color: "white !important"
      },
  };

class Assignments extends Component {

	constructor(props) {
	  super(props);
	  this.state = {
        //isLoading: true,
        //assignments: [],
        selectedDate: new Date(),
        //assignmentsTotal: 0,
        offset: 0,
        doctor:"",
        //doctors:[],
        department:"",
        //departments:[],
        seenonnly:"",
        emr:"",
        datefrom:new Date(),
        dateto:new Date(),
        page:1,
        selected:'a',
      };
      Moment.locale('en')
      this.handleClick = this.handleClick.bind(this)
      this.searchClick = this.searchClick.bind(this)
      this.handleSeenClick = this.handleSeenClick.bind(this);
      this.handleSelectChange = this.handleSelectChange.bind(this);
      this.handleCancelledClick = this.handleCancelledClick.bind(this);
      this.handleAbsentClick = this.handleAbsentClick.bind(this);
      this.handleTriagedClick = this.handleTriagedClick.bind(this);
    }
    handleCancelledClick(){
        const cancellednurl = '/Assignments/Cancelled/'+this.state.selected;
        this.props.fetchCancelled(cancellednurl);
    }
    handleAbsentClick(){
        const absenturl = '/Assignments/Absent/'+this.state.selected;
        this.props.fetchAbsent(absenturl);
    }
    handleTriagedClick(){
        const triagedurl = '/Assignments/Triaged/'+this.state.selected;
        this.props.fetchTriaged(triagedurl);
    }
    returnarrays(){
        var a = new Array();
        this.props.assignments.map((assignment)=>{
            a.push([[assignment.Id],[assignment.CardNumber],[assignment.PatientFullName],[assignment.DoctorFullName],[Moment(assignment.Date).format('d MMM')]])
        });
        return a;    
    }
    searchClick(){
        const assignmentsurl = '/Assignments?datefrom='+this.state.datefrom.toLocaleDateString('en-US')+'&dateto='+this.state.dateto.toLocaleDateString('en-US')+'&page=1&emr='+this.state.emr+'&department='+this.state.department+'&doctor='+this.state.doctor+'&seenonlly='+this.state.seenonnly;
        this.state.isLoading=true;
        this.props.fetchAssignment(assignmentsurl);
        // axios.get(assignmentsurl)
        //     .then((response)=>{
        //         console.log(response.data);
        //         this.setState({
        //             assignments: response.data.Data,
        //             assignmentsTotal: response.data.Paging.totalCount,
        //             isLoading : false
        //         });
        //     })
        //     .catch((error)=>console.log(error));
    }
    handleClick(offset) {
        this.setState({ 
            offset,
            page:(this.state.offset+20)/10
         });
        const assignmentsurl = '/Assignments?datefrom='+this.state.datefrom.toLocaleDateString('en-US')+'&dateto='+this.state.dateto.toLocaleDateString('en-US')+'&page='+(this.state.offset+20)/10+'&emr='+this.state.emr+'&department='+this.state.department+'&doctor='+this.state.doctor+'&seenonlly='+this.state.seenonnly;
        this.props.fetchAssignment(assignmentsurl);
        console.log(assignmentsurl);
        // axios.get(assignmentsurl)
        //     .then((response)=>{
        //         this.setState({
        //             assignments: response.data.Data,
        //             assignmentsTotal: response.data.Paging.totalCount,
        //             isLoading : false
        //         })
        //     })
        //     .catch((error)=>console.log(error));
      }
    handleDateFromChange = date => {
        this.setState({ datefrom: date });
      };
    handleDateToChange = date => {
        this.setState({ dateto: date });
      };
    doctorhandleChange = event => {
        this.setState({ doctor: event.target.value });
      };
    departmenthandleChange = event => {
        this.setState({ department: event.target.value });
      };
    seenhandleChange = name => event => {
        this.setState({
          seenonnly: event.target.checked ,
        });
      };
    emrhandleChange = name => event => {
        this.setState({
          emr: event.target.value,
        });
      };
    handleSelectChange = event => {
        this.setState({ selected: event.target.value });
      };
    handleSeenClick() {
        const makeseenurl = '/Assignments/Seen/'+this.state.selected;
        this.props.fetchSeen(makeseenurl);
      }
	componentDidMount() {
        const assignmentsurl = '/Assignments?datefrom=&dateto=&page='+this.state.page+'&emr=&department=&doctor=&seenonlly=';
        const departmentsurl = '/departments';
        const usersurl = '/users';
        console.log(assignmentsurl);
        this.props.fetchAssignment(assignmentsurl);
        this.props.fetchDepartment(departmentsurl);
        this.props.fetchDoctor(usersurl);
	}

	render(){
        const { classes } = this.props;
		return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <Grid container className={classes.grid} justify="space-around">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <GridItem item xs={12} sm={12} md={12}>
                                    <FormGroup row>
                                        <FormControl className={classes.formControl}>
                                            <TextField
                                                id="standard-name"
                                                label="MRN"
                                                className={classes.textField}
                                                value={this.state.name}
                                                onChange={this.emrhandleChange('mrn')}
                                                margin="normal"
                                                InputLabelProps={{
                                                    classes: {
                                                    root: classes.cssLabel,
                                                    focused: classes.cssFocused,
                                                    },className: classes.input
                                                }}
                                            />
                                        </FormControl>
                                        <FormControl className={classes.formControl}>
                                            <DatePicker
                                                margin="normal"
                                                label="From"
                                                value={this.state.datefrom}
                                                onChange={this.handleDateFromChange}
                                                InputLabelProps={{
                                                    classes: {
                                                    root: classes.cssLabel,
                                                    focused: classes.cssFocused,
                                                    },className: classes.input
                                                }}
                                            />
                                        </FormControl>
                                        <FormControl className={classes.formControl}>
                                            <DatePicker
                                                margin="normal"
                                                label="To"
                                                value={this.state.dateto}
                                                onChange={this.handleDateToChange}
                                                InputLabelProps={{
                                                    classes: {
                                                    root: classes.cssLabel,
                                                    focused: classes.cssFocused,
                                                    },className: classes.input
                                                }}
                                                inputProps={{
                                                    className: classes.input
                                                }}
                                            />
                                        </FormControl>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                checked={this.state.seenonnly}
                                                onChange={this.seenhandleChange(1)}
                                                value={this.state.seenonnly}
                                                style={{color: '#fff'}}
                                                />
                                            }
                                            classes={{label: classes.checkboxLabelA}}
                                            label="Seen Onlly"
                                            InputLabelProps={{
                                                className: classes.input
                                            }}
                                        />
                                        <FormControl className={classes.formControl}>
                                            <InputLabel FormLabelClasses={{root: classes.input,focused: classes.input}} htmlFor="doctor-simple">Doctor</InputLabel>
                                            <Select
                                                value={this.state.doctor}
                                                onChange={this.doctorhandleChange}
                                            >
                                                <MenuItem value="">
                                                <em>None</em>
                                                </MenuItem>
                                                {this.props.doctors.map((item,i) => <MenuItem key={i} value={item}>{item}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel FormLabelClasses={{root: classes.input,focused: classes.input}} htmlFor="department-simple">Departments</InputLabel>
                                            <Select
                                                value={this.state.department}
                                                onChange={this.departmenthandleChange}
                                            >
                                                <MenuItem value="">
                                                <em>None</em>
                                                </MenuItem>
                                                {this.props.departments.map((item,i) => <MenuItem key={i} value={item.Name}>{item.Name}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                        <FormControl className={classes.formControl} style={{minWidth: 120,paddingLeft: 15}}>
                                            <Button onClick={this.searchClick} variant="contained" size="large" color="white" className={classes.button}>
                                                Search
                                            </Button>
                                        </FormControl>
                                    </FormGroup>
                                </GridItem>
                            </MuiPickersUtilsProvider>
                                <Grid xs={12} sm={12} md={12}>
                                    <Button onClick={this.handleTriagedClick} variant="contained" color="primary" className={classes.button} style={localStorage.getItem('role')!='Doctor' ? {} : { display: 'none' }}>
                                        Triaged
                                    </Button>
                                    <Button onClick={this.handleAbsentClick} variant="contained" color="info" className={classes.button} style={localStorage.getItem('role')!='Doctor' ? {} : { display: 'none' }}>
                                        Absent
                                    </Button>
                                    <Button onClick={this.handleCancelledClick} variant="contained" color="danger" className={classes.button} style={localStorage.getItem('role')!='Doctor' ? {} : { display: 'none' }}>
                                        Cancelled
                                    </Button>
                                    <Button onClick={this.handleSeenClick} variant="contained" color="success" className={classes.button} style={localStorage.getItem('role')=='Doctor' ? {} : { display: 'none' }}>
                                        Seen
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardHeader>
                        <CardBody>
                            {this.props.isLoading?<CircularProgress className={classes.progress} />:""}
                            <Table
                                tableHeaderColor="primary"
                                tableHead={["ID","MRN", "Full Name", "Doctor", "Date"]}
                                tableData={this.returnarrays()}
                                handleSelectChange = {this.handleSelectChange}
                                selected={this.state.selected}
                            />
                            <Pagination
                                limit={10}
                                offset={this.state.offset}
                                total={this.props.totalCount}
                                onClick={(e, offset) => this.handleClick(offset)}
                                />
                            <Snackbar
                                autoHideDuration={6000}
                                place="br"
                                color="info"
                                icon={AddAlert}
                                message="Selected Pateient has seen !"
                                open={this.props.make_it_seen}
                                closeNotification={() => this.setState({ bl: false })}
                                close
                            />
                            <Snackbar
                                autoHideDuration={6000}
                                place="br"
                                color="info"
                                icon={AddAlert}
                                message="Selected Pateient has marked as absent !"
                                open={this.props.absent}
                                closeNotification={() => this.setState({ bl: false })}
                                close
                            />
                            <Snackbar
                                autoHideDuration={6000}
                                place="br"
                                color="info"
                                icon={AddAlert}
                                message="Selected Pateient has marked as cancelled !"
                                open={this.props.cancelled}
                                closeNotification={() => this.setState({ bl: false })}
                                close
                            />
                            <Snackbar
                                autoHideDuration={6000}
                                place="br"
                                color="info"
                                icon={AddAlert}
                                message="Selected Pateient has marked as triaged !"
                                open={this.props.triaged}
                                closeNotification={() => this.setState({ bl: false })}
                                close
                            />
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
		);
	}
}

Assignments.propTypes = {
    //fetchPosts: propTypes.func.isRequired,
    //posts: propTypes.array.isRequired,
    //createPosts: propTypes.func.isRequired,
    //newPost: propTypes.object,
    fetchAssignment: propTypes.func.isRequired,
    fetchDepartment: propTypes.func.isRequired,
    fetchDoctor: propTypes.func.isRequired,
    fetchSeen: propTypes.func.isRequired,
    fetchAbsent: propTypes.func.isRequired,
    fetchAssignment: propTypes.func.isRequired,
    fetchCancelled: propTypes.func.isRequired,
    assignments: propTypes.array.isRequired,
    totalCount: propTypes.number.isRequired,
    departments: propTypes.array.isRequired,
    doctors: propTypes.array.isRequired,
    isLoading: propTypes.bool.isRequired,
    hasError: propTypes.bool.isRequired,
    make_it_seen: propTypes.bool.isRequired,
    triaged: propTypes.bool.isRequired,
    cancelled: propTypes.bool.isRequired,
    absent: propTypes.bool.isRequired
}

const mapStateToProps = state => ({
    //newPost: state.posts.item,
    doctors: state.assignments.doc,
    departments: state.assignments.dep,
    totalCount: state.assignments.item,
    assignments: state.assignments.items,
    isLoading: state.assignments.isLoading,
    hasError: state.assignments.hasError,
    make_it_seen: state.assignments.make_it_seen,
    absent: state.assignments.absent,
    cancelled: state.assignments.cancelled,
    triaged: state.assignments.Triaged
});
export default compose(withStyles(styles),connect(mapStateToProps, { fetchAssignment,fetchDepartment,fetchDoctor,fetchSeen,fetchTriaged,fetchAbsent,fetchCancelled }))(Assignments);
