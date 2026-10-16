import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';
import { CalendarProps } from '@/types';

const Calendar: React.FC<CalendarProps> = ({
  events,
  selectedDate,
  onDateSelect,
  onEventClick,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [currentDate, setCurrentDate] = useState(selectedDate || new Date());

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Get calendar days for current month
  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1);
    const startCalendar = new Date(firstDayOfMonth);
    startCalendar.setDate(startCalendar.getDate() - firstDayOfMonth.getDay());
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const day = new Date(startCalendar);
      day.setDate(startCalendar.getDate() + i);
      days.push(day);
    }
    
    return days;
  };

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  // Navigate months
  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleDateClick = (date: Date) => {
    onDateSelect?.(date);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth();
  };

  const calendarDays = getCalendarDays();

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 3,
          px: 2,
        }}
      >
        <IconButton onClick={() => navigateMonth('prev')}>
          <ChevronLeft />
        </IconButton>
        
        <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary' }}>
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </Typography>
        
        <IconButton onClick={() => navigateMonth('next')}>
          <ChevronRight />
        </IconButton>
      </Box>

      {/* Days of week header */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          mb: 1,
        }}
      >
        {daysOfWeek.map((day) => (
          <Box
            key={day}
            sx={{
              textAlign: 'center',
              py: 1,
              fontWeight: 500,
              color: 'text.secondary',
              fontSize: '0.875rem',
            }}
          >
            {day}
          </Box>
        ))}
      </Box>

      {/* Calendar Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 0,
        }}
      >
        {calendarDays.map((date, index) => {
          const dayEvents = getEventsForDate(date);
          const hasEvents = dayEvents.length > 0;
          
          return (
            <Box
              key={index}
              onClick={() => handleDateClick(date)}
              sx={{
                minHeight: isMobile ? 60 : 80,
                p: 0.5,
                cursor: 'pointer',
                border: '1px solid #f0f0f0',
                backgroundColor: isSelected(date) 
                  ? '#6B8B5C' 
                  : hasEvents 
                  ? '#f8f9fa' 
                  : 'transparent',
                '&:hover': {
                  backgroundColor: isSelected(date) ? '#6B8B5C' : '#f5f5f5',
                },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: isToday(date) ? 600 : 400,
                  color: isSelected(date)
                    ? 'white'
                    : !isCurrentMonth(date)
                    ? '#ccc'
                    : isToday(date)
                    ? theme.palette.primary.main
                    : 'text.primary',
                  textAlign: 'center',
                  mb: 0.5,
                }}
              >
                {date.getDate()}
              </Typography>
              
              {/* Event indicators */}
              {hasEvents && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                  {dayEvents.slice(0, isMobile ? 1 : 2).map((event, eventIndex) => (
                    <Box
                      key={eventIndex}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick?.(event);
                      }}
                      sx={{
                        fontSize: '0.6rem',
                        p: 0.25,
                        backgroundColor: '#A0634C',
                        color: 'white',
                        borderRadius: 0.5,
                        textAlign: 'center',
                        cursor: 'pointer',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {event.title}
                    </Box>
                  ))}
                  {dayEvents.length > (isMobile ? 1 : 2) && (
                    <Typography
                      variant="caption"
                      sx={{
                        fontSize: '0.6rem',
                        color: 'text.secondary',
                        textAlign: 'center',
                      }}
                    >
                      +{dayEvents.length - (isMobile ? 1 : 2)} more
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          );
        })}
      </Box>

      {/* Selected date events */}
      {selectedDate && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Events for {selectedDate.toLocaleDateString()}
          </Typography>
          
          {getEventsForDate(selectedDate).map((event) => (
            <Card
              key={event.id}
              onClick={() => onEventClick?.(event)}
              sx={{
                mb: 2,
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: theme.shadows[4],
                },
              }}
            >
              <CardContent sx={{ py: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {event.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      {event.practitioner}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {event.startTime} - {event.endTime}
                    </Typography>
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      backgroundColor: '#E8D5C4',
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      color: 'text.secondary',
                    }}
                  >
                    {event.type}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
          
          {getEventsForDate(selectedDate).length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
              No events scheduled for this date
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Calendar; 