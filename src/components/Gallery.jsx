import React, { useEffect, useState } from "react";
import GalleryImages from "../data/gallery.json";

const cloudName = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME;
const galleryTag = "gallery";
const visibleTileCount = 8;
const rotationMs = 3000;
const fadeDurationMs = 450;
const minChangesPerCycle = 2;
const maxChangesPerCycle = 3;

const buildCloudinaryUrl = (publicId) => {
  if (!cloudName || !publicId) return "";
  const encodedPublicId = publicId
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,w_1200/${encodedPublicId}`;
};

const buildAltFromPublicId = (publicId) => {
  if (!publicId) return "Gallery image";
  const fileName = publicId.split("/").pop() || "gallery-image";
  return fileName.replace(/[-_]+/g, " ").trim();
};

const Gallery = () => {
  const [images, setImages] = useState(GalleryImages);
  const [tiles, setTiles] = useState([]);
  const [fadingSlots, setFadingSlots] = useState(
    Array.from({ length: visibleTileCount }, () => false),
  );

  useEffect(() => {
    if (!cloudName) return undefined;

    const listUrl = `https://res.cloudinary.com/${cloudName}/image/list/${galleryTag}.json`;

    const loadCloudinaryImages = async () => {
      try {
        const response = await fetch(listUrl);
        if (!response.ok) return;

        const data = await response.json();
        const cloudinaryImages = (data.resources || []).map((resource) => ({
          src: buildCloudinaryUrl(resource.public_id),
          alt: buildAltFromPublicId(resource.public_id),
        }));

        if (cloudinaryImages.length > 0) {
          setImages(cloudinaryImages);
        }
      } catch {
        // Keep local JSON fallback if Cloudinary list is unavailable.
      }
    };

    loadCloudinaryImages();

    return undefined;
  }, []);

  useEffect(() => {
    if (!images.length) {
      setTiles([]);
      return undefined;
    }

    const seededTiles = Array.from(
      { length: visibleTileCount },
      (_, index) => images[index % images.length],
    );

    setTiles(seededTiles);
    setFadingSlots(Array.from({ length: visibleTileCount }, () => false));

    return undefined;
  }, [images]);

  useEffect(() => {
    if (images.length < 2 || !tiles.length) return undefined;

    const timeoutIds = [];

    const interval = setInterval(() => {
      const changeCount =
        Math.floor(Math.random() * (maxChangesPerCycle - minChangesPerCycle + 1)) +
        minChangesPerCycle;
      const uniqueSlots = new Set();

      while (
        uniqueSlots.size < changeCount &&
        uniqueSlots.size < visibleTileCount
      ) {
        uniqueSlots.add(Math.floor(Math.random() * visibleTileCount));
      }

      const slotIndexes = [...uniqueSlots];

      setFadingSlots((prev) => {
        const next = [...prev];
        slotIndexes.forEach((slotIndex) => {
          next[slotIndex] = true;
        });
        return next;
      });

      const timeoutId = setTimeout(() => {
        setTiles((prev) => {
          const next = [...prev];

          slotIndexes.forEach((slotIndex) => {
            const current = next[slotIndex];
            let replacement = images[Math.floor(Math.random() * images.length)];
            let guard = 0;

            while (
              images.length > 1 &&
              replacement?.src === current?.src &&
              guard < 6
            ) {
              replacement = images[Math.floor(Math.random() * images.length)];
              guard += 1;
            }

            next[slotIndex] = replacement;
          });

          return next;
        });

        setFadingSlots((prev) => {
          const next = [...prev];
          slotIndexes.forEach((slotIndex) => {
            next[slotIndex] = false;
          });
          return next;
        });
      }, fadeDurationMs);

      timeoutIds.push(timeoutId);
    }, rotationMs);

    return () => {
      clearInterval(interval);
      timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, [images, tiles.length]);

  return (
    <div className="gallery-images">
      <h2>We got what you need</h2>
      <div className="images-from-gallery">
        {tiles.map((image, index) => (
          <div
            className={`gallery-tile${fadingSlots[index] ? " is-fading" : ""}`}
            key={index}
          >
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
