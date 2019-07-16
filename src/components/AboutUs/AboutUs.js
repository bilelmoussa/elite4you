import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import {  withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    Paper:{
        display: "flex",
        flexDirection: "column",
        width: "90%",
        minWidth: 300,
        maxWidth: 1000,
        margin: "40px auto",
        padding: 10
    },
    SectionContainer:{
        display: "flex",
        flexDirection: "column",
        margin: "20px 0"
    },
    header:{
        textTransform: "uppercase",
        margin: "15px 0",
        letterSpacing: 1,
    },
    content:{
        letterSpacing: 1,
        lineHeight: "2.2em"
    }
})

class AboutUs extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div style={{padding: "20px 10px", width: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{display: "flex", justifyContent: "center"}}><h1 style={{textTransform: "uppercase", letterSpacing: 1, paddingBottom: 10, borderBottom: "2px solid #ec6d6d", marginTop: 20, marginBottom: 20}}>About Us</h1></div>
                <Paper className={classes.Paper}>
                    <div className={classes.SectionContainer}>
                        <h2 className={classes.header}>who we are</h2>
                        <p className={classes.content}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate sit cupiditate eligendi quos veniam assumenda, soluta sequi voluptatem sunt consequatur ipsa beatae odio quod possimus, dolorum quibusdam? Repellendus distinctio fugit pariatur cum beatae in sunt aliquam repellat fuga a assumenda quos voluptas nobis ipsam nemo numquam modi sed adipisci, rem consequuntur delectus labore consequatur. Nostrum accusantium exercitationem aliquid, accusamus enim id reiciendis quasi consectetur inventore architecto veniam omnis ipsam iusto quos, officia voluptatum quisquam labore itaque rem animi magnam doloribus cupiditate fugiat in. Voluptatum, earum eveniet sunt iste, voluptas ipsum sequi fugit, nemo animi quam tempora dolor consectetur recusandae minima?</p>
                    </div>
                    <div className={classes.SectionContainer}>
                        <h2 className={classes.header}>Our Mission</h2>
                        <p className={classes.content}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate sit cupiditate eligendi quos veniam assumenda, soluta sequi voluptatem sunt consequatur ipsa beatae odio quod possimus, dolorum quibusdam? Repellendus distinctio fugit pariatur cum beatae in sunt aliquam repellat fuga a assumenda quos voluptas nobis ipsam nemo numquam modi sed adipisci, rem consequuntur delectus labore consequatur. Nostrum accusantium exercitationem aliquid.</p>
                    </div>
                    <div className={classes.SectionContainer}>
                        <h2 className={classes.header}>in the community</h2>
                        <p className={classes.content}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio earum quos hic! Corporis aperiam illum id aliquam doloremque sed, asperiores ab itaque tenetur odit atque tempore doloribus natus at quo reiciendis minima obcaecati dicta neque magni excepturi mollitia alias amet iste. Corrupti voluptatum harum sit, vitae ad dolore, numquam voluptates distinctio sapiente necessitatibus aperiam molestiae obcaecati eos excepturi, rem vel!</p>
                    </div>
                </Paper>
            </div>
        )
    }
}

AboutUs.protoType = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AboutUs)
