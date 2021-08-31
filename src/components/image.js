import React from 'react';
import { getImage, getSrc, getSrcSet } from 'gatsby-plugin-image';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

export default function Image(props) {
  const image = getImage(props.image);

  if (!image) return null;

  const {
    alt, className, loading, preload, id,
  } = props;

  const { height, width, images } = image;

  return (
    <picture
      id={id}
    >
      {preload && (
        <Helmet link={[
          ...images.sources.map(({ sizes, srcSet, type }) => ({
            rel: 'preload', as: 'image', href: srcSet, media: sizes, type,
          })),
          {
            rel: 'preload', as: 'image', href: images.fallback.src, imagesrcset: images.fallback.srcSet,
          },
        ]}
        />
      )}
      {images.sources.map(
        ({ sizes, srcSet, type }) => (
          <source
            type={type}
            srcSet={srcSet}
            sizes={sizes}
            key={srcSet}
          />
        ),
      )}
      <img
        alt={alt}
        className={className}
        src={getSrc(image)}
        srcSet={getSrcSet(image)}
        width={width}
        height={height}
        loading={loading}
        data-swiper-parallax={props['data-swiper-parallax']}
        data-swiper-parallax-x={props['data-swiper-parallax-x']}
        data-swiper-parallax-y={props['data-swiper-parallax-y']}
      />
    </picture>
  );
}
Image.propTypes = {
  image: PropTypes.shape({ childImageSharp: PropTypes.object.isRequired }).isRequired,
  loading: PropTypes.oneOf(['lazy', 'eager']),
  className: PropTypes.string,
  alt: PropTypes.string,
  preload: PropTypes.bool,
};

Image.defaultPros = {
  preload: false,
};
