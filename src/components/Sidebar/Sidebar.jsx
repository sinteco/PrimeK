import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink, Link } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
// core components
import HeaderLinks from "components/Header/HeaderLinks.jsx";

import sidebarStyle from "assets/jss/material-dashboard-react/components/sidebarStyle.jsx";
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import StarBorder from '@material-ui/icons/StarBorder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import InboxIcon from '@material-ui/icons/MoveToInbox';

const Sidebar = ({ pnhandleClick, ohandleClick, ...props}) => {
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return props.location.pathname.indexOf(routeName) > -1 ? true : false;
  }
  const { classes, color, logo, image, logoText, routes, pnmenuopen, omenuopen } = props;
  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        if (prop.redirect) return null;
        var activePro = " ";
        var listItemClasses;
        if (prop.path === "/upgrade-to-pro") {
          activePro = classes.activePro + " ";
          listItemClasses = classNames({
            [" " + classes[color]]: true
          });
        } else {
          listItemClasses = classNames({
            [" " + classes[color]]: activeRoute(prop.path)
          });
        }
        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]: activeRoute(prop.path)
        });
        return (
          <NavLink
            to={prop.path}
            className={activePro + classes.item}
            activeClassName="active"
            key={key}
          >{(prop.omenu!=null)?
            <List>
              <ListItem className={whiteFontClasses} button onClick={ohandleClick}>
                <ListItemIcon className={classes.itemIcon}>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText
                 disableTypography
                 className={classes.itemText + whiteFontClasses}
                 inset
                 primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>Orders</Typography>} />
                {omenuopen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={omenuopen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button className={classes.nested} component={Link} to="/SickLeave">
                    <ListItemIcon className={classes.itemIcon}>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText
                     disableTypography
                     className={classes.itemText + whiteFontClasses}
                     inset
                     primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>Sick Leave</Typography>} />
                  </ListItem>
                  <ListItem button className={classes.nested} component={Link} to="/OrderSheet">
                    <ListItemIcon className={classes.itemIcon}>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText
                     disableTypography
                     className={classes.itemText + whiteFontClasses}
                     inset
                     primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>Order Seet</Typography>} />
                  </ListItem>
                  <ListItem button className={classes.nested} component={Link} to="/MedicationOrder">
                    <ListItemIcon className={classes.itemIcon}>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText
                     disableTypography
                     className={classes.itemText + whiteFontClasses}
                     inset
                     primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>Medication Order</Typography>} />
                  </ListItem>
                  <ListItem button className={classes.nested} component={Link} to="/LabOrder">
                    <ListItemIcon className={classes.itemIcon}>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText
                     disableTypography
                     className={classes.itemText + whiteFontClasses}
                     inset
                     primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>Lab Order</Typography>} />
                  </ListItem>
                  <ListItem button className={classes.nested} component={Link} to="/RadOrder">
                    <ListItemIcon className={classes.itemIcon}>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText
                     disableTypography
                     className={classes.itemText + whiteFontClasses}
                     inset
                     primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>Imaging Studies</Typography>} />
                  </ListItem>
                  <ListItem button className={classes.nested} component={Link} to="/ConseltationOrder">
                    <ListItemIcon className={classes.itemIcon}>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText
                     disableTypography
                     className={classes.itemText + whiteFontClasses}
                     inset
                     primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>Conseltation Order</Typography>} />
                  </ListItem>
                  <ListItem button className={classes.nested} component={Link} to="/ProcedureOrder">
                    <ListItemIcon className={classes.itemIcon}>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText
                     disableTypography
                     className={classes.itemText + whiteFontClasses}
                     inset
                     primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>Procedure Order</Typography>} />
                  </ListItem>
                  <ListItem button className={classes.nested} component={Link} to="/InvestigationOrder">
                    <ListItemIcon className={classes.itemIcon}>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText
                     disableTypography
                     className={classes.itemText + whiteFontClasses}
                     inset
                     primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>Other Investigation Order</Typography>} />
                  </ListItem>
                </List>
              </Collapse>
            </List>
          : (prop.pnmenu!=null)?
            <List>
              <ListItem className={whiteFontClasses} button onClick={pnhandleClick}>
                <ListItemIcon className={classes.itemIcon}>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText
                 disableTypography
                 className={classes.itemText + whiteFontClasses}
                 inset
                 primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>Patient Note</Typography>} />
                {pnmenuopen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={pnmenuopen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                      <ListItem button className={classes.nested} component={Link} to="/DHPNote">
                        <ListItemIcon className={classes.itemIcon}>
                          <StarBorder />
                        </ListItemIcon>
                        <ListItemText
                          disableTypography
                          className={classes.itemText + whiteFontClasses}
                          inset
                          primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>Diabetis History And Physical</Typography>} />
                      </ListItem>
                  <ListItem button className={classes.nested} component={Link} to="/historyAndPhysical">
                    <ListItemIcon className={classes.itemIcon}>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText
                     disableTypography
                     className={classes.itemText + whiteFontClasses}
                     inset
                     primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>History And Physical</Typography>} />
                  </ListItem>
                  <ListItem button className={classes.nested} component={Link} to="/progressNote">
                    <ListItemIcon className={classes.itemIcon}>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText
                     disableTypography
                     className={classes.itemText + whiteFontClasses}
                     inset
                     primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>Progress Note</Typography>} />
                  </ListItem>
                  <ListItem button className={classes.nested} component={Link} to="/ConsultationNote">
                    <ListItemIcon className={classes.itemIcon}>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText
                     disableTypography
                     className={classes.itemText + whiteFontClasses}
                     inset
                     primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>Consultation Note</Typography>} />
                  </ListItem>
                  <ListItem button className={classes.nested} component={Link} to="/ProcedureNote">
                    <ListItemIcon className={classes.itemIcon}>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText
                     disableTypography
                     className={classes.itemText + whiteFontClasses}
                     inset
                     primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>Procedure Note</Typography>} />
                  </ListItem>
                  <ListItem button className={classes.nested} component={Link} to="/DeathNote">
                    <ListItemIcon className={classes.itemIcon}>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText
                     disableTypography
                     className={classes.itemText + whiteFontClasses}
                     inset
                     primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>Death Note</Typography>} />
                  </ListItem>
                  <ListItem button className={classes.nested} component={Link} to="/IncidentNote">
                    <ListItemIcon className={classes.itemIcon}>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText
                     disableTypography
                     className={classes.itemText + whiteFontClasses}
                     inset
                     primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>Incident Note</Typography>} />
                  </ListItem>
                  <ListItem button className={classes.nested} component={Link} to="/SickLeave">
                    <ListItemIcon className={classes.itemIcon}>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText
                     disableTypography
                     className={classes.itemText + whiteFontClasses}
                     inset
                     primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>Medical Certeficate</Typography>} />
                  </ListItem>
                  <ListItem button className={classes.nested} component={Link} to="/RefferalNote">
                    <ListItemIcon className={classes.itemIcon}>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText
                     disableTypography
                     className={classes.itemText + whiteFontClasses}
                     inset
                     primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>Refferal Note</Typography>} />
                  </ListItem>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon className={classes.itemIcon}>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText
                     disableTypography
                     className={classes.itemText + whiteFontClasses}
                     inset
                     primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>Case Summary</Typography>} />
                  </ListItem>
                  <ListItem button className={classes.nested} component={Link} to="/RecruitmentMedicalExam">
                    <ListItemIcon className={classes.itemIcon}>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText
                     disableTypography
                     className={classes.itemText + whiteFontClasses}
                     inset
                     primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>Recruitment Medical Exam</Typography>} />
                  </ListItem>
                  <ListItem button className={classes.nested} component={Link} to="/TattooNote">
                    <ListItemIcon className={classes.itemIcon}>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText
                     disableTypography
                     className={classes.itemText + whiteFontClasses}
                     inset
                     primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>Tattoo Note</Typography>} />
                  </ListItem>
                  <ListItem button className={classes.nested} component={Link} to="/OperationNote">
                    <ListItemIcon className={classes.itemIcon}>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText
                     disableTypography
                     className={classes.itemText + whiteFontClasses}
                     inset
                     primary={<Typography type="body2" style={{ color: '#FFFFFF' }}>Operation Note</Typography>} />
                  </ListItem>
                </List>
              </Collapse>
            </List>
          :
            <ListItem button className={classes.itemLink + listItemClasses}>
              <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                {typeof prop.icon === "string" ? (
                  <Icon>{prop.icon}</Icon>
                ) : (
                  <prop.icon />
                )}
              </ListItemIcon>
              <ListItemText
                primary={prop.sidebarName}
                className={classes.itemText + whiteFontClasses}
                disableTypography={true}
              />
            </ListItem>
          }
          </NavLink>
        );
      })}
    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <a href="#" className={classes.logoLink}>
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
  );
  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="right"
          open={props.open}
          classes={{
            paper: classes.drawerPaper
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            <HeaderLinks />
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor="left"
          variant="permanent"
          open
          classes={{
            paper: classes.drawerPaper
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(sidebarStyle)(Sidebar);
