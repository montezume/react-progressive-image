import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import './index.css';

interface Props {
  thumb: string;
  aspectRatio: number;
}

export const Image: React.FC<
  Props & React.ImgHTMLAttributes<HTMLImageElement>
> = ({ alt, thumb, aspectRatio, ...props }) => {
  const [ref, inView] = useInView({ triggerOnce: true });
  const [isLoaded, setIsLoaded] = useState(false);
  const showImage = isLoaded || inView;

  let thumbClassName =
    'react-progressive-image__image react-progressive-image__thumb';

  let imageClassName =
    'react-progressive-image__image react-progressive-image__full';

  if (isLoaded) {
    thumbClassName = thumbClassName + ' react-progressive-image__thumb__loaded';
    imageClassName = imageClassName + ' react-progressive-image__loaded';
  }

  return (
    <div
      ref={ref}
      className="react-progressive-image__container"
      style={{ paddingBottom: !isLoaded ? `${aspectRatio}%` : 0 }}
    >
      {showImage && (
        <React.Fragment>
          <img
            className={thumbClassName}
            alt={alt}
            src={thumb}
            style={{ visibility: isLoaded ? 'hidden' : 'visible' }}
          />
          <img
            {...props}
            onLoad={() => {
              setIsLoaded(true);
            }}
            className={imageClassName}
            alt={alt}
          />
        </React.Fragment>
      )}
    </div>
  );
};
