import React, { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { useDrop } from 'react-dnd';
import ItemTypes from './ItemTypes';

import cat from '../../assets/img/icons/cat.png';
import dog from '../../assets/img/icons/dog.png';
import bird from '../../assets/img/icons/bird.png';
import elefant from '../../assets/img/icons/elefant.png';
import panda from '../../assets/img/icons/panda.png';

import girafe from '../../assets/img/icons/girafe.png';
import bear from '../../assets/img/icons/bear.png';
import dolphin from '../../assets/img/icons/dolphin.png';
import stingray from '../../assets/img/icons/stingray.png';

import '../../css/styles.css';


const SortedBin = ({ term, removeImage, updateProgress }) => {

  const [items, setItems] = useState([]);
  const icons = { cat, dog, bird, elefant, panda, girafe, bear, dolphin, stingray };

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.BOX,
    drop(item, monitor) {
      const isOverCurrent = monitor.isOver({ shallow: true })
      if (isOverCurrent) {
        const items_ = [item.image];
        setItems(items => items.concat(items_));
        removeImage(item.image.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isOverCurrent: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
  })
  const isActive = canDrop && isOver
  let backgroundColor = '#222'
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }

  useEffect(() => {
    let count = 0;
    items.map(item => {
      if (item.term === term)
        count = count + 1;
      return undefined
    })
    updateProgress({
      name: term,
      percent: Math.round((count * 100) / 3),
      stars: count
    });
  }, [items]);

  return (
    <div ref={drop} className="sortedBin" style={{ backgroundColor: backgroundColor }}>
      <img src={icons[term]} alt={term} style={{ width: "auto", height: "128px" }} />
    </div>
  )
};

export default SortedBin