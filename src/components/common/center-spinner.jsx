import { Spinner } from '@chakra-ui/react';
import React from 'react';

function CenterSpinner() {
  return (
    <div className="flex justify-center items-center h-100">
      <Spinner
        thickness="3px"
        speed="0.85s"
        emptyColor="gray.300"
        color="blue.500"
        size="xl"
      />
    </div>
  );
}

export default CenterSpinner;
