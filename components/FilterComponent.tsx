import React from 'react';
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Button,
  Chip,
  Paper,
  SelectChangeEvent,
} from '@mui/material';
import { FilterComponentProps, FilterOptions } from '@/types';

const FilterComponent: React.FC<FilterComponentProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
}) => {

  const modalityOptions = [
    'All Modalities',
    'Guided Thermotherapy',
    'Breathwork',
    'Cold Plunge',
    'Sauna',
    'Meditation',
    'Yoga',
    'Sound Healing',
  ];

  const dateOptions = [
    'Any Date',
    'Today',
    'Tomorrow',
    'This Week',
    'This Weekend',
    'Next Week',
    'This Month',
  ];

  const priceOptions = [
    'Any Price',
    'Free',
    'Under $25',
    '$25 - $50',
    '$50 - $100',
    'Over $100',
  ];

  const sessionTypeOptions = [
    'All Types',
    'Individual',
    'Group',
    'Workshop',
    'Retreat',
    'Online',
    'In-Person',
  ];

  const handleSelectChange = (
    filterType: keyof FilterOptions,
    event: SelectChangeEvent<string>
  ) => {
    const value = event.target.value;
    const newFilters = { ...filters };
    
    if (value === 'All Modalities' || value === 'Any Date' || value === 'Any Price' || value === 'All Types') {
      newFilters[filterType] = [];
    } else {
      newFilters[filterType] = [value];
    }
    
    onFilterChange(newFilters);
  };

  const removeFilter = (filterType: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters };
    newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
    onFilterChange(newFilters);
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).reduce((count, filterArray) => count + filterArray.length, 0);
  };

  const getCurrentValue = (filterType: keyof FilterOptions, defaultOption: string) => {
    return filters[filterType].length > 0 ? filters[filterType][0] : defaultOption;
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        mb: 3,
        backgroundColor: '#f8f9fa',
        borderRadius: 3,
      }}
    >
      {/* Filter Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
          }}
        >
          Filters
        </Typography>
        
        {getActiveFiltersCount() > 0 && (
          <Button
            variant="text"
            onClick={onClearFilters}
            sx={{
              color: '#A0634C',
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: 'rgba(160, 99, 76, 0.04)',
              },
            }}
          >
            Clear All
          </Button>
        )}
      </Box>

      {/* Main Filters */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: '1fr 1fr 1fr 1fr',
          },
          gap: 2,
          mb: 3,
        }}
      >
        {/* Modality Filter */}
        <FormControl size="small">
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
            Modality
          </Typography>
          <Select
            value={getCurrentValue('modality', 'All Modalities')}
            onChange={(e) => handleSelectChange('modality', e)}
            sx={{
              backgroundColor: 'white',
              borderRadius: 2,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#e0e0e0',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#6B8B5C',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#6B8B5C',
              },
            }}
          >
            {modalityOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Date Filter */}
        <FormControl size="small">
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
            Date
          </Typography>
          <Select
            value={getCurrentValue('date', 'Any Date')}
            onChange={(e) => handleSelectChange('date', e)}
            sx={{
              backgroundColor: 'white',
              borderRadius: 2,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#e0e0e0',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#6B8B5C',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#6B8B5C',
              },
            }}
          >
            {dateOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Price Filter */}
        <FormControl size="small">
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
            Price
          </Typography>
          <Select
            value={getCurrentValue('price', 'Any Price')}
            onChange={(e) => handleSelectChange('price', e)}
            sx={{
              backgroundColor: 'white',
              borderRadius: 2,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#e0e0e0',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#6B8B5C',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#6B8B5C',
              },
            }}
          >
            {priceOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Session Type Filter */}
        <FormControl size="small">
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
            Session Type
          </Typography>
          <Select
            value={getCurrentValue('sessionType', 'All Types')}
            onChange={(e) => handleSelectChange('sessionType', e)}
            sx={{
              backgroundColor: 'white',
              borderRadius: 2,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#e0e0e0',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#6B8B5C',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#6B8B5C',
              },
            }}
          >
            {sessionTypeOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Active Filters Display */}
      {getActiveFiltersCount() > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500, color: 'text.secondary' }}>
            Active Filters:
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {Object.entries(filters).map(([filterType, values]) =>
              values.map((value: string) => (
                <Chip
                  key={`${filterType}-${value}`}
                  label={value}
                  onDelete={() => removeFilter(filterType as keyof FilterOptions, value)}
                  size="small"
                  sx={{
                    backgroundColor: '#6B8B5C',
                    color: 'white',
                    '& .MuiChip-deleteIcon': {
                      color: 'rgba(255,255,255,0.7)',
                      '&:hover': {
                        color: 'white',
                      },
                    },
                  }}
                />
              ))
            )}
          </Box>
        </Box>
      )}

      {/* Filter Summary */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          {getActiveFiltersCount() > 0 
            ? `${getActiveFiltersCount()} filter${getActiveFiltersCount() > 1 ? 's' : ''} applied`
            : 'No filters applied'
          }
        </Typography>
      </Box>
    </Paper>
  );
};

export default FilterComponent; 