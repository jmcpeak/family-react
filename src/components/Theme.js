import React, { PureComponent } from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Drawer from 'material-ui/Drawer';
import Grid from 'material-ui/Grid';
import Hidden from 'material-ui/Hidden';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import { FormLabel, FormControl, FormControlLabel } from 'material-ui/Form';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Switch from 'material-ui/Switch';
import { THEME_DARK } from '../constants';
import {
  setAvailable,
  setPrimaryTheme,
  setSecondaryTheme,
  toggleDarkMode,
  togglePaletteSelected
} from '../actions/theme';

const PATH = 'theme',
  mainThemeColorKey = '500',
  orderedThemeColors = [
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
  ],
  mapStateToProps = state => ({
    themes: state.theme.available,
    open: state.layout.themeDrawerOpen,
    paletteSelected: state.theme.paletteSelected,
    type: state.theme.type
  }),
  mapDispatchToProps = {
    setAvailable,
    setPrimaryTheme,
    setSecondaryTheme,
    toggleDarkMode,
    togglePaletteSelected
  },
  styles = theme => ({
    drawerPaper: {
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      },
      [theme.breakpoints.up('sm')]: {
        width: 320
      }
    }
  });

class Theme extends PureComponent {
  constructor(props) {
    super(props);

    this.themes = [];
    this.swatchRows = [
      { start: 0, end: 4 },
      { start: 4, end: 8 },
      { start: 8, end: 12 },
      { start: 12, end: 16 },
      { start: 16, end: 19 }
    ];

    if (this.props.rows && this.props.columns) {
      this.swatchRows = new Array(this.props.rows)
        .fill(null)
        .map((row, index) => {
          let retVal = { start: 0, end: 0 };

          if (index !== 0) {
            retVal.start = index * this.props.columns;
            retVal.end =
              index !== this.props.rows - 1
                ? retVal.start + this.props.columns
                : orderedThemeColors.length;
          } else {
            retVal.end = this.props.columns;
          }

          return retVal;
        });
    }
  }

  addTheme = async name => {
    import(`material-ui/colors/${name}.js`)
      .then(theme => {
        this.themes.push({ name, theme });

        if (this.themes.length === orderedThemeColors.length)
          this.props.setAvailable({
            order: orderedThemeColors,
            themes: this.themes
          });
      })
      .catch();
  };

  async componentDidMount() {
    if (this.props.themes.length !== orderedThemeColors.length)
      orderedThemeColors.map(async theme => await this.addTheme(theme));
  }

  render() {
    const {
      classes,
      history,
      themes,
      paletteSelected,
      setPrimaryTheme,
      setSecondaryTheme,
      toggleDarkMode,
      togglePaletteSelected,
      type
    } = this.props;

    let rows = [];

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

    this.swatchRows.forEach(row => {
      rows.push(
        themes
          .filter((theme, index) => index >= row.start && index < row.end)
          .map((theme, index) =>
            getThemeButton(theme, index + +(row.start !== 0 ? row.start : 0))
          )
      );
    });

    return (
      <Drawer
        anchor="right"
        classes={{ paper: classes.drawerPaper }}
        ModalProps={{ hideBackdrop: true }}
        open={true}
      >
        <AppBar position={'static'} color={'secondary'}>
          <Toolbar>
            <Typography variant="title" color="inherit" style={{ flex: 1 }}>
              {'Theme Color'}
            </Typography>
            <Hidden smUp>
              <Button
                color="inherit"
                aria-label="Done"
                onClick={history.goBack}
              >
                Done
              </Button>
            </Hidden>
            <Hidden smDown>
              <IconButton
                color="inherit"
                aria-label="Close"
                onClick={history.goBack}
              >
                <Icon>close</Icon>
              </IconButton>
            </Hidden>
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
              {rows.map((row, index) => (
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

Theme.propTypes = {
  column: PropTypes.number,
  row: PropTypes.number
};

export { PATH };
export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Theme)
);
