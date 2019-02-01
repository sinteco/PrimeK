import React, { Component } from 'react';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from 'react-redux';
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/CustomTableWithPopUp.js";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { fetchVitalSigen } from '../../redux/actions/vitalsigneAction';
import { compose } from 'redux';
import propTypes from 'prop-types';
import Moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { saveVitalSigen } from '../../redux/actions/vitalsigneAction';
import { fetchVitalSigenDetail } from '../../redux/actions/vitalsigneAction';
import qs from 'qs';
import Typography from '@material-ui/core/Typography';

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
    },
    dialog: {
        width: '80%',
        maxHeight: 435,
    },
  };
export class vitalSigns extends Component {
  constructor(props) {
        super(props);
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.detaildialoguClose = this.detaildialoguClose.bind(this);
    }
    state = {
      open: false,
      detaildialog: false,
      temperature: '',
      bps: '',
      bpd: '',
      pulserate: '',
      respiratoryrate: '',
      spo2onra: '',
      spo22lmm: '',
      height: '',
      weight: '',
      headcircumference: '',
      waistcircumference: '',
      rbs: '',
      fbs: '',
      muac: '',
      smoking: '',
      input: '',
      putput: '',
      balance: '',
      wtage: '',
      wtht: '',
      bmi: '',
      bmiage: '',
      muacage: '',
      hcage: '',
      bpageht: '',
      note: ''

    };
    handleOpen = () => {
      this.setState({ open: true });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };
    handleSave = () => {
      const id = this.props.selectedPatient == 0 ? 0 : this.props.selectedPatient.Id;
      const vitalSign = {
        Temprature: this.state.temperature,
        BPS: this.state.bps,
        BPD: this.state.bpd,
        PulseRate: this.state.pulserate,
        RespiratoryRate: this.state.respiratoryrate,
        SPO2ONRA: this.state.spo2onra,
        SPO22LMM: this.state.spo22lmm,
        Height: this.state.height,
        Weight: this.state.weight,
        HeadCircumference: this.state.headcircumference,
        WaistCircumference: this.state.waistcircumference,
        RBS: this.state.rbs,
        FBS: this.state.fbs,
        MUAC: this.state.muac,
        Smoking: this.state.smoking,
        Input: this.state.input,
        Output: this.state.Output,
        Balance: this.state.balance,
        WtAge: this.state.wtage,
        WtHt: this.state.wtht,
        BMI: this.state.bmi,
        BMIAge: this.state.bmiage,
        MUACAge: this.state.muacage,
        HCage: this.state.hcage,
        BPAgeHt: this.state.bpageht,
        Note: this.state.note,
        PatientId: id
      }
      if(id===0){
        alert("patient is not selected");
        return
      }
      const savevitalsignURL = '/VitalSigns';
      this.setState({ open: false });
      this.props.saveVitalSigen(savevitalsignURL, qs.stringify(vitalSign));
    };
    handleClickOpen = () => {
      this.setState({ open: true });
    }
    handleChange = (name) => (event) => {
      this.setState({[name]: event.target.value});
    }
    returnarrays(){
        var a = new Array();
        this.props.vitalSigns.map((vitalSign)=>{
            a.push([[vitalSign.Id],[Moment(vitalSign.DateTime).format('d MMM')],[vitalSign.Temperature],[vitalSign.BPS+"/"+vitalSign.BPD],[vitalSign.PulseRate],[vitalSign.RespiratoryRate],[vitalSign.SPO2OnRA],[vitalSign.SPO22LMM],[vitalSign.Height],[vitalSign.Weight],[vitalSign.SPO2OnRA],[vitalSign.Input],[vitalSign.Output],[vitalSign.SPO2OnRA],[vitalSign.RBS],[vitalSign.FBS]])
        });
        return a;    
    }
    handleOnRowClick = (id) => {
      const vitalSigneURL = '/VitalSigns/GetVitalSignDetail/' + id;
      this.props.fetchVitalSigenDetail(vitalSigneURL);
      this.setState({
        detaildialog: true
      })
    }
    detaildialoguClose(){
      this.setState({
        detaildialog: false
      })
    }

  componentDidMount() {
    const id = this.props.selectedPatient == 0 ? 0 : this.props.selectedPatient.Id;
    const vitalSigneURL = '/VitalSigns/GetVitalSignsOfPatient/' + id;
    this.props.fetchVitalSigen(vitalSigneURL);
  }

  render() {
    const { classes } = this.props;
    const { fullScreen } = this.props;
    return (
        <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
                <Grid container className={classes.grid} justify="space-around">
                    <Grid xs={12} sm={12} md={12}>
                        <Button onClick={this.handleClickOpen} variant="contained" color="primary" className={classes.button}>
                            Create New
                        </Button>
                        <Dialog
                          fullScreen={fullScreen}
                          open={this.state.open}
                          onClose={this.handleClose}
                          aria-labelledby="responsive-dialog-title"
                        >
                          <DialogTitle id="responsive-dialog-title">{"New Vital Sign"}</DialogTitle>
                          <DialogContent>
                            <form className={classes.container} noValidate autoComplete="off">
                              <FormControl component="fieldset" className={classes.formControl}>
                              <FormGroup row>
                                <TextField
                                  autoFocus
                                  id="standard-name"
                                  label="Temprature"
                                  className={classes.textField}
                                  value={this.state.temperature}
                                  onChange={this.handleChange('temperature')}
                                  margin="normal"
                                />
                                <FormGroup row>
                                  <TextField
                                    id="standard-name"
                                    label="BPS"
                                    className={classes.textField}
                                    value={this.state.bps}
                                    onChange={this.handleChange('bps')}
                                    margin="normal"
                                  />
                                  <TextField
                                    id="standard-name"
                                    label="BPD"
                                    className={classes.textField}
                                    value={this.state.bpd}
                                    onChange={this.handleChange('bpd')}
                                    margin="normal"
                                  />
                                </FormGroup>
                                <TextField
                                  id="standard-name"
                                  label="Pulse Rate"
                                  className={classes.textField}
                                  value={this.state.pulserate}
                                  onChange={this.handleChange('pulserate')}
                                  margin="normal"
                                />
                                <TextField
                                  id="standard-name"
                                  label="Respiratory Rate"
                                  className={classes.textField}
                                  value={this.state.respiratoryrate}
                                  onChange={this.handleChange('respiratoryrate')}
                                  margin="normal"
                                />
                                <TextField
                                  id="standard-name"
                                  label="SpO2"
                                  className={classes.textField}
                                  value={this.state.spo2onra}
                                  onChange={this.handleChange('spo2onra')}
                                  margin="normal"
                                />
                                <TextField
                                  id="standard-name"
                                  label="SpO2"
                                  className={classes.textField}
                                  value={this.state.spo22lmm}
                                  onChange={this.handleChange('spo22lmm')}
                                  margin="normal"
                                />
                                <TextField
                                  id="standard-name"
                                  label="Height"
                                  className={classes.textField}
                                  value={this.state.height}
                                  onChange={this.handleChange('height')}
                                  margin="normal"
                                />
                                <TextField
                                  id="standard-name"
                                  label="Weight"
                                  className={classes.textField}
                                  value={this.state.weight}
                                  onChange={this.handleChange('weight')}
                                  margin="normal"
                                />
                                <TextField
                                  id="standard-name"
                                  label="Head Circumference"
                                  className={classes.textField}
                                  value={this.state.headcircumference}
                                  onChange={this.handleChange('headcircumference')}
                                  margin="normal"
                                />
                                <TextField
                                  id="standard-name"
                                  label="Waist Circumference"
                                  className={classes.textField}
                                  value={this.state.waistcircumference}
                                  onChange={this.handleChange('waistcircumference')}
                                  margin="normal"
                                />
                                <TextField
                                  id="standard-name"
                                  label="RBS"
                                  className={classes.textField}
                                  value={this.state.rbs}
                                  onChange={this.handleChange('rbs')}
                                  margin="normal"
                                />
                                <TextField
                                  id="standard-name"
                                  label="FBS"
                                  className={classes.textField}
                                  value={this.state.fbs}
                                  onChange={this.handleChange('fbs')}
                                  margin="normal"
                                />
                                <TextField
                                  id="standard-name"
                                  label="MUAC"
                                  className={classes.textField}
                                  value={this.state.muac}
                                  onChange={this.handleChange('muac')}
                                  margin="normal"
                                />
                                <RadioGroup
                                  row
                                  aria-label="Smoking"
                                  name="smoking"
                                  className={classes.group}
                                  value={this.state.smoking}
                                  onChange={this.handleChange('smoking')}
                                  >
                                  <FormControlLabel value="1" control={<Radio />} label="Smoking" />
                                  <FormControlLabel value="0" control={<Radio />} label="Non Smoking" />
                                </RadioGroup>
                                <TextField
                                  id="standard-name"
                                  label="Input"
                                  className={classes.textField}
                                  value={this.state.input}
                                  onChange={this.handleChange('input')}
                                  margin="normal"
                                />
                                <TextField
                                  id="standard-name"
                                  label="Output"
                                  className={classes.textField}
                                  value={this.state.Output}
                                  onChange={this.handleChange('Output')}
                                  margin="normal"
                                />
                                <TextField
                                  id="standard-name"
                                  label="Balance"
                                  className={classes.textField}
                                  value={this.state.balance}
                                  onChange={this.handleChange('balance')}
                                  margin="normal"
                                />
                                <TextField
                                  id="standard-name"
                                  label="WT/Age"
                                  className={classes.textField}
                                  value={this.state.wtage}
                                  onChange={this.handleChange('wtage')}
                                  margin="normal"
                                />
                                <TextField
                                  id="standard-name"
                                  label="WT/Ht"
                                  className={classes.textField}
                                  value={this.state.wtht}
                                  onChange={this.handleChange('wtht')}
                                  margin="normal"
                                />
                                <TextField
                                  id="standard-name"
                                  label="BIM"
                                  className={classes.textField}
                                  value={this.state.bmi}
                                  onChange={this.handleChange('bmi')}
                                  margin="normal"
                                />
                                <TextField
                                  id="standard-name"
                                  label="BIM/Age"
                                  className={classes.textField}
                                  value={this.state.bmiage}
                                  onChange={this.handleChange('bmiage')}
                                  margin="normal"
                                />
                                <TextField
                                  id="standard-name"
                                  label="MUAC/Age"
                                  className={classes.textField}
                                  value={this.state.muacage}
                                  onChange={this.handleChange('muacage')}
                                  margin="normal"
                                />
                                <TextField
                                  id="standard-name"
                                  label="HC/Age"
                                  className={classes.textField}
                                  value={this.state.hcage}
                                  onChange={this.handleChange('hcage')}
                                  margin="normal"
                                />
                                <TextField
                                  id="standard-name"
                                  label="BP for Age and Ht"
                                  className={classes.textField}
                                  value={this.state.bpageht}
                                  onChange={this.handleChange("bpageht")}
                                  margin="normal"
                                />
                                </FormGroup>
                                <TextField
                                  id="standard-multiline-flexible"
                                  label="Note"
                                  multiline
                                  rowsMax="4"
                                  value={this.state.note}
                                  onChange={this.handleChange('note')}
                                  className={classes.textField}
                                  margin="normal"
                                />
                              </FormControl>
                            </form>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={this.handleClose} color="default">
                              Cancel
                            </Button>
                            <Button onClick={this.handleSave} color="primary">
                              Save
                            </Button>
                          </DialogActions>
                        </Dialog>
                    </Grid>
                </Grid>
            </CardHeader>
            <CardBody>
            {this.props.isLoading?<CircularProgress className={classes.progress} />:""}
              <Table
                tableHeaderColor="primary"
                tableHead={["Id","Date Time", "Temprature", "BP", "PR", "RR", "SPO2", "SPO2", "Height", "Wight", "BMI", "Input", "Output", "Balance", "RBS", "FBS"]}
                tableData={this.returnarrays()}
                handleOnRowClick={this.handleOnRowClick}
              />
              <Dialog
                fullScreen={fullScreen}
                open={this.state.detaildialog}
                onClose={this.handleClose}
                aria-labelledby="responsive-dialog-title"
                classes={{ paper: classes.dialog }}
              >
                <DialogTitle id="responsive-dialog-title">{"Vital Sign Detail"}</DialogTitle>
                <DialogContent>
                <table>
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                  <tr>
                    <td>
                      <Typography variant="overline" gutterBottom>
                        <b>Temperature:</b> {this.props.vitalsigndetail.Temperature}
                      </Typography>
                    </td>
                    <td>
                      <Typography variant="overline" gutterBottom>
                        <b>Respiratory Rate:</b> {this.props.vitalsigndetail.RespiratoryRate}
                      </Typography>
                    </td>
                    <td>
                      <Typography variant="overline" gutterBottom>
                        <b>SPO2OnRA:</b> {this.props.vitalsigndetail.SPO2OnRA}
                      </Typography>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <Typography variant="overline" gutterBottom>
                        <b>SPO22LMM:</b> {this.props.vitalsigndetail.SPO22LMM}
                      </Typography>
                    </td>
                    <td>
                        <Typography variant="overline" gutterBottom>
                          <b>SaO2:</b> {this.props.vitalsigndetail.SaO2}
                        </Typography>
                      </td>
                      <td>
                        <Typography variant="overline" gutterBottom>
                          <b>Height:</b> {this.props.vitalsigndetail.Height}
                        </Typography>
                      </td>
                  </tr>
                    <tr>
                      <td>
                        <Typography variant="overline" gutterBottom>
                          <b>Weight:</b> {this.props.vitalsigndetail.Weight}
                        </Typography>
                      </td>
                      <td>
                        <Typography variant="overline" gutterBottom>
                          <b>Pulse Rate:</b> {this.props.vitalsigndetail.PulseRate}
                        </Typography>
                      </td>
                      <td>
                        <Typography variant="overline" gutterBottom>
                          <b>BP(S/D):</b> {this.props.vitalsigndetail.BPS} / {this.props.vitalsigndetail.BPD}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Typography variant="overline" gutterBottom>
                          <b>RBS:</b> {this.props.vitalsigndetail.RBS}
                        </Typography>
                      </td>
                      <td>
                        <Typography variant="overline" gutterBottom>
                          <b>FBS:</b> {this.props.vitalsigndetail.FBS}
                        </Typography>
                      </td>
                      <td>
                        <Typography variant="overline" gutterBottom>
                          <b>POXInRoomAir:</b> {this.props.vitalsigndetail.POXInRoomAir}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Typography variant="overline" gutterBottom>
                          <b>POXPerLiter:</b> {this.props.vitalsigndetail.POXPerLiter}
                        </Typography>
                      </td>
                      <td>
                        <Typography variant="overline" gutterBottom>
                          <b>MUAC:</b> {this.props.vitalsigndetail.MUAC}
                        </Typography>
                      </td>
                      <td>
                        <Typography variant="overline" gutterBottom>
                          <b>Head Circumference:</b> {this.props.vitalsigndetail.HeadCircumference}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Typography variant="overline" gutterBottom>
                          <b>Waist Circumference:</b> {this.props.vitalsigndetail.WaistCircumference}
                        </Typography>
                      </td>
                      <td>
                        <Typography variant="overline" gutterBottom>
                          <b>Smoking:</b> {this.props.vitalsigndetail.Smoking}
                        </Typography>
                      </td>
                      <td>
                        <Typography variant="overline" gutterBottom>
                          <b>Note:</b> {this.props.vitalsigndetail.Note}
                        </Typography>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Typography variant="overline" gutterBottom>
                          <b>Input:</b> {this.props.vitalsigndetail.Input}
                        </Typography>
                      </td>
                      <td>
                        <Typography variant="overline" gutterBottom>
                          <b>Output:</b> {this.props.vitalsigndetail.Output}
                        </Typography>
                      </td>
                      <td>
                        <Typography variant="overline" gutterBottom>
                          <b>DateTime:</b> {Moment(this.props.vitalsigndetail.DateTime).format('d MMM')}
                        </Typography>
                      </td>
                    </tr>
                </table>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.detaildialoguClose} color="primary" autoFocus>
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    )
  }
}
vitalSigns.propTypes = {
  fetchVitalSigen: propTypes.func.isRequired,
  saveVitalSigen: propTypes.func.isRequired,
  fetchVitalSigenDetail: propTypes.func.isRequired,
  vitalSigns: propTypes.array.isRequired,
  isLoading: propTypes.bool.isRequired,
  hasError: propTypes.bool.isRequired,
  confirmStatus: propTypes.bool.isRequired
}
const mapStateToProps = (state) => ({
  vitalsigndetail: state.vitalSign.vitalsigndetail,
  vitalSigns: state.vitalSign.vitalsigns,
  isLoading: state.vitalSign.isLoading,
  hasError: state.vitalSign.hasError,
  totalCount: state.vitalSign.totalCount,
  selectedPatient: state.assignments.selectedPatient,
  confirmStatus: state.vitalSign.confirmStatus
});
const mapDispatchToProps = dispatch => ({
  fetchVitalSigen: (url) => dispatch(fetchVitalSigen(url)),
  saveVitalSigen: (url,data) => dispatch(saveVitalSigen(url,data)),
  fetchVitalSigenDetail: (url) => dispatch(fetchVitalSigenDetail(url))
});

export default compose(withStyles(styles),withMobileDialog(),connect(mapStateToProps,mapDispatchToProps))(vitalSigns)
