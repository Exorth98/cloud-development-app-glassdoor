import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';

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
    const [dataToPrint, setData] = useState(data);
    const [page, setPage] = useState(0);
    const [rowsPerpage, setRowPerPage] = useState(10);
    const [directionSort, setDirectionSort] = useState("desc");
    const [sortedField, setSortedField] = React.useState(null);
    //console.log(data);
   const keys = {data}.data[0];



   const handleChangePage = (event, newPage) => {
    setPage(newPage);
}

    const handleChangeRowsPerPage = (event) => {
        setRowPerPage(parseInt(event.target.value), 10);
        setPage(0);
    }

    const handleSort = (valueToSort) => {

        valueToSort = valueToSort.row;
        setSortedField(valueToSort);

        if(!directionSort){
            setDirectionSort("asc");
        }else{
            if(directionSort === "asc"){
                setDirectionSort("desc");
            }
            else{
                setDirectionSort("asc");
            }
        }
        if(directionSort === "desc"){
            setData( dataToPrint.sort((a, b) => a[valueToSort] > b[valueToSort] ));
        }
        else{
            setData( dataToPrint.sort((a, b) => a[valueToSort] < b[valueToSort] ));
        }
    }

   //console.log(Object.keys(keys)[0]);
    const classes = useStyles();

    return(
        <div>
            <Table className= {classes.table} >
                <TableHead> 
                    <TableRow>
                    {Object.keys(keys).map((row) => ( 
                         <TableCell align="left" colSpan={3} key={row}>
                             <TableSortLabel 
                             active={sortedField === row}
                             direction={sortedField === row ? directionSort : 'asc'}
                             onClick={() => handleSort({row})}>
                            {row}
                            </TableSortLabel>
                        </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
            {dataToPrint.slice(page * rowsPerpage, page * rowsPerpage + rowsPerpage).map((row) => (
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
                    count={dataToPrint.length}
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