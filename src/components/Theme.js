import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Drawer from 'material-ui/Drawer';
import Grid from 'material-ui/Grid';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Switch from 'material-ui/Switch';
import { THEME_DARK } from '../modules/constants';
import { openCloseThemeDrawer } from '../modules/layoutActions';
import {
  setAvailable,
  setPrimaryTheme,
  setSecondaryTheme,
  toggleDarkMode,
  togglePaletteSelected
} from '../modules/themeActions';

const mainThemeColorKey = '500',
  themeColors = [
    'red',
    'pink',
    'purple',
    'deepPurple',
    'indigo',
    'blue',
    'lightBlue',
    'cyan',
    'teal',
    'green',
    'lightGreen',
    'lime',
    'yellow',
    'amber',
    'orange',
    'deepOrange',
    'brown',
    'grey',
    'blueGrey'
  ];

class Theme extends PureComponent {
  constructor() {
    super();
    this.themes = [];
  }

  addTheme = async name => {
    import(`material-ui/colors/${name}.js`)
      .then(theme => {
        this.themes.push({ name: name, theme: theme });

        if (this.themes.length === themeColors.length)
          this.props.setAvailable({
            order: themeColors,
            themes: this.themes
          });
      })
      .catch();
  };

  async componentDidMount() {
    if (this.props.themes.length !== themeColors.length)
      themeColors.map(async theme => await this.addTheme(theme));
  }

  render() {
    const {
      themes,
      open,
      openCloseThemeDrawer,
      paletteSelected,
      setPrimaryTheme,
      setSecondaryTheme,
      toggleDarkMode,
      togglePaletteSelected,
      type
    } = this.props;

    const ThemeButton = props => {
        const { index, theme } = props;

        return (
          <Button
            mini
            key={index}
            variant={'fab'}
            aria-label={theme[mainThemeColorKey]}
            style={{ backgroundColor: theme[mainThemeColorKey] }}
            onClick={() =>
              paletteSelected
                ? setPrimaryTheme(themes[index])
                : setSecondaryTheme(themes[index])
            }
          >
            &nbsp;
          </Button>
        );
      },
      getThemeButton = (theme, index) => (
        <ThemeButton key={index} theme={theme} index={index} />
      );

    const row1 = themes
        .filter((theme, index) => index >= 0 && index < 5)
        .map(getThemeButton),
      row2 = themes
        .filter((theme, index) => index >= 5 && index < 10)
        .map((theme, index) => getThemeButton(theme, index + 5)),
      row3 = themes
        .filter((theme, index) => index >= 10 && index < 15)
        .map((theme, index) => getThemeButton(theme, index + 10)),
      row4 = themes
        .filter((theme, index) => index >= 15 && index < 19)
        .map((theme, index) => getThemeButton(theme, index + 15));

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
              onClick={openCloseThemeDrawer}
            >
              <Icon>close</Icon>
            </IconButton>
          </Toolbar>
        </AppBar>
        <div style={{ padding: '36px' }}>
          <Grid
            container
            direction={'column'}
            justify={'center'}
            alignItems={'center'}
            spacing={24}
          >
            <Grid item lg>
              <FormControl>
                <FormLabel style={{ textAlign: 'center' }}>
                  Color Palette
                </FormLabel>
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
            </Grid>

            <Grid item lg>
              {[row1, row2, row3, row4].map((row, index) => (
                <Grid key={index} container alignItems={'center'} spacing={8}>
                  <Grid item lg>
                    {row}
                  </Grid>
                </Grid>
              ))}
            </Grid>

            <Grid item lg>
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
            </Grid>
          </Grid>
        </div>
      </Drawer>
    );
  }
}

const mapStateToProps = state => ({
  themes: state.theme.available,
  open: state.layout.themeDrawerOpen,
  paletteSelected: state.theme.paletteSelected,
  type: state.theme.type
});

const mapDispatchToProps = dispatch => ({
  setAvailable: theme => dispatch(setAvailable(theme)),
  openCloseThemeDrawer: () => dispatch(openCloseThemeDrawer()),
  setPrimaryTheme: color => dispatch(setPrimaryTheme(color)),
  setSecondaryTheme: color => dispatch(setSecondaryTheme(color)),
  toggleDarkMode: () => dispatch(toggleDarkMode()),
  togglePaletteSelected: () => dispatch(togglePaletteSelected())
});

export default connect(mapStateToProps, mapDispatchToProps)(Theme);
