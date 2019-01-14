import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'redux';
import { signInAction } from '../../redux/actions/signInAction';
import { connect } from 'react-redux';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});



class SignIn extends Component {
  constructor(props) {
    super(props);
  }
  submit = (values) => {
    this.props.signInAction(values, this.props.history);
  }
  errorMessage() {
    if (this.props.errorMessage) {
      return (
        <div className="info-red">
          {this.props.errorMessage}
        </div>
      );
    }
  }
render(){
  const renderTextField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
  }) => (
    <Input
      hintText={label}
      floatingLabelText={label}
      errorText={touched && error}
      {...input}
      {...custom}
    />
  )
  const { handleSubmit } = this.props;
  const { classes } = this.props;
  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={ handleSubmit(this.submit) }>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">UserName</InputLabel>
            <Field id="email" type="text" component={renderTextField} name="username" autoComplete="email" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Field name="password" component={renderTextField} type="password" id="password" autoComplete="current-password" />
          </FormControl>
          <FormControlLabel
            control={<Checkbox checked value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign in
          </Button>
        </form>
        {this.errorMessage()}
      </Paper>
    </main>
  );
}
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default compose(withStyles(styles),connect(mapStateToProps, {signInAction}),reduxForm({
  form: 'signin'
}))(SignIn);