import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
  withMobileDialog
} from 'material-ui/Dialog';
import clover from '../assets/clover.png';

const PATH = '*/about',
  About = props => (
    <Dialog
      open={true}
      fullScreen={props.fullScreen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">McPeak Family Website</DialogTitle>
      <DialogContent id="alert-dialog-description">
        <img src={clover} alt="shamrock" height={240} width={240} />

        <div>version 3.1 (React)</div>
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
            href="https://github.com/jmcpeak/family-react/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            Report an Issue
          </a>
        </div>
        <div>
          <a
            href="https://github.com/jmcpeak/family-react/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source code available on GitHub
          </a>
        </div>
        <div>
          <a
            href="https://travis-ci.org/jmcpeak/family-react"
            target="_blank"
            rel="noopener noreferrer"
          >
            Travis CI - Test and Deploy with Confidence
          </a>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.history.goBack} color="primary" autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );

About.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};

export { PATH };
export default withMobileDialog()(About);
