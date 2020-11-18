import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const useStyles = makeStyles({
    table: {
        margin: 'auto',
      minWidth: 700,
      width: '80vw',
    },
  });

const convertType = (attribut) => {
    if(typeof attribut === 'number'){
        if(attribut % 1 === 0){
            return attribut;
        }else{
            return attribut.toFixed(2);
        }
        
    }
    return attribut;
} 



const TabsValue = ({data}) => {
    const [page, setPage] = useState(0);
    const [rowsPerpage, setRowPerPage] = useState(10);
    console.log(data);
   const keys = {data}.data[0];

   const handleChangePage = (event, newPage) => {
    setPage(newPage);
}

    const handleChangeRowsPerPage = (event) => {
        setRowPerPage(parseInt(event.target.value), 10);
        setPage(0);
    }

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
            {data.slice(page * rowsPerpage, page * rowsPerpage + rowsPerpage).map((row) => (
            <TableRow>
                {Object.keys(keys).map((attribut) => (
              <TableCell align="left" colSpan={3} keys={row[attribut[0]]}>{convertType(row[attribut])}</TableCell>
                ))}
              
            </TableRow>
          ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                    <TablePagination rowsPerPageOptions={[10, 20, 50]} 
                    rowsPerPage={rowsPerpage}
                    count={data.length}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
};

export default TabsValue;