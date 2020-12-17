import React, {useState} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {create} from './api-user.js'
import {Link} from 'react-router-dom'
import {   FormGroup   } from 'reactstrap';

const useStyles = makeStyles(theme => ({
    card: {
      maxWidth: 600,
      margin: 'auto',
      textAlign: 'center',
      marginTop: theme.spacing(5),
      paddingBottom: theme.spacing(2)
    },
    error: {
      verticalAlign: 'middle'
    },
    title: {
      marginTop: theme.spacing(2),
      color: theme.palette.openTitle
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 300
    },
    submit: {
      margin: 'auto',
      marginBottom: theme.spacing(2)
    }
  }))

function SignUp() {
    const classes = useStyles()
    const [values, setValues ]= useState({
        name:'',
        email: '',
        password: '',
        open:false,
        error: ''
    })
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.values})
    }

    const clickSubmit = () => {
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined
        }
        create(user).then((data) => {
            if(data){
                setValues({...values, error: data.error})
            }
            else{
                setValues({...values, error:'', open:true})
            }
        })
    }
    return (
        <div>
            <Card className={classes.card}>
            <CardContent>
                <Typography variant='h6' className={classes.title}>Register New Account</Typography>
                <FormGroup>
                    <TextField type="name" id="name" name="name" label='Fullname' className={classes.textField}
                        value={values.name}
                        onChange={handleChange('name')} required />
                </FormGroup>
                <FormGroup>
                    <TextField type="email" id="email" name="email" label='Email' className={classes.textField}
                        value={values.email}
                        onChange={handleChange('email')} required />
                </FormGroup>
                <FormGroup>
                    <TextField type="password" id="password" label='Password' className={classes.textField}
                        name="password"
                        value={values.password}
                        onChange={handleChange('password')} required />
                </FormGroup>
                
                <br />
                {
                    values.error && (<Typography component='p' color='error'>
                        <Icon color='error' className={classes.error}>error</Icon>
                        {values.error}
                    </Typography>)
                }
                <CardActions>
                        <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
                </CardActions>
            </CardContent>
        </Card>
            <Dialog open={values.open} disableBackdropClick={true}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/auth/signin">
            <Button color="primary" autoFocus="autoFocus" variant="contained">
              Sign In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
        </div>
    )
}

export default SignUp
