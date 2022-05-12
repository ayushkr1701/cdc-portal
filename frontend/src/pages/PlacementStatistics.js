import React, { useState, useEffect } from 'react';
import instance from '../api/axios';
import Loading from '../components/Loading';
import { Chart } from 'react-google-charts';
import Paper from '@material-ui/core/Paper';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import FadeInWhenVisible from '../components/Animation/FadeIn';
import FadeUpBigDataWhenVisible from '../components/Animation/FadeUpBigData';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    marginBottom: '2rem',
    [theme.breakpoints.down(460)]: {
      padding: 15,
    },
  },
  body: {
    fontSize: '1rem',
    color: 'black',
  },
  paper: {
    padding: '1rem',
    margin: '2rem 0',
    [theme.breakpoints.up(460)]: {
      paddingInline: 40,
    },
    width: 'auto',
    color: 'black',
  },
  heading: {
    fontSize: '1.8rem',
    color: '#fff',
    backgroundColor: '#012970',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '6rem 0rem 2rem 0rem',
    padding: '1rem',
  },
}));

// Placement Data
const heading = ['Branch', '2020-21', '2019-20'];
const data = [
  ['CSE', 100, 100, 'Computer Science Engineering'],
  ['EE', 81, 84, 'Electrical Engineering'],
  ['ME', 65, 83, 'Mechanical Engineering'],
];

const overall = [83, 89];

const PlacementStatistics = () => {
  const classes = useStyles();
  const [loading, setLoding] = useState(true);
  const [text, settext] = useState([]);

  useEffect(() => {
    instance
      .get('main/navbar_suboptions/')
      .then((res) => {
        settext(
          res.data.filter((subOption) =>
            subOption.title.includes('PlacementStatistics')
          )[0]
        );
      })
      .then(() => setLoding(false))
      .catch((error) => console.log(error));
  }, []);
  const createText = () => {
    return { __html: text.description };
  };
  return (
    <div style={{ height: 'auto', width: '100%' }}>
      {loading ? (
        <Loading />
      ) : (
        <Container maxWidth="lg">
          <FadeInWhenVisible>
            <Paper
              className={classes.heading}
              style={{ background: '#012970', color: '#fff' }}
              elevation={2}
            >
              <i
                class="fas fa-info-circle"
                style={{ margin: '0 1.2rem', padding: '0' }}
              ></i>
              Placement Statistics
            </Paper>
          </FadeInWhenVisible>
          <FadeUpBigDataWhenVisible>
            <Paper className={classes.paper}>
              {text ? <p dangerouslySetInnerHTML={createText()} /> : <p></p>}
              <TableContainer
                className={classes.tablewrapper}
                component={Paper}
                elevation={0}
              >
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.body}>
                        <b>{heading[0]}</b>
                      </TableCell>
                      <TableCell className={classes.body}>
                        <b>{heading[1]}</b>
                      </TableCell>
                      <TableCell className={classes.body}>
                        <b>{heading[2]}</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((Data) => {
                      return (
                        <TableRow key={Data[0]}>
                          <TableCell
                            className={classes.body}
                            component="th"
                            scope="row"
                          >
                            {Data[3]} ({Data[0]})
                          </TableCell>
                          <TableCell className={classes.body} align="left">
                            {Data[1]}%
                          </TableCell>
                          <TableCell className={classes.body} align="left">
                            {Data[2]}%
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    <TableRow key="overall">
                      <TableCell
                        className={classes.body}
                        component="th"
                        scope="row"
                      >
                        Overall
                      </TableCell>
                      <TableCell className={classes.body} align="left">
                        {overall[0]}%
                      </TableCell>
                      <TableCell className={classes.body} align="left">
                        {overall[1]}%
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Chart
                width={'100%'}
                height={'500px'}
                chartType="ComboChart"
                loader={<div>Loading Chart</div>}
                data={[heading].concat(data.map((d) => [d[0], d[1], d[2]]))}
                options={{
                  vAxis: { title: 'Placement Percentage', minValue: 0 },
                  hAxis: { title: 'Departments' },
                  legend: 'bottom',
                  animation: {
                    duration: 1000,
                    easing: 'out',
                    startup: true,
                  },
                  seriesType: 'bars',
                  series: { 2: { type: 'line' } },
                }}
                rootProps={{ 'data-testid': '1' }}
              />
              <Chart
                width={'100%'}
                height={'500px'}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={[
                  ['Year', 'Placement Percentage'],
                  [heading[1], overall[0]],
                  [heading[2], overall[1]],
                ]}
                options={{
                  vAxis: { title: 'Year' },
                  hAxis: { title: 'Placement Percentage', minValue: 0 },
                  legend: { position: 'bottom' },
                  animation: {
                    duration: 1000,
                    easing: 'out',
                    startup: true,
                  },
                  seriesType: 'bars',
                  series: { 2: { type: 'line' } },
                }}
                rootProps={{ 'data-testid': '1' }}
              />
            </Paper>
          </FadeUpBigDataWhenVisible>
        </Container>
      )}
    </div>
  );
};

export default PlacementStatistics;
