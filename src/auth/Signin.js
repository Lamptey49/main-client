import React, {useState} from 'react';
import { signin} from './api-auth.js'
import auth from './auth-helper'
import {Redirect} from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles'
import {  
    Button, FormGroup,  Label, Input,  } from 'reactstrap';
import { Icon, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField'

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
export default function Signin(props){
    const classes = useStyles()
    const [values, setValues] = useState({
        email: '',
        password:'',
        error: '',
        redirectToReferrer: false
    })
    const clickSubmit = () => {
        const user = {
            email : values.email || undefined ,
            password : values.password || undefined
        }
        try {
            signin(user).then((data) => {
                if(data && data.error){
                    setValues({...values, error: data.error})
                }
                else{
                    auth.authenticate(data, ()=>{
                        setValues({...values, error: '', redirectToReferrer:true})
                    })
                }
            })
        } catch (error) {
            console.log(error)
        }
        
    }
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value})
    }
    const { from } = props.location.state || {
        from: {
            pathname:'/'
        }
    }
    const { redirectToReferrer} = values 
    if(redirectToReferrer){
        return (<Redirect to={from} /> )
    }
    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant='h6' className={classes.title}>Login</Typography>
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
                <FormGroup check>
                    <Label check>
                        <Input type="checkbox" name="remember"
                            />
                        Remember me
                    </Label>
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
           
           
    )
}