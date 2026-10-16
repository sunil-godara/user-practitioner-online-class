import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Rating,
  Button,
  Divider,
} from '@mui/material';
import { ReviewsProps } from '@/types';

const Reviews: React.FC<ReviewsProps> = ({
  reviews,
  averageRating,
  totalReviews,
  showAll = false,
}) => {
  const [showAllReviews, setShowAllReviews] = useState(showAll);
  
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    }
    const years = Math.floor(diffDays / 365);
    return `${years} year${years > 1 ? 's' : ''} ago`;
  };

  return (
    <Box sx={{ mb: 4 }}>
      {/* Reviews Header */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 600,
          mb: 3,
          color: 'text.primary',
        }}
      >
        Practitioner Reviews
      </Typography>

      {/* Overall Rating Summary */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          mb: 3,
          p: 3,
          backgroundColor: '#f8f9fa',
          borderRadius: 3,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Rating
            value={averageRating}
            readOnly
            precision={0.1}
            sx={{
              '& .MuiRating-iconFilled': {
                color: '#FFD700',
              },
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {averageRating.toFixed(1)}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          ({totalReviews} review{totalReviews !== 1 ? 's' : ''})
        </Typography>
      </Box>

      {/* Individual Reviews */}
      <Box sx={{ mb: 3 }}>
        {displayedReviews.map((review, index) => (
          <Box key={review.id}>
            <Box sx={{ py: 3 }}>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  mb: 2,
                }}
              >
                <Avatar
                  src={review.userAvatar || '/api/placeholder/50/50'}
                  sx={{ width: 50, height: 50 }}
                />
                <Box sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      mb: 1,
                      flexWrap: 'wrap',
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        fontSize: '1rem',
                        color: 'text.primary',
                      }}
                    >
                      {review.userName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: '0.875rem' }}
                    >
                      {review.reviewCount && `${review.reviewCount} reviews`}
                      {review.reviewCount && review.photoCount && ' • '}
                      {review.photoCount && `${review.photoCount} photos`}
                    </Typography>
                  </Box>
                  
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Rating
                      value={review.rating}
                      readOnly
                      size="small"
                      sx={{
                        '& .MuiRating-iconFilled': {
                          color: '#FFD700',
                        },
                      }}
                    />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ fontSize: '0.875rem' }}
                    >
                      {formatDate(review.date)}
                    </Typography>
                  </Box>
                  
                  <Typography
                    variant="body1"
                    sx={{
                      lineHeight: 1.6,
                      color: 'text.primary',
                    }}
                  >
                    {review.comment}
                  </Typography>
                </Box>
              </Box>
            </Box>
            
            {index < displayedReviews.length - 1 && (
              <Divider sx={{ mx: 0 }} />
            )}
          </Box>
        ))}
      </Box>

      {/* Show More/Less Button */}
      {reviews.length > 3 && (
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button
            variant="outlined"
            onClick={() => setShowAllReviews(!showAllReviews)}
            sx={{
              borderColor: '#6B8B5C',
              color: '#6B8B5C',
              borderRadius: 25,
              px: 4,
              py: 1,
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                borderColor: '#556847',
                backgroundColor: 'rgba(107, 139, 92, 0.04)',
              },
            }}
          >
            {showAllReviews 
              ? 'Show Less Reviews' 
              : `View all ${reviews.length} reviews`
            }
          </Button>
        </Box>
      )}

      {/* No Reviews State */}
      {reviews.length === 0 && (
        <Box
          sx={{
            textAlign: 'center',
            py: 4,
            color: 'text.secondary',
          }}
        >
          <Typography variant="body1">
            No reviews yet. Be the first to leave a review!
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Reviews; 