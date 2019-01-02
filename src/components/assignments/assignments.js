import React, {Component} from 'react';
import axios from 'axios';
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
    }
  };

class Assignments extends Component {

	constructor(props) {
	  super(props);
	  this.state = {
        isLoading: true,
        assignments: [],
        selectedDate: new Date(),
        assignmentsTotal: 0,
        offset: 0,
        doctor:0,
        doctors:[],
        department:0,
        departments:[],
        seenonnly:0,
        emr:0,
        datefrom:Date(),
        dateto:Date(),
        page:1,
      };
      Moment.locale('en')
      this.handleClick = this.handleClick.bind(this)
    }
    
    returnarrays(){
        var a = new Array();
        this.state.assignments.map((assignment)=>{
            a.push([[assignment.CardNumber],[assignment.PatientFullName],[assignment.DoctorFullName],[Moment(assignment.Date).format('d MMM')]])
        });
        return a;    
    }
    handleClick(offset) {
        this.setState({ 
            offset
         });
        const assignmentsurl = 'http://192.168.1.8:8011/api/Assignments?datefrom=&dateto=&page='+(this.state.offset+20)/10+'&emr=&department=&doctor=&seenonlly=';
        axios.get(assignmentsurl)
            .then((response)=>{
                this.setState({
                    assignments: response.data,
                    isLoading : false
                })
            })
            .catch((error)=>console.log(error));
      }
    handleDateChange = date => {
        this.setState({ selectedDate: date });
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

	componentDidMount() {
        const assignmentsurl = 'http://192.168.1.8:8011/api/Assignments?datefrom=&dateto=&page='+this.state.page+'&emr=&department=&doctor=&seenonlly=';
        const assignmentstotalurl = 'http://192.168.1.8:8011/api/assignments';
        const departmentsurl = 'http://192.168.1.8:8011/api/departments';
        const usersurl = 'http://192.168.1.8:8011/api/users';
        axios.get(assignmentsurl)
            .then((response)=>{
                this.setState({
                    assignments: response.data,
                    isLoading : false
                })
            })
            .catch((error)=>console.log(error));
        axios.get(assignmentstotalurl)
            .then((response)=>{
                this.setState({
                    assignmentsTotal: response.data
                })
            })
            .catch((error)=>console.log(error));
        axios.get(departmentsurl)
            .then((response)=>{
                this.setState({
                    departments: response.data
                })
            })
            .catch((error)=>console.log(error));
        axios.get(usersurl)
            .then((response)=>{
                this.setState({
                    doctors: response.data
                })
            })
            .catch((error)=>console.log(error));
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
                                                onChange={this.handleDateChange}
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
                                                onChange={this.handleDateChange}
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
                                                />
                                            }
                                            label="Seen Onlly"
                                            InputLabelProps={{
                                                className: classes.input
                                            }}
                                        />
                                        <FormControl className={classes.formControl}>
                                            <InputLabel htmlFor="doctor-simple">Doctor</InputLabel>
                                            <Select
                                                value={this.state.doctor}
                                                onChange={this.doctorhandleChange}
                                            >
                                                <MenuItem value="">
                                                <em>None</em>
                                                </MenuItem>
                                                {this.state.doctors.map((item,i) => <MenuItem key={i} value={i}>{item}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                        <FormControl className={classes.formControl}>
                                            <InputLabel htmlFor="department-simple">Departments</InputLabel>
                                            <Select
                                                value={this.state.department}
                                                onChange={this.departmenthandleChange}
                                            >
                                                <MenuItem value="">
                                                <em>None</em>
                                                </MenuItem>
                                                {this.state.departments.map((item,i) => <MenuItem key={i} value={item.Name}>{item.Name}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                        <FormControl className={classes.formControl} style={{minWidth: 120,paddingLeft: 15}}>
                                            <Button variant="contained" size="large" color="white" className={classes.button}>
                                                Search
                                            </Button>
                                        </FormControl>
                                    </FormGroup>
                                </GridItem>
                            </MuiPickersUtilsProvider>
                                <Grid xs={12} sm={12} md={12}>
                                    <Button variant="contained" color="primary" className={classes.button}>
                                        Triaged
                                    </Button>
                                    <Button variant="contained" color="info" className={classes.button}>
                                        Absent
                                    </Button>
                                    <Button variant="contained" color="danger" className={classes.button}>
                                        Cancelled
                                    </Button>
                                    <Button variant="contained" color="success" className={classes.button}>
                                        Seen
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardHeader>
                        <CardBody>
                            {this.returnarrays().length==0?<CircularProgress className={classes.progress} />:""}
                            <Table
                                tableHeaderColor="primary"
                                tableHead={["MRN", "Full Name", "Doctor", "Date"]}
                                tableData={this.returnarrays()}
                            />
                            <Pagination
                                limit={10}
                                offset={this.state.offset}
                                total={this.state.assignmentsTotal}
                                onClick={(e, offset) => this.handleClick(offset)}
                                />
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
		);
	}
}

export default withStyles(styles)(Assignments);
