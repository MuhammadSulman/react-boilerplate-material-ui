/**
 *
 * LoginPage
 *
 */

import React, {useState} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { useInjectSaga } from "../../utils/injectSaga";
import { useInjectReducer } from "../../utils/injectReducer";
import makeSelectLoginPage from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { submit, changeInput } from './actions';
import messages from "./messages";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {Link, Redirect} from 'react-router-dom'
import { Field, reduxForm } from 'redux-form';


function Copyright() {
  return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        {/*<Link href="https://material-ui.com/">*/}
        {/*  Your Website*/}
        {/*</Link>{' '}*/}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const key = "loginPage";

const Input = ({name, input, label, placeHolder, type, children, ...rest}) => {
  return (
      <TextField
          placeholder={placeHolder}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label={label}
          name={name}
          type={type}
          autoComplete={name}
          autoFocus
          {...input} {...rest}
      >
        {children}
      </TextField>
  )
};

export function LoginPage({
                            history,
                            location,
                            onFormSubmit,
                            onChangeInput,
                            handleSubmit
                          }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const classes = useStyles();
  const { from } = location.state || { from: { pathname: "/" } };
  if (false) {
    return <Redirect to={from} />;
  }

  return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form}  onSubmit={handleSubmit((formData) => onFormSubmit({formData, history}) ) } >
              <Field
                  style={{ marginBottom: 12}}
                  name="email"
                  component={Input}
                  placeholder="Email"
                  label="Email"
                  type="email"
              />
              <Field
                  style={{ marginBottom: 12}}
                  name="password"
                  component={Input}
                  placeholder="Password"
                  label="Password"
                  type="password"
              />
              <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
              />

                <Button
                    fullWidth
                    color="primary"
                    type="submit"
                    variant="contained"
                    className={classes.submit}
                >
                    Sign In
                </Button>

              <Grid container>
                <Grid item xs>
                  <Link to="forgot-password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="sign-up" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
  );
}

const mapStateToProps = (state) => ({
  loginPage: makeSelectLoginPage()(state)
});

function mapDispatchToProps(dispatch) {
  return {
    onChangeInput: requestPayload => dispatch(changeInput(requestPayload)),
    onFormSubmit: requestPayload => dispatch(submit(requestPayload))
  };
}

const loginForm = reduxForm({
  form: 'LoginForm',
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect, loginForm)(LoginPage);
