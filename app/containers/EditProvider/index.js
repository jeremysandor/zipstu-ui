/**
 *
 * EditProvider
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {makeSelectEditProvider, makeSelectProfileName, makeSelectHours} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

// actions
import { listService, changeProfileName, changeHours } from './actions'

// material ui
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  root: {
    width: '90%',
  },
  backButton: {
    marginRight: theme.spacing.unit,
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
});

function getSteps() {
  return ['Select master blaster campaign settings', 'Create an ad group', 'Create an ad'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return 'Select campaign settings...';
    case 1:
      return 'What is an ad group anyways?';
    case 2:
      return 'This is the bit I really care about!';
    default:
      return 'Uknown stepIndex';
  }
}



/*
- profile name
- profile type

- operating hours
- hourly price
- minimum booking

- address

- images
*/

export class EditProvider extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  
  state = {
    activeStep: 0,
  };

  handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1,
    });
  };

  handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    console.log('this.props')
    const { classes } = this.props;
    console.log('classes', classes)
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div>
        <Helmet>
          <title>List a Service</title>
          <meta name="description" content="List a Service" />
        </Helmet>

        <div className={classes.root}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map(label => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <div>
            {this.state.activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>
                  All steps completed - you&quot;re finished
                </Typography>
                <Button onClick={this.handleReset}>Reset</Button>
              </div>
            ) : (
              <div>
                <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={this.handleBack}
                    className={classes.backButton}
                  >
                    Back
                  </Button>
                  <Button color="primary" onClick={this.handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>        

        Just the basics:
        <div>
          <form onSubmit={this.props.onSubmitForm}>
            
            <label htmlFor="profileName">
              <TextField
                autoFocus
                id="profileName"
                type="text"
                label="Profile Name"
                value={this.props.profileName}
                onChange={this.props.onChangeProfileName}
              />
            </label><br />

            <label htmlFor="hours">
              <TextField
                id="hours"
                type="hours"
                label="Hours"
                value={this.props.hours}
                onChange={this.props.onChangeHours}
              />
            </label><br />           

            <Button type="submit" color="primary">
              List Service
            </Button>
          </form>
        </div>

      </div>
    );
  }
}



EditProvider.propTypes = {
  classes: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  onSubmitForm: PropTypes.func,
  profileName: PropTypes.string,
  hours: PropTypes.string,
  onChangeProfileName: PropTypes.func,
  onChangeHours: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  editprovider: makeSelectEditProvider(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeProfileName: (evt) => dispatch(changeProfileName(evt.target.value)),
    onChangeHours: (evt) => dispatch(changeHours(evt.target.value)),    
    onSubmitForm: (evt) => {
      console.log('EVT', evt);
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(listService());
    },      
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'editProvider', reducer });
const withSaga = injectSaga({ key: 'editProvider', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(EditProvider);
