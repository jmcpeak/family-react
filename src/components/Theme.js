import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Drawer from 'material-ui/Drawer';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Switch from 'material-ui/Switch';
import { THEME_DARK } from '../modules/constants';
import {
  addAvailable,
  openCloseDrawer,
  setPrimaryTheme,
  setSecondaryTheme,
  toggleDarkMode,
  togglePaletteSelected
} from '../modules/themeActions';

const mainThemeColorKey = '500',
  themeColors = [
    'amber',
    'blue',
    'blueGrey',
    'brown',
    'cyan',
    'deepOrange',
    'deepPurple',
    'green',
    'grey',
    'indigo',
    'lightBlue',
    'lightGreen',
    'lime',
    'orange',
    'pink',
    'purple',
    'red',
    'teal',
    'yellow'
  ];

class Theme extends PureComponent {
  addTheme = async theme => {
    import(`material-ui/colors/${theme}.js`)
      .then(theme => this.props.addAvailable(theme))
      .catch();
  };

  async componentDidMount() {
    if (this.props.availableThemes.length !== themeColors.length)
      themeColors.map(async theme => await this.addTheme(theme));
  }

  render() {
    const {
      availableThemes,
      open,
      openCloseDrawer,
      paletteSelected,
      setPrimaryTheme,
      setSecondaryTheme,
      toggleDarkMode,
      togglePaletteSelected,
      type
    } = this.props;

    return (
      <Drawer anchor={'right'} open={open}>
        <AppBar position={'static'} color={'secondary'}>
          <Toolbar>
            <Typography variant="title" color="inherit" style={{ flex: 1 }}>
              {'Theme Color'}
            </Typography>
            <IconButton
              color="inherit"
              aria-label="Close"
              onClick={openCloseDrawer}
            >
              <Icon>close</Icon>
            </IconButton>
          </Toolbar>
        </AppBar>
        <div>
          <div>
            <FormControl>
              <FormLabel>Which color palette do you want to change?</FormLabel>
              <RadioGroup
                onChange={togglePaletteSelected}
                style={{ display: 'inline' }}
                value={paletteSelected.toString()}
              >
                <FormControlLabel
                  value={'true'}
                  control={<Radio />}
                  label="Primary"
                />
                <FormControlLabel
                  value={'false'}
                  control={<Radio />}
                  label="Accent"
                />
              </RadioGroup>
            </FormControl>
          </div>

          {availableThemes.map((theme, index) => (
            <Button
              mini
              key={index}
              variant={'fab'}
              aria-label={theme[mainThemeColorKey]}
              style={{ backgroundColor: theme[mainThemeColorKey] }}
              onClick={() =>
                paletteSelected
                  ? setPrimaryTheme(availableThemes[index])
                  : setSecondaryTheme(availableThemes[index])
              }
            >
              &nbsp;
            </Button>
          ))}

          <div>
            <FormControl>
              <FormLabel>Dark Mode</FormLabel>
              <FormControlLabel
                control={
                  <Switch
                    checked={type === THEME_DARK}
                    color={'secondary'}
                    onChange={toggleDarkMode}
                  />
                }
                label={type === THEME_DARK ? 'On' : 'Off'}
              />
            </FormControl>
          </div>
        </div>
      </Drawer>
    );
  }
}

const mapStateToProps = state => ({
  availableThemes: state.theme.available,
  open: state.theme.open,
  paletteSelected: state.theme.paletteSelected,
  type: state.theme.type
});

const mapDispatchToProps = dispatch => ({
  addAvailable: theme => dispatch(addAvailable(theme)),
  openCloseDrawer: () => dispatch(openCloseDrawer()),
  setPrimaryTheme: color => dispatch(setPrimaryTheme(color)),
  setSecondaryTheme: color => dispatch(setSecondaryTheme(color)),
  toggleDarkMode: () => dispatch(toggleDarkMode()),
  togglePaletteSelected: () => dispatch(togglePaletteSelected())
});

export default connect(mapStateToProps, mapDispatchToProps)(Theme);
