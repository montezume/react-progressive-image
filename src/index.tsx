import React, { useState } from 'react';
import cx from 'classnames';
import { useIntersectionObserver } from './useIntersectionObserver';
import './index.css';

interface Props {
  thumb: string;
  aspectRatio: number;
}

export const Image: React.FC<
  Props & React.ImgHTMLAttributes<HTMLImageElement>
> = ({ alt, thumb, aspectRatio, className, ...props }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useIntersectionObserver({
    target: ref,
    onIntersect: ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        setIsVisible(true);
        observerElement.unobserve(ref.current as HTMLDivElement);
      }
    },
  });

  return (
    <div
      ref={ref}
      className="react-progressive-image__container"
      style={{ paddingBottom: !isLoaded ? `${aspectRatio}%` : 0 }}
    >
      {isVisible && (
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
