import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeCountry } from '../../reducers/dataReducer/dataActions';

import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, TableContainer, Table, TableRow, TableCell, TableBody, TableFooter, TablePagination } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

import NumberFormat from 'react-number-format';

let items = [];

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

const styles = theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 300,
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
});

function mapStateToProps(state) {
  return {
    countries: state.data.countries,
    loading: state.data.loading,
    error: state.data.error,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeCountry }, dispatch);
}

class CountryRankTable extends Component {
  constructor(props) {
    super(props);
    this.state ={
      page: 0,
    };
  }

  handleClick = (event, country) => {
    this.props.changeCountry(country);
  }

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage,
    })
  }

  render () {
    const { classes, error, loading, countries } = this.props;
    const page = this.state.page;
    const rowsPerPage = 10;

    if (error || loading) {
      return (
        <div></div>
      )
    } else {
      if (items.length === 0) {
        countries.map((d,i) => items.push({
          country: d.country,
          countryName: d.countryName,
          cumConfirmed: d.cumConfirmed,
        }));
      }
      items.sort((a,b) => (b.cumConfirmed - a.cumConfirmed));
      const emptyRows = rowsPerPage - Math.min(rowsPerPage, items.length - page * rowsPerPage);
      return (
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="custom pagination table">
            <TableBody>
              {(rowsPerPage > 0
                ? items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : items
              ).map((row) => (
                <TableRow hover key={row.countryName} onClick={(event) => this.handleClick(event, row.country)}>
                  <TableCell component="th" scope="row">
                    {row.countryName}
                  </TableCell>
                  <TableCell align="right"><NumberFormat value={row.cumConfirmed} displayType={'text'} thousandSeparator={true} /></TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  count={items.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  rowsPerPageOptions={[10]}
                  SelectProps={{
                    inputProps: { 'aria-label': 'rows per page' },
                    native: true,
                  }}
                  onChangePage={this.handleChangePage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      )
    }
  }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps,mapDispatchToProps)(CountryRankTable));
