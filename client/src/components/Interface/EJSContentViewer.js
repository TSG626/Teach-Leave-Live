import React from 'react'
import EditorJs from 'react-editor-js'
import { CssBaseline, Grid, Typography, makeStyles } from '@material-ui/core'
import { Star as EndIcon } from '@material-ui/icons'
import { Paragraph } from '@editorjs/paragraph'
import { red } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
    header: {
        color: theme.palette.primary.light,
        fontFamily: "Times",
        textAlign: 'center',
        padding: theme.spacing(2)
    },
    paragraph: {
        textIndent: "3.5rem",
        textAlign: 'left',
        fontFamily: 'Genieva',
        letterSpacing: '.08rem',
        padding: theme.spacing(2,1)
    },
    list: {
    },
    item: {
        padding: theme.spacing(0, 1)
    }

}))

function Block(props){
    const classes = useStyles();
    switch(props.block.type){
        case "header":
            return (<Typography className={classes.header} variant={`h${props.block.data.level}`}>{`${props.block.data.text}`}</Typography>) 
        case "paragraph":
            return (<Typography className={classes.paragraph} variant='body1'>{props.block.data.text}</Typography>) 
        case "list":
            if(props.block.data.style == "ordered"){
                return(<ol className={classes.list}>{props.block.data.items.map((item, index) => (<li key={index} className={classes.item}>{item}</li>))}</ol>)
            }else{
                return(<ul className={classes.list}>{props.block.data.items.map((item, index) => (<li key={index} className={classes.item}>{item}</li>))}</ul>)
            }
        case "delimiter": 
            return(<EndIcon/>)
        // case "link": 
        default:
            return("OOPS");
    }
}

function EJSContentViewer(props){
    return(
        <Grid container>
            <CssBaseline/>
            {props.data.blocks.map((block, index) => {
                return (
                    <Block key={index} block={block}/>
                )})}
        </Grid>
    )
}

export default EJSContentViewer;
