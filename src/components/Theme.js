import React from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Drawer from 'material-ui/Drawer';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { toggleTheme } from '../modules/themeActions';
import { setPrimaryTheme } from '../modules/themeActions';

import purple from 'material-ui/colors/purple';
import brown from 'material-ui/colors/brown';

const styles = () => ({
  flex: {
    flex: 1
  },
  purple: {
    backgroundColor: 'purple'
  },
  brown: {
    backgroundColor: 'brown'
  }
});

const Theme = props => {
  const { classes } = props;

  return (
    <Drawer anchor={'right'} open={props.open}>
      <AppBar position={'static'} color={'secondary'}>
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            {'Theme Color'}
          </Typography>
          <IconButton
            color="inherit"
            aria-label="Close Theme Color"
            onClick={props.toggle}
          >
            <Icon>close</Icon>
          </IconButton>
        </Toolbar>
      </AppBar>
      <div>
        <h1>Theme colors go here</h1>
        <Button
          variant={'fab'}
          aria-label={'red'}
          className={classes.purple}
          onClick={props.setPrimaryThemePurple}
        >
          &nbsp;
        </Button>
        <Button
          variant={'fab'}
          aria-label={'brown'}
          className={classes.brown}
          onClick={props.setPrimaryThemeBrown}
        >
          &nbsp;
        </Button>
      </div>
    </Drawer>
  );
};

const mapStateToProps = state => ({
  open: state.theme.open
});

const mapDispatchToProps = dispatch => ({
  toggle: () => dispatch(toggleTheme()),
  setPrimaryThemePurple: () => dispatch(setPrimaryTheme(purple)),
  setPrimaryThemeBrown: () => dispatch(setPrimaryTheme(brown))
});

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Theme)
);
