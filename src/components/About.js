import React from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog';
import { aboutClose } from '../modules/layoutActions';
import clover from '../containers/login/clover.png';

const About = props => {
  return (
    <Dialog
      open={props.open}
      onClose={props.close}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">McPeak Family Website</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <img src={clover} alt="shamrock" />

          <div>version 3.0 (React)</div>
          <div>
            <a
              href="mailto:jason.mcpeak@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              jason.mcpeak@gmail.com
            </a>
          </div>
          <div>
            <a
              href="https://github.com/jmcpeak/family/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              Report Issue
            </a>
          </div>
          <div>
            <a
              href="https://github.com/jmcpeak/family/"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
          <div>
            <a
              href="https://travis-ci.org/jmcpeak/family"
              target="_blank"
              rel="noopener noreferrer"
            >
              Travis CI
            </a>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.close} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = state => ({
  open: state.layout.aboutOpen
});

const mapDispatchToProps = dispatch => ({
  close: () => dispatch(aboutClose())
});

export default connect(mapStateToProps, mapDispatchToProps)(About);
