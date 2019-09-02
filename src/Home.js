import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import axios from 'axios';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const headRows = [
  { id: 'first_name', numeric: false, disablePadding: true, label: 'First Name' },
  { id: 'last_name', numeric: false, disablePadding: false, label: 'Last Name' },
  { id: 'company_name', numeric: false, disablePadding: false, label: 'Company Name' },
  { id: 'city', numeric: false, disablePadding: false, label: 'City' },
  { id: 'state', numeric: false, disablePadding: false, label: 'State' },
  { id: 'zip', numeric: true, disablePadding: false, label: 'ZIP' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'web', numeric: false, disablePadding: false, label: 'Web' },
  { id: 'age', numeric: true, disablePadding: false, label: 'Age' },
];


const EnhancedTableHead=(props)=> {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler= property=>{
    onRequestSort(property);
  }

  return (
    <TableHead>
      <TableRow>
        {headRows.map(row => (
          <TableCell
          style={{fontSize:12}}
            key={row.id}
            align={row.numeric ? 'right' : 'left'}
            padding={row.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === row.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === row.id}
              direction={order}
              onClick={()=>createSortHandler(row.id)}
            >
              {row.label}
              {orderBy === row.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

class Home extends Component{

  constructor(props){
    super(props);
    this.state={
      order:'asc', 
      page:'',
      orderBy:'',
      rowsPerPage:5,
      tableResponse:[]
    }
  }


  componentDidMount(){
    axios.get('https://demo9197058.mockable.io/users')
  .then(response=>{
    this.setState({tableResponse:response.data},()=>{console.log("ggg",this.state.tableResponse)})
  })
  .catch(function (error) {
    console.log(error);
  });
  }


   handleRequestSort=(property)=> {
    const isDesc = this.state.orderBy === property && this.state.order === 'desc';
    if(isDesc){
      this.setState({order:'asc'})
    }else{
      this.setState({order:'desc'}) 
    }
    this.setState({orderBy:property},()=>{
      console.log("örder/orderBy",this.state.order,this.state.orderBy)
    })
  }

   handleChangePage(event, newPage) {
    this.setState({page:newPage})
  }

   handleChangeRowsPerPage(event) {
     this.setState({rowsPerPage:+event.target.value})
    this.setState({page:0})
  }

  handleSearch(val) {
let currentList = [];
let newList = [];

if (val !== "") {
  currentList = this.state.tableResponse;
  newList = currentList.filter(item => {
    const lc = item.first_name.toLowerCase();
    const filter = val.toLowerCase();
    return lc.includes(filter);
  });
} else {
  newList = this.state.tableResponse;
}
this.setState({
  tableResponse: newList
});
}

  desc(a, b, orderBy) {
    if (b[this.state.orderBy] < a[this.state.orderBy]) {
      return -1;
    }
    if (b[this.state.orderBy] > a[this.state.orderBy]) {
      return 1;
    }
    return 0;
  }

  getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => this.desc(a, b, orderBy) : (a, b) => -this.desc(a, b, orderBy);
  }

  stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = cmp(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }

  render(){
    const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.state.tableResponse.length -this.state.page * this.state.rowsPerPage);
    const{classes}=this.props;
    return(
      <div className={classes.root}>
        {
          this.state.tableResponse.length>1?
      <Paper className={classes.paper}>
      
      <TextField
        id="standard-bare"
        placeholder="Search by First Name"
        className={classes.textField}
        margin="normal"
        onChange={(evt)=>this.handleSearch(evt.target.value)}
        inputProps={{ 'aria-label': 'bare' }}
      />

        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size= 'medium'
          >
            <EnhancedTableHead
              classes={classes}
              order={this.state.order}
              orderBy={this.state.orderBy}
              onRequestSort={(evt)=>this.handleRequestSort(evt)}
              rowCount={this.state.tableResponse.length}
            />
            
            <TableBody>
              {this.stableSort(this.state.tableResponse, this.getSorting(this.state.order, this.state.orderBy))
                .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      onClick={event =>this.props.history.push('/about',row)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.name}
                    >
                      <TableCell component="th" id={index} scope="row" padding="none" style={{fontSize:12}}>
                        {row.first_name}
                      </TableCell>
                      <TableCell style={{fontSize:12}} align="right">{row.last_name}</TableCell>
                      <TableCell style={{fontSize:12}} align="right">{row.company_name}</TableCell>
                      <TableCell style={{fontSize:12}} align="right">{row.city}</TableCell>
                      <TableCell style={{fontSize:12}} align="right">{row.state}</TableCell>
                      <TableCell style={{fontSize:12}} align="right">{row.zip}</TableCell>
                      <TableCell style={{fontSize:12}} align="right">{row.email}</TableCell>
                      <TableCell style={{fontSize:12}} align="right">{row.web}</TableCell>
                      <TableCell style={{fontSize:12}} align="right">{row.age}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 *emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={this.state.tableResponse.length}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.page}
          backIconButtonProps={{
            'aria-label': 'previous page',
          }}
          nextIconButtonProps={{
            'aria-label': 'next page',
          }}
          onChangePage={(evt,newPage)=>this.handleChangePage(evt,newPage)}
          onChangeRowsPerPage={(evt)=>this.handleChangeRowsPerPage(evt)}
        />
      </Paper>:
      <h6>Loading...</h6>
        }
    </div>
    );
  }
}

const useStyles = theme => ({
  root: {
    // width: '100%'
    paddingRight:theme.spacing(3),
    paddingLeft:theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
  }
});

export default withStyles(useStyles)(Home);