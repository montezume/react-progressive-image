import React, { useState } from 'react';
import cx from 'classnames';
import './index.css';

const useIntersectionObserver = ({
  target,
  onIntersect,
  threshold = 0.1,
  rootMargin = '0px',
}: {
  target?: Element;
  onIntersect: IntersectionObserverCallback;
  threshold?: number;
  rootMargin?: string;
}) => {
  React.useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, {
      rootMargin,
      threshold,
    });

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  });
};

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

  if (ref.current) {
    useIntersectionObserver({
      target: ref.current,
      onIntersect: ([{ isIntersecting }], observerElement) => {
        if (isIntersecting) {
          setIsVisible(true);
          observerElement.unobserve(ref.current as HTMLDivElement);
        }
      },
    });
  }

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
