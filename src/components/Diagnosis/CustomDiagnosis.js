import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import Autosuggest from 'react-autosuggest';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import match from 'autosuggest-highlight/umd/match';
import parse from 'autosuggest-highlight/umd/parse';
import deburr from 'lodash/deburr';
import { connect } from 'react-redux';
import { compose } from 'redux';
import propTypes from 'prop-types';
import { fetchDiagnosisType } from '../../redux/actions/diagnosisAction';

const styles = theme => ({
    root: {
        height: 250,
        flexGrow: 1,
    },
    container: {
        position: 'relative',
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
});

const suggestions = [];

function renderInputComponent(inputProps) {
    const { classes, inputRef = () => { }, ref, ...other } = inputProps;

    return (
        <TextField
            fullWidth
            InputProps={{
                inputRef: node => {
                    ref(node);
                    inputRef(node);
                },
                classes: {
                    input: classes.input,
                },
            }}
            {...other}
        />
    );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
    const matches = match(suggestion.label, query);
    const parts = parse(suggestion.label, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map((part, index) =>
                    part.highlight ? (
                        <span key={String(index)} style={{ fontWeight: 500 }}>
                            {part.text}
                        </span>
                    ) : (
                            <strong key={String(index)} style={{ fontWeight: 300 }}>
                                {part.text}
                            </strong>
                        ),
                )}
            </div>
        </MenuItem>
    );
}

function getSuggestions(value) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
        ? []
        : suggestions.filter(suggestion => {
            const keep =
                count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

            if (keep) {
                count += 1;
            }

            return keep;
        });
}

function getSuggestionValue(suggestion) {
    return suggestion.label;
}

class CustomDiagnosis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            single: '',
            popper: '',
            suggestions: [],
            visit: 'New'
        }
    }
    handleSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value),
        });
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };
    handleSelectChange = name => event =>{
        this.setState({
            [name]: event.target.value
        });
    }
    handleChange = name => (event, { newValue }) => {
        this.setState({
            [name]: newValue,
        });
    };
    cleanAutosuggest = () => {
        this.setState({
            single: '',
            visit: 'New'
        });
    }
    filterShortDescription(){
        var arr = new Array();
        this.props.diagnosisTypes.map((diagnosisrow) => {
            arr.push({ 
                label: diagnosisrow.ShortDescription,
                id: diagnosisrow.Id
             })
        });
        return arr;
    }
    componentDidMount = () => {
        const radOrdersURL = '/Diagnosis/';
        this.props.fetchDiagnosisType(radOrdersURL);
    }
    
    render() {
        const { classes, tableHead, diagnosis, tableHeaderColor } = this.props;
        const autosuggestProps = {
            renderInputComponent,
            suggestions: this.filterShortDescription(),
            onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
            getSuggestionValue,
            renderSuggestion,
        };
        return (
            <div className={classes.tableResponsive}>
                <FormGroup row>
                    <FormControl className={classes.formControl}>
                        <Autosuggest
                            {...autosuggestProps}
                            inputProps={{
                                classes,
                                placeholder: 'Search Diagnosis',
                                value: this.state.single,
                                onChange: this.handleChange('single'),
                            }}
                            theme={{
                                container: classes.container,
                                suggestionsContainerOpen: classes.suggestionsContainerOpen,
                                suggestionsList: classes.suggestionsList,
                                suggestion: classes.suggestion,
                            }}
                            renderSuggestionsContainer={options => (
                                <Paper {...options.containerProps} square>
                                    {options.children}
                                </Paper>
                            )}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <Button
                            style={{
                                marginLeft: '5px',
                                marginRight: '5px'
                            }}
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={() => { this.props.addDiagnosis(this.state.single, this.state.visit); this.cleanAutosuggest();}}
                        >
                        Add
                        </Button>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        {/* <InputLabel htmlFor="age-native-simple">Visit</InputLabel> */}
                        <Select
                            native
                            value={this.state.visit}
                            onChange={this.handleSelectChange('visit')}
                            inputProps={{
                                name: 'age',
                                id: 'age-native-simple',
                            }}
                        >
                            <option value={"New"}>New</option>
                            <option value={"Revisit"}>Revisit</option>
                        </Select>
                    </FormControl>
                </FormGroup>
                <Table className={classes.table}>
                    {tableHead !== undefined ? (
                        <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
                            <TableRow>
                                {tableHead.map((prop, key) => {
                                    return (
                                        <TableCell
                                            className={classes.tableCell + " " + classes.tableHeadCell}
                                            key={key}
                                        >
                                            {prop}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        </TableHead>
                    ) : null}
                    <TableBody>
                        {diagnosis.map((prop, key) => {
                            return (
                                <TableRow key={key} style={{ cursor: 'pointer' }}>
                                    {prop.map((prop0, key) => {
                                        return (
                                            <TableCell onClick={() => this.props.handleOnRowClick(prop[0])} className={classes.tableCell} key={key}>
                                                {prop0}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

CustomDiagnosis.defaultProps = {
    tableHeaderColor: "gray"
};

CustomDiagnosis.propTypes = {
    fetchDiagnosisType: propTypes.func.isRequired,
    diagnosisTypes: propTypes.array.isRequired,
    isLoading: propTypes.bool.isRequired,
    hasError: propTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
    tableHeaderColor: PropTypes.oneOf([
        "warning",
        "primary",
        "danger",
        "success",
        "info",
        "rose",
        "gray"
    ]),
    tableHead: PropTypes.arrayOf(PropTypes.string),
    tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

const mapStateToProps = (state) => ({
    diagnosisTypes: state.diagnosisOrder.diagnosisTypes,
    isLoading: state.diagnosisOrder.isLoading,
    hasError: state.diagnosisOrder.hasError
});

const mapDispatchToProps = dispatch => ({
    fetchDiagnosisType: (url) => dispatch(fetchDiagnosisType(url))
});

export default compose(withStyles(styles, tableStyle), connect(mapStateToProps, mapDispatchToProps))(CustomDiagnosis);
