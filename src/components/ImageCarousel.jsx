import React, { useEffect, useRef, useState } from "react";

const sanitizeEnv = (value) =>
  String(value || "")
    .replace(/^['"]+|['"]+$/g, "")
    .trim();

const cloudName = sanitizeEnv(import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME);
const carouselTag =
  sanitizeEnv(import.meta.env.PUBLIC_CLOUDINARY_CAROUSEL_TAG) ||
  "carousel_images";
const rotationMs = 4000;
const fadeDurationMs = 650;
const swipeThresholdPx = 40;

const buildCloudinaryUrl = (publicId) => {
  if (!cloudName || !publicId) return "";
  const encodedPublicId = publicId
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_1600/${encodedPublicId}`;
};

const resolveImageSrc = (image) => {
  if (image.publicId) {
    const cloudinaryUrl = buildCloudinaryUrl(image.publicId);
    if (cloudinaryUrl) return cloudinaryUrl;
  }
  return image.src;
};

const buildAltFromPublicId = (publicId) => {
  if (!publicId) return "Carousel image";
  const fileName = publicId.split("/").pop() || "carousel-image";
  return fileName.replace(/[-_]+/g, " ").trim();
};

const sortByNewestFirst = (a, b) => {
  const timeA = Date.parse(a.created_at || "") || 0;
  const timeB = Date.parse(b.created_at || "") || 0;
  if (timeA !== timeB) return timeB - timeA;

  return String(a.public_id || "").localeCompare(
    String(b.public_id || ""),
    undefined,
    {
      numeric: true,
      sensitivity: "base",
    },
  );
};

const ImageCarousel = () => {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const transitionTimeoutRef = useRef(null);
  const touchStartXRef = useRef(null);
  const touchDeltaXRef = useRef(0);

  useEffect(() => {
    if (!cloudName) return undefined;

    const listUrl = `https://res.cloudinary.com/${cloudName}/image/list/${carouselTag}.json`;

    const loadCloudinaryImages = async () => {
      try {
        const response = await fetch(listUrl);
        if (!response.ok) return;

        const data = await response.json();
        const cloudinaryImages = (data.resources || [])
          .sort(sortByNewestFirst)
          .map((resource) => ({
            publicId: resource.public_id,
            alt: buildAltFromPublicId(resource.public_id),
          }));

        if (cloudinaryImages.length > 0) {
          setImages(cloudinaryImages);
          setCurrentImageIndex(0);
        }
      } catch {}
    };

    loadCloudinaryImages();

    return undefined;
  }, []);

  useEffect(() => {
    if (images.length < 2 || isPaused) return undefined;

    const interval = setInterval(() => {
      setIsFading(true);
      transitionTimeoutRef.current = setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsFading(false);
      }, fadeDurationMs);
    }, rotationMs);

    return () => {
      clearInterval(interval);
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [images, isPaused]);

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  if (!images.length) {
    return (
      <div className="image-carousel">
        <div className="carousel-frame carousel-skeleton" aria-hidden="true" />
      </div>
    );
  }

  const currentImage = images[currentImageIndex];
  const currentImageSrc = resolveImageSrc(currentImage);

  const goToIndex = (targetIndex) => {
    if (
      targetIndex === currentImageIndex ||
      targetIndex < 0 ||
      targetIndex >= images.length
    ) {
      return;
    }

    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }

    setIsFading(true);
    transitionTimeoutRef.current = setTimeout(() => {
      setCurrentImageIndex(targetIndex);
      setIsFading(false);
    }, fadeDurationMs);
  };

  const goToPrevious = () => {
    const targetIndex = (currentImageIndex - 1 + images.length) % images.length;
    goToIndex(targetIndex);
  };

  const goToNext = () => {
    const targetIndex = (currentImageIndex + 1) % images.length;
    goToIndex(targetIndex);
  };

  const handleTouchStart = (event) => {
    touchStartXRef.current = event.touches[0].clientX;
    touchDeltaXRef.current = 0;
    setIsPaused(true);
  };

  const handleTouchMove = (event) => {
    if (touchStartXRef.current === null) return;
    touchDeltaXRef.current = event.touches[0].clientX - touchStartXRef.current;
  };

  const handleTouchEnd = () => {
    if (Math.abs(touchDeltaXRef.current) > swipeThresholdPx) {
      if (touchDeltaXRef.current < 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }

    touchStartXRef.current = null;
    touchDeltaXRef.current = 0;
    setIsPaused(false);
  };

  return (
    <div
      className="image-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="carousel-frame"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        <img
          className={`carousel-image${isFading ? " is-fading" : ""}`}
          src={currentImageSrc}
          alt={currentImage.alt}
          loading="lazy"
          decoding="async"
        />
        {images.length > 1 && (
          <>
            <button
              className="carousel-control prev"
              type="button"
              onClick={goToPrevious}
              aria-label="Show previous image"
            >
              ‹
            </button>
            <button
              className="carousel-control next"
              type="button"
              onClick={goToNext}
              aria-label="Show next image"
            >
              ›
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="carousel-dots" aria-label="Carousel image selector">
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`carousel-dot${index === currentImageIndex ? " is-active" : ""}`}
              onClick={() => goToIndex(index)}
              aria-label={`Show image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
