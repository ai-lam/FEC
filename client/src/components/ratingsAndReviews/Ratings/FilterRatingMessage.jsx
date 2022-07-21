import React from 'react';

const FilterRatingMessage = (props) => {
  console.log('props in message', props)
  const clickedStarsStr = props.clickedStars.join('');
  return (
    <div>
      Current filters: {clickedStarsStr}
    </div>
  );
};

export default FilterRatingMessage;
