import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import { compose } from 'redux';
import { fetchItems } from '../../redux/actions/medicatioOrderAction';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

let id = 0;

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Medication: '',
            Dose:'',
            Frequency:'',
            Routh: '',
            StartDate: new Date(),
            NoOfDays:'',
            Quantity:'',
            Form:'',
            Remark:'',
            rows: []
        }
        this.handleClick = this.handleClick.bind(this);
    }

createData(name, calories, fat, carbs, protein) {
  id += 1;
  this.state.rows.push({ id, name, calories, fat, carbs, protein });
};

handleChange = name => event => {
    this.setState({
        [name]: event.target.value,
    });
};

handleDateChange = date => {
    this.setState({
        StartDate: date
    });
};

handleClick() {
    id += 1;
    this.setState({
        rows: [...this.state.rows, {id: id, Medication:this.state.Medication, Dose:this.state.Dose, Frequency:this.state.Frequency, Routh:this.state.Routh, StartDate:this.state.StartDate.toLocaleString(), NoOfDays:this.state.NoOfDays, Quantity: this.state.Quantity, Form: this.state.Form, Remark: this.state.Remark}],
        Medication: '',
        Dose:'',
        Frequency:'',
        Routh: '',
        StartDate: new Date(),
        NoOfDays:'',
        Quantity:'',
        Form:'',
        Remark:''
    });
    this.props.handleSetstate(this.state.rows);
};

componentDidMount() {
    // this.createData('Frozen yoghurt', 159, 6.0, 24, 4.0);
    const URL = '/MedicationOrders/GetMedication/0';
    this.props.fetchItems(URL);
};


render() {
  const { classes } = this.props;
    return (
        <Paper className={classes.root}>
        <Table className={classes.table}>
            <TableHead>
            <TableRow>
                <TableCell >Medication</TableCell>
                <TableCell align="right">Dose</TableCell>
                <TableCell align="right">Frequency</TableCell>
                <TableCell align="right">Routh</TableCell>
                <TableCell align="right">Start_date</TableCell>
                <TableCell align="right">No_of_Days</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Form</TableCell>
                <TableCell align="right">Remark</TableCell>
                <TableCell align="right"></TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
                <TableRow hover={true}>
                    <TableCell>
                        <Select
                            value={this.state.Medication}
                            onChange={this.handleChange('Medication')}
                            input={<Input name="medication" id="age-helper" />}
                            >
                            {
                                this.props.Items.map((subtype) =>
                                    <MenuItem value={subtype.Name}>{subtype.Name}</MenuItem>
                                )
                            }
                        </Select>
                    </TableCell>
                    <TableCell>
                        <TextField
                            id="standard-name"
                            label="Dose"
                            className={classes.textField}
                            value={this.state.Dose}
                            onChange={this.handleChange('Dose')}
                            margin="normal"
                            />
                    </TableCell>
                    <TableCell>
                        <Select
                            value={this.state.Frequency}
                            onChange={this.handleChange('Frequency')}
                            input={<Input name="Frequency" id="age-helper" />}
                            >
                            <MenuItem value={1}><em>Every 1hr</em></MenuItem>
                            <MenuItem value={2}>Every 2hr</MenuItem>
                            <MenuItem value={4}>Every 4hr</MenuItem>
                            <MenuItem value={6}>Every 6hr</MenuItem>
                            <MenuItem value={8}>Every 8hr</MenuItem>
                            <MenuItem value={12}>Every 12hr</MenuItem>
                            <MenuItem value={48}>Every 48hr</MenuItem>
                            <MenuItem value={'1c'}>Once Daily</MenuItem>
                            <MenuItem value={'prn'}>PRN</MenuItem>
                            <MenuItem value={'stat'}>Stat</MenuItem>
                        </Select>
                    </TableCell>
                    <TableCell>
                        <Select
                            value={this.state.Routh}
                            onChange = {this.handleChange('Routh')}
                            input={<Input name="Routh" id="age-helper" />}
                            >
                            <MenuItem value={'oral'}><em>Oral</em></MenuItem>
                            <MenuItem value={'IV'}>IV</MenuItem>
                            <MenuItem value={'IM'}>IM</MenuItem>
                            <MenuItem value={'SQ'}>SQ</MenuItem>
                            <MenuItem value={'Topical'}>Topical</MenuItem>
                            <MenuItem value={'Per Rectum'}>Per Rectum</MenuItem>
                            <MenuItem value={'Drops'}>Drops</MenuItem>
                            <MenuItem value={'Intransal'}>Intransal</MenuItem>
                            <MenuItem value={'Intra-aticual'}>Intra-aticual</MenuItem>
                            <MenuItem value={'Intraousseuo'}>Intraousseuo</MenuItem>
                            <MenuItem value={'Sublingual'}>Sublingual</MenuItem>
                        </Select>
                    </TableCell>
                    <TableCell>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                margin="normal"
                                label="Start Date"
                                value={this.state.StartDate}
                                onChange={this.handleDateChange}
                                />
                        </MuiPickersUtilsProvider>
                    </TableCell>
                    <TableCell>
                        <TextField
                            id="standard-name"
                            label="No of Days"
                            className={classes.textField}
                            value={this.state.NoOfDays}
                            onChange={this.handleChange('NoOfDays')}
                            margin="normal"
                            />
                    </TableCell>
                    <TableCell>
                        <TextField
                            id="standard-name"
                            label="Quantity"
                            className={classes.textField}
                            value={this.state.Quantity}
                            onChange={this.handleChange('Quantity')}
                            margin="normal"
                            />
                    </TableCell>
                    <TableCell>
                        <TextField
                            id="standard-name"
                            label="Form"
                            className={classes.textField}
                            value={this.state.Form}
                            onChange={this.handleChange('Form')}
                            margin="normal"
                            />
                    </TableCell>
                    <TableCell>
                        <TextField
                            id="standard-name"
                            label="Remark"
                            className={classes.textField}
                            value={this.state.Remark}
                            onChange={this.handleChange('Remark')}
                            margin="normal"
                            />
                    </TableCell>
                    <TableCell>
                        <Button variant="contained" color="primary" onClick={this.handleClick}> Save</Button>
                    </TableCell>
                </TableRow>
            {this.state.rows.map(row => (
                <TableRow key={row.id}>
                    <TableCell component="th" scope="row">{row.Medication}</TableCell>
                    <TableCell align="right">{row.Dose}</TableCell>
                    <TableCell align="right">{row.Frequency}</TableCell>
                    <TableCell align="right">{row.Routh}</TableCell>
                    <TableCell align="right">{row.StartDate}</TableCell>
                    <TableCell align="right">{row.NoOfDays}</TableCell>
                    <TableCell align="right">{row.Quantity}</TableCell>
                    <TableCell align="right">{row.Form}</TableCell>
                    <TableCell align="right">{row.Remark}</TableCell>
                    <TableCell align="right"></TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </Paper>
        );
    }
}

EditableTable.propTypes = {
  classes: PropTypes.object.isRequired,
  fetchItems: PropTypes.func.isRequired,

};

const mapStateToProps = (state) => ({
    Items: state.medicatioOrder.items,
    isLoading: state.medicatioOrder.isLoading,
    hasError: state.medicatioOrder.hasError,
    selectedPatient: state.assignments.selectedPatient
});

const mapDispatchToProps = dispatch => ({
    fetchItems: (url) => dispatch(fetchItems(url))
});

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(EditableTable);