import { IKImage } from 'imagekitio-react';

const Image = ({ src, className, width, height, alt }) => {
  return (
    <IKImage
      urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
      path={src}
      className={className}
      loading='lazy'
      lqip={{ active: true, quality: 20 }}
      alt={alt}
      width={width}
      height={height}
    />
  );
};

export default Image;
