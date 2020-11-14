import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '60%',
      margin: 'auto'
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
      flexBasis: '30%',
    flexShrink: 0
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        flexBasis: '40%',
      },
      thirdHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        flexBasis: '30%',
      },
      summary: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        flexBasis: '30%',
        
      },
      summarySecond: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        flexBasis: '30%',
      }
  }));

const ComponentAccordion = ({data}) => {
    console.log(data);
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };

    return(
        <div className={classes.root}>
            {data.map((row) => (
            <Accordion expanded={expanded === `${row.job_listingId_long}`} onChange={handleChange(`${row.job_listingId_long}`)} TransitionProps={{ unmountOnExit: true }} >
            
                <AccordionSummary
                        aria-controls="panel1a-content"
                        id={row.job_listingId_long}
                        expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}><a className="important">Employer: </a>{row.header_employerName}</Typography>
                        <Typography className={classes.secondaryHeading}><a className="important">Job title: </a>{row.header_jobTitle}<a className="important"> | Location: </a>{row.header_location}</Typography>
                        <Typography className={classes.thirdHeading}><a className="important">Date: </a>{row.header_posted}</Typography>
                </AccordionSummary>
                <AccordionDetails className="accordionDetails">
                    <Typography className={classes.Summary}>
                        <div><a className="important">Company informations: </a>
                            <br />{row.map_country}
                            <br />{row.overview_sector}
                            <br />{row.overview_size}
                            <br />{row.overview_type}
                        </div>
                    </Typography>
                    {row.benefits_comments.map((row2) => (
                    <Typography className={classes.summarySecond}>
                        <div><a className="important">Benefits comments: </a>
                            <br />{row2.benefits_comments_val_comment}
                            <br /><a className="important">{row2.benefits_comments_val_createDate}</a>
                        </div>
                    </Typography>
                    ))}
                </AccordionDetails>
       
           </Accordion>    
             ))}        
        </div>
    );
};

export default ComponentAccordion;