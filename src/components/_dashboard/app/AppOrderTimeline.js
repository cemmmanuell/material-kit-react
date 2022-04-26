import faker from 'faker';
import PropTypes from 'prop-types';
import { fShortenNumber, fNumber } from '../../../utils/formatNumber';
import ReactSession from 'react-client-session/dist/ReactSession';
// material
import { Card, Typography, CardHeader, CardContent } from '@material-ui/core';
import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineConnector,
  TimelineSeparator,
  TimelineDot
} from '@material-ui/lab';
// utils
import { fDateTime } from '../../../utils/formatTime';

// ----------------------------------------------------------------------


function OrderItem({ item, isLast }) {

 
  const { type, title, time } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          sx={{
            bgcolor:
              (type === 'order1' && 'primary.main') ||
              (type === 'order2' && 'success.main') ||
              (type === 'order3' && 'info.main') ||
              (type === 'order4' && 'warning.main') ||
              'error.main'
          }}
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {time}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

export default function AppOrderTimeline() {

  const TIMELINES = [
    {
      title: 'Junior savings',
      time: fNumber(ReactSession.get('user_details')==undefined ? 0 : ReactSession.get('user_details').data.juniorSavings),
      type: 'order1'
    },
    {
      title: 'Property savings',
      time: fNumber(ReactSession.get('user_details')==undefined ? 0 : ReactSession.get('user_details').data.propertySavings),
      type: 'order2'
    },
    {
      title: 'Holiday savings',
      time: fNumber(ReactSession.get('user_details')==undefined ? 0 : ReactSession.get('user_details').data.holidaySavings),
      type: 'order3'
    },
    {
      title: 'Insurance contribution',
      time:fNumber(ReactSession.get('user_details')==undefined ? 0 : ReactSession.get('user_details').data.insuranceContribution),
      type: 'order4'
    }
  ];
  
  // ----------------------------------------------------------------------
  
  OrderItem.propTypes = {
    item: PropTypes.object,
    isLast: PropTypes.bool
  };
  
  return (
    <Card
      sx={{
        '& .MuiTimelineItem-missingOppositeContent:before': {
          display: 'none'
        }
      }}
    >
      <CardHeader title="Other accounts" />
      <CardContent>
        <Timeline>
          {TIMELINES.map((item, index) => (
            <OrderItem key={item.title} item={item} isLast={index === TIMELINES.length - 1} />
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}
