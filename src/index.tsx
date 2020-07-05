import React, { useState } from 'react';
import cx from 'classnames';
import { useInView } from 'react-intersection-observer';
import './index.css';

interface Props {
  thumb: string;
  aspectRatio: number;
}

export const Image: React.FC<
  Props & React.ImgHTMLAttributes<HTMLImageElement>
> = ({ alt, thumb, aspectRatio, className, ...props }) => {
  const [ref, inView] = useInView({ triggerOnce: true });
  const [isLoaded, setIsLoaded] = useState(false);
  const showImage = isLoaded || inView;

  return (
    <div
      ref={ref}
      className="react-progressive-image__container"
      style={{ paddingBottom: !isLoaded ? `${aspectRatio}%` : 0 }}
    >
      {showImage && (
        <React.Fragment>
          <img
            className={cx(
              'react-progressive-image__image react-progressive-image__thumb',
              className,
              {
                'react-progressive-image__thumb__loaded': isLoaded,
              }
            )}
            alt={alt}
            src={thumb}
            style={{ visibility: isLoaded ? 'hidden' : 'visible' }}
          />
          <img
            {...props}
            onLoad={() => {
              setIsLoaded(true);
            }}
            className={cx(
              'react-progressive-image__image react-progressive-image__full',
              className,
              {
                'react-progressive-image__loaded': isLoaded,
              }
            )}
            alt={alt}
          />
        </React.Fragment>
      )}
    </div>
  );
};
