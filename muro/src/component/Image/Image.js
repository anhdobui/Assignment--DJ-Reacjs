import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
import classNames from 'classnames';
import images from '@/assets/images';
import styles from './Image.module.scss';
const Image = forwardRef(
    (
        {
            src = '', // khong truyen se ko bi loi
            alt = '', // khong truyen se ko bi loi
            className,
            sinkImg,
            fallback: customFallback = images.noImage,
            ...passPort
        },
        ref,
    ) => {
        const [fallback, setFallback] = useState('');
        const handleError = () => {
            setFallback(customFallback);
        };
        const Comp = sinkImg ? 'div' : 'img';

        let props = {
            ...passPort,
        };

        props = sinkImg
            ? {
                  ...props,
                  style: {
                      backgroundImage: `url(${fallback || src})`,
                  },
              }
            : { ...props, src: fallback || src, alt, onError: handleError };
        return (
            <Comp
                className={classNames(styles.wrapper, className)}
                ref={ref}
                {...props}
            />
        );
    },
);
Image.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    className: PropTypes.string,
    sinkImg: PropTypes.bool,
    fallback: PropTypes.string,
};
export default Image;
