/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import dashboardRoutes from "routes/dashboard.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import image from "assets/img/sidebar-4.jpg";
import logo from "assets/img/reactlogo.png";
import HistoryAndPhysical from '../../components/PatientNote/hpNote';
import ProgressNote from '../../components/PatientNote/progressNote';
import OrderSheet from '../../components/Orders/orderSheet';
import MedicationOrder from '../../components/Orders/medicationOrder';
import LabOrder from '../../components/Orders/labOrder';
import RadOrder from '../../components/Orders/RadOrder';
import ProcedureOrder from '../../components/Orders/procedureOrder';
import ConseltationOrder from '../../components/Orders/consultationOrder';
import InvestigationOrder from '../../components/Orders/otherInvestigationOrder';
import NewXrayOrder from '../../components/Orders/newXRayOrder';
import NewUltrasound from '../../components/Orders/newUltarsoundOrder';
import NewECG from '../../components/Orders/newECGOrder';
import NewEcho from '../../components/Orders/newEchoOrder';
import NewHPOrder from '../../components/PatientNote/newHPNote';
import NewProgressNote from '../../components/PatientNote/newProgressNote';
import RefferalNote from '../../components/PatientNote/refferalNote';
import ConsultationNote from '../../components/PatientNote/consultationNote';
import ProcedureNote from '../../components/PatientNote/procedureNote';
import DeathNote from '../../components/PatientNote/deathNote';
import IncidentNote from '../../components/PatientNote/incidentNote';
import RecruitmentMedicalExam from '../../components/PatientNote/recruitmentMedicalExam';
import TattooNote from '../../components/PatientNote/operationNote';
import OperationNote from '../../components/PatientNote/operationNote';
import DHPNote from '../../components/PatientNote/dhpNote';
import newDHPNote from '../../components/PatientNote/newDHPNote';

const switchRoutes = (
  <Switch>
    <Route path="/historyAndPhysical" component={HistoryAndPhysical}/>
    <Route path="/progressNote" component={ProgressNote}/>
    <Route path="/OrderSheet" component={OrderSheet}/>
    <Route path="/MedicationOrder" component={MedicationOrder}/>
    <Route path="/LabOrder" component={LabOrder}/>
    <Route path="/RadOrder" component={RadOrder}/>
    <Route path="/ProcedureOrder" component={ProcedureOrder}/>
    <Route path="/ConseltationOrder" component={ConseltationOrder}/>
    <Route path="/InvestigationOrder" component={InvestigationOrder}/>
    <Route path="/NewXrayOrder" component={NewXrayOrder}/>
    <Route path="/UltarSound" component={NewXrayOrder}/>
    <Route path="/NewUltrasound" component={NewUltrasound}/>
    <Route path="/NewECG" component={NewECG}/>
    <Route path="/NewEcho" component={NewEcho}/>
    <Route path="/NewHPOrder" component={NewHPOrder}/>
    <Route path="/NewProgressNote" component={NewProgressNote}/>
    <Route path="/RefferalNote" component={RefferalNote}/>
    <Route path="/ConsultationNote" component={ConsultationNote}/>
    <Route path="/ProcedureNote" component={ProcedureNote}/>
    <Route path="/DeathNote" component={DeathNote}/>
    <Route path="/IncidentNote" component={IncidentNote}/>
    <Route path='/RecruitmentMedicalExam' component={RecruitmentMedicalExam}/>
    <Route path='/TattooNote' component={TattooNote} />
    <Route path='/OperationNote' component={OperationNote}/>
    <Route path='/DHPNote' component={DHPNote}/>
    <Route path='/newDHPNote' component={newDHPNote}/>
    {dashboardRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      pnmenuopen: false,
      omenuopen: false
    };
    this.resizeFunction = this.resizeFunction.bind(this);
    this.pnhandleClick = this.pnhandleClick.bind(this);
    this.ohandleClick = this.ohandleClick.bind(this);
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/maps";
  }
  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }
  pnhandleClick = () => {
    this.setState({
      pnmenuopen: !this.state.pnmenuopen,
    })
  }
  ohandleClick = () => {
    this.setState({
      omenuopen: !this.state.omenuopen
    })
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={dashboardRoutes}
          logoText={"Prime Care"}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          {...rest}
          pnmenuopen={this.state.pnmenuopen}
          omenuopen={this.state.omenuopen}
          pnhandleClick = { this.pnhandleClick}
          ohandleClick = { this.ohandleClick}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <Header
            routes={dashboardRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : (
            <div className={classes.map}>{switchRoutes}</div>
          )}
          {this.getRoute() ? <Footer /> : null}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(App);
