import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const useStyles = makeStyles({
    table: {
        margin: 'auto',
      minWidth: 700,
      width: '80vw',
    },
  });

const TabsValue = ({data}) => {
    console.log(data);
   const keys = {data}.data[0];
   //console.log(Object.keys(keys)[0]);
  

      const classes = useStyles();
    return(
        <div>

            <Table className= {classes.table} >
                <TableHead> 
                    <TableRow>
                    {Object.keys(keys).map((row) => (
                         <TableCell align="left" colSpan={3}>
                            {row}
                        </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
            {data.map((row) => (
            <TableRow>
                {Object.keys(keys).map((attribut) => (
              <TableCell align="left" colSpan={3} keys={row[attribut[0]]}>{row[attribut]}</TableCell>
                ))}
              
            </TableRow>
          ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default TabsValue;