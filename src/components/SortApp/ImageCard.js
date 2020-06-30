import React, { useRef, useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import { useDrag, DragPreviewImage } from 'react-dnd';
import ItemTypes from './ItemTypes';
import grab from '../../assets/img/icons/grab.png';
import '../../css/styles.css';

const ImageCard = ({ image }) => {
  const [spans, setSpans] = useState(0);
  const imageRef = useRef(null);

  const handleSpans = () => {
    const height = imageRef.current.clientHeight;
    const spans_ = Math.ceil(height / 10);
    setSpans(spans_);
  }

  useEffect(() => {
    imageRef.current.addEventListener("load", handleSpans);
  }, []);

  const [{ isDragging }, drag, preview] = useDrag({
    item: { image, type: ItemTypes.BOX },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      if (item && dropResult) {
        // alert(`You dropped ${image.alt_description}!`)
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0.2 : 1

  const [imageCardClassName, setImageCardClassName] = useState("");
  const handleonMouseDown = () => {
    setImageCardClassName("vibrate-2");
  }
  const handleonMouseUp = () => {
    setImageCardClassName("");
  }

  return (
    <>
      <DragPreviewImage connect={preview} src={grab} />
      <div
        ref={drag}
        onMouseDown={() => handleonMouseDown()}
        onMouseUp={() => handleonMouseUp()}
        style={{
          gridRowEnd: `span ${spans}`,
          opacity: opacity
        }}
        className={imageCardClassName}
      >
        <Image
          alt={image.alt_description}
          src={image.urls.regular}
          ref={imageRef}
          rounded
        />
      </div>
    </>
  )
};

export default ImageCard