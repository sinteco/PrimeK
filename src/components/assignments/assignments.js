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
import { connect } from 'react-redux';
import { fetchPosts } from '../../redux/actions/postActions';
import { createPosts } from '../../redux/actions/postActions';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { fetchAssignment } from '../../redux/actions/assignmentAction';


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
        isLoading: true,
        assignments: [],
        selectedDate: new Date(),
        assignmentsTotal: 0,
        offset: 0,
        doctor:"",
        doctors:[],
        department:"",
        departments:[],
        seenonnly:"",
        emr:"",
        datefrom:new Date(),
        dateto:new Date(),
        page:1,
      };
      Moment.locale('en')
      this.handleClick = this.handleClick.bind(this)
      this.searchClick = this.searchClick.bind(this)
    }
    
    returnarrays(){
        var a = new Array();
        this.props.assignments.map((assignment)=>{
            a.push([[assignment.CardNumber],[assignment.PatientFullName],[assignment.DoctorFullName],[Moment(assignment.Date).format('d MMM')]])
        });
        return a;    
    }
    searchClick(){
        const assignmentsurl = 'http://192.168.1.8:8011/api/Assignments?datefrom='+this.state.datefrom.toLocaleDateString('en-US')+'&dateto='+this.state.dateto.toLocaleDateString('en-US')+'&page=1&emr='+this.state.emr+'&department='+this.state.department+'&doctor='+this.state.doctor+'&seenonlly='+this.state.seenonnly;
        console.log(assignmentsurl);
        this.props.fetchAssignment(assignmentsurl);
        console.log(this.props.assignment);
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
        const assignmentsurl = 'http://192.168.1.6:8011/api/Assignments?datefrom='+this.state.datefrom.toLocaleDateString('en-US')+'&dateto='+this.state.dateto.toLocaleDateString('en-US')+'&page='+(this.state.offset+20)/10+'&emr='+this.state.emr+'&department='+this.state.department+'&doctor='+this.state.doctor+'&seenonlly='+this.state.seenonnly;
        axios.get(assignmentsurl)
            .then((response)=>{
                this.setState({
                    assignments: response.data.Data,
                    assignmentsTotal: response.data.Paging.totalCount,
                    isLoading : false
                })
            })
            .catch((error)=>console.log(error));
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

    componentWillReceiveProps(nextProps){
        //if(nextProps.newPost){
        //    this.props.posts.unshift(nextProps.newPost);
        //}
    }
    componentWillMount(){
        //const post = {title:"h",body:"n"}
        //this.props.fetchPosts();
        //this.props.createPosts(post);
    }
	componentDidMount() {
        const assignmentsurl = 'http://192.168.1.8:8011/api/Assignments?datefrom=&dateto=&page='+this.state.page+'&emr=&department=&doctor=&seenonlly=';
        const departmentsurl = 'http://192.168.1.6:8011/api/departments';
        const usersurl = 'http://192.168.1.6:8011/api/users';
        console.log(assignmentsurl);
        this.props.fetchAssignment(assignmentsurl);
        // axios.get(assignmentsurl)
        //     .then((response)=>{
        //         this.setState({
        //             assignments: response.data.Data,
        //             assignmentsTotal: response.data.Paging.totalCount,
        //             isLoading : false
        //         })
        //     })
        //     .catch((error)=>console.log(error));
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
        //console.log("data => "+this.props.assignments+" hay hay hay");
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
                                                {this.state.doctors.map((item,i) => <MenuItem key={i} value={item}>{item}</MenuItem>)}
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
                                                {this.state.departments.map((item,i) => <MenuItem key={i} value={item.Name}>{item.Name}</MenuItem>)}
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
                            {this.props.isLoading?<CircularProgress className={classes.progress} />:""}
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

Assignments.PropTypes = {
    //fetchPosts: PropTypes.func.isRequired,
    //posts: PropTypes.array.isRequired,
    //createPosts: PropTypes.func.isRequired,
    //newPost: PropTypes.object,
    fetchAssignment: PropTypes.func.isRequired,
    assignments: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    //posts: state.posts.items,
    //newPost: state.posts.item,
    assignments: state.assignments.items,
    isLoading:false
});

export default compose(withStyles(styles),connect(mapStateToProps, { fetchAssignment }))(Assignments);
