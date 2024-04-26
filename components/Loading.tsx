import Image from 'next/image';
import React from 'react';

const Loading = () => {
  return (
    <Image
      className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]"
      src={'/icons/loading-circle.svg'}
      width={50}
      height={50}
      alt="loading"
    />
  );
};

export default Loading;
