import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Editor, EditorState, RichUtils} from 'draft-js';
import { compose } from 'redux';
import 'draft-js/dist/Draft.css';
import Typography from '@material-ui/core/Typography';
import { fetchECGSubType } from '../../redux/actions/radOrderAction';
import propTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
    button: {
        margin: theme.spacing.unit,
        textAlign: 'right',
      },
    input: {
        display: 'none'
      },
  });

class newECGOrder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clinicalFinding:'',
            editorState: EditorState.createEmpty(),
            subType:[]
        };
        this.onChange = (editorState) => this.setState({editorState});
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
      }
      handleChange = (name) => (event) => {
        this.setState({[name]: event.target.value});
      }
      handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
          this.onChange(newState);
          return 'handled';
        }
        return 'not-handled';
      }
    componentWillMount(){
        const URL = '/RadOrders/GetECGSubType/0';
        this.props.fetchECGSubType(URL);
    }
    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.root} elevation={1}>
                <Typography variant="h5" component="h3">
                    New Ultrasound Order
                </Typography>
                <br/>
                <form className={classes.container} noValidate autoComplete="off">
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.onChange}
                        handleKeyCommand={this.handleKeyCommand}
                        placeholder='Clinical findings ...'
                        />
                        <br/>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">Tests</FormLabel>
                        {this.props.isLoading?<CircularProgress className={classes.progress} />:""}
                        <FormGroup row>
                            {this.props.ecgSubType.map((subtype)=>
                                <FormControlLabel
                                    control={<Checkbox //checked={gilad}
                                    onChange={this.handleChange('subType')}
                                    value={subtype.Name} />}
                                    label={subtype.Name}
                                />
                            )
                        }
                        </FormGroup>
                    </FormControl>
                    <Button variant="contained" color="primary" className={classes.button}>
                        Submit
                    </Button>
                </form>
            </Paper>
        );
    }
}

newECGOrder.propTypes = {
    fetchECGSubType: propTypes.func.isRequired,
    ecgSubType: propTypes.array.isRequired,
    isLoading: propTypes.bool.isRequired,
    hasError: propTypes.bool.isRequired
  }
  
  const mapStateToProps = (state) => ({
    ecgSubType: state.radOrder.ecgSubType,
    isLoading: state.radOrder.isLoading,
    hasError: state.radOrder.hasError,
    selectedPatient: state.assignments.selectedPatient
  });

  const mapDispatchToProps = dispatch => ({
    fetchECGSubType: (url) => dispatch(fetchECGSubType(url))
  });

export default compose(withStyles(styles), connect(mapStateToProps,mapDispatchToProps))(newECGOrder);