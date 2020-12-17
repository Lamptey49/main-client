import { Button, Card, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

export default function CarouselSlide(props) {
    const useStyles = makeStyles(() => ({
        card:{
            backgroundColor:'#ff7c7',
            borderRadius:5,
            padding:'74px 50px',
            margin: '0px 25px',
            height:'300px',
            width:'800px',
            boxShadow: '5px 5px 5px #17293D',
            display: 'flex',
            justifyContent: 'center'
        }
    }))
    const classes = useStyles()

    return (
        <div>
            <Card className={classes.card}>
                <img src={props.imgUrl} alt=''  />
                <Typography>{props.title}</Typography>
                <Button>{props.button}</Button>
            </Card>
            
        </div>
    )
}
