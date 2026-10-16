import React, { useRef } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { VerificationCodeProps } from '@/types';

const VerificationCode: React.FC<VerificationCodeProps> = ({
  label,
  value,
  onChange,
  length = 6,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (index: number, inputValue: string) => {
    // Only allow single digit
    if (inputValue.length > 1) return;
    
    const newValue = [...value];
    newValue[index] = inputValue;
    onChange(newValue);

    // Auto-focus next input
    if (inputValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain');
    const digits = pastedData.replace(/\D/g, '').slice(0, length).split('');
    
    const newValue = [...value];
    digits.forEach((digit, index) => {
      if (index < length) {
        newValue[index] = digit;
      }
    });
    onChange(newValue);
    
    // Focus the next empty input or the last input
    const nextEmptyIndex = newValue.findIndex(v => !v);
    const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : length - 1;
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="h6"
        sx={{
          textAlign: 'center',
          mb: 2,
          color: '#A5B08A',
          fontWeight: 500,
        }}
      >
        {label}
      </Typography>
      
      <Box
        sx={{
          display: 'flex',
          gap: 1.5,
          justifyContent: 'center',
          mb: 2,
        }}
      >
        {Array.from({ length }, (_, index) => (
          <TextField
            key={index}
            inputRef={(el) => (inputRefs.current[index] = el)}
            value={value[index] || ''}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            inputProps={{
              maxLength: 1,
              style: {
                textAlign: 'center',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                padding: '16px',
              },
            }}
            sx={{
              width: 60,
              height: 60,
              '& .MuiOutlinedInput-root': {
                height: '100%',
                borderRadius: 2,
                backgroundColor: 'white',
                '& fieldset': {
                  borderColor: '#D0D0D0',
                  borderWidth: '2px',
                },
                '&:hover fieldset': {
                  borderColor: '#6B8B5C',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#6B8B5C',
                  borderWidth: '2px',
                },
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default VerificationCode; 