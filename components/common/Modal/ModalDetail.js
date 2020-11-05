import { useEffect, useState } from 'react';
import { findDOMNode } from 'react-dom';
import Lightbox from 'react-image-lightbox';
import Image from '../Image';
import ButtonAddToCart from '../ButtonAddToCart';

const ModalDetail = ({ onHide = () => {}, product }) => {
  const [scrolled, setScrolled] = useState(false);
  const [variants, setVariants] = useState({});
  const [wrapper, setWrapper] = useState(null);
  const [zoomImage, setZoomImage] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const { assets: images } = product;

  useEffect(() => {
    const variants = {};
    product.variants.forEach((variant) => {
      variants[variant.name] = ''
    });
    setVariants(variants);
    findDOMNode(wrapper)?.parentElement?.addEventListener('scroll', scrollHandler);
    return () => {
      findDOMNode(wrapper)?.parentElement?.removeEventListener('scroll', scrollHandler);
    }
  }, []);

  const scrollHandler = (e) => {
    setScrolled(e.target.scrollTop > 100);
  };

  const operateZoom = (zoomImage = true) => {
    setZoomImage(zoomImage);
  };

  const lightboxHandler = (photoIndex) => {
    setPhotoIndex(photoIndex);
  };

  const selectVariant = (variantProduct, kind) => {
    setVariants({
      ...variants,
      [variantProduct.name]: kind.id
    })
  }

  const renderOption = () => product.variants
    .map((variant, index) => (
      <div key={index}>
        <p className="text-capitalize">{variant.name}</p>
        <div className="mb-2">
          {product.variants[index].options.map((kind) => (
            <button
              key={kind.id}
              onClick={() => selectVariant(variant, kind)}
              className={`btn
              btn-sm
              btn-outline-${variants[variant.name] === kind.id ? 'primary' : 'secondary'}
              text-uppercase mr-1`}
            >
              {kind.name}
            </button>
          ))}
        </div>
      </div>
    ))

  return (
    <div className="row mt-n3 pb-5 product-detail-wrapper" ref={(e) => setWrapper(e)}>
      <div className={`sticky-top text-left action-header py-2 ${scrolled ? 'bg-white border-bottom' : ''}`}>
        <div className="container">
          <a onClick={() => onHide()}>
            <Image width={24} height={24} src="/images/icon-arrow-left-greyDark.png" />
          </a>
        </div>
      </div>

      <div className="col-12 px-0 mt-n5" onClick={() => operateZoom()}>
        <Image className="object-fit-contain" src={product.assets[photoIndex].url} width={480} height={500} />

        {zoomImage && (
          <Lightbox
            mainSrc={images[photoIndex].url}
            nextSrc={images[(photoIndex + 1) % images.length].url}
            prevSrc={images[(photoIndex + images.length - 1) % images.length].url}
            onCloseRequest={() => operateZoom(false)}
            onMovePrevRequest={lightboxHandler((photoIndex + images.length - 1) % images.length)}
            onMoveNextRequest={lightboxHandler((photoIndex + 1) % images.length)}
          />
        )}
      </div>

      <div className="row mx-0 mt-3">
        {
          images.map((image, index) => (
            <div onClick={() => lightboxHandler(index)} className="col-2 px-2" key={index}>
              <Image
                className={`object-fit-contain ${index === photoIndex ? 'border border-primary rounded' : ''}`}
                src={image.url}
                width={150}
                height={150}
              />
            </div>
          ))
        }
      </div>


      <div className="col-12 mt-3">
        <div className="row pb-3 border-bottom mb-2 mx-0">
          <div className="col-12 pl-0">
            <p>{product.price.formatted}</p>
            <p className="product-name">{product.name}</p>
          </div>
        </div>

        {renderOption()}

        <div className="row mt-n1 px-3 pt-3">
          <div className="col-12 border-top px-0">
            <div className="my-3" dangerouslySetInnerHTML={{ __html: product.description }} />
          </div>
        </div>

        <div className="row fixed-bottom footer-button">
          <div className="col-12">
            <ButtonAddToCart product={product} variants={variants} onSuccess={() => onHide()} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalDetail;
