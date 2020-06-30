import React, { useState } from 'react';
import unsplash from '../../api/unsplash';
import { Button, Col, Row, Modal, ProgressBar } from 'react-bootstrap';
import ImageCard from './ImageCard';
import SortedBin from './SortedBin';
import star from '../../assets/img/icons/star.png';
import cat from '../../assets/img/icons/cat.png';
import dog from '../../assets/img/icons/dog.png';
import bird from '../../assets/img/icons/bird.png';
import elefant from '../../assets/img/icons/elefant.png';
import panda from '../../assets/img/icons/panda.png';

import girafe from '../../assets/img/icons/girafe.png';
import bear from '../../assets/img/icons/bear.png';
import dolphin from '../../assets/img/icons/dolphin.png';
import stingray from '../../assets/img/icons/stingray.png';

import rule1 from '../../assets/img/icons/rule1.png';
import baloon from '../../assets/img/icons/baloon.gif';
import '../../css/styles.css';

const SortApp = () => {

  const [images, setImages] = useState([]);
  const [termsToSearch, setTermsToSearch] = useState([]);
  const [showEndModal, setShowEndModal] = useState(false);
  const [progress, setProgress] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const terms = ["dog", "cat", "bird", "elefant", "panda", "girafe", "bear", "dolphin", "stingray"];
  const icons = { cat, dog, bird, elefant, panda, girafe, bear, dolphin, stingray };

  const updateProgress = (term) => {
    let progress_;
    if (progress.some(item => item.name === term.name)) {
      progress_ = progress.map(item => {
        if (item.name === term.name) {
          item.percent = term.percent
          item.stars = term.stars
        }
        return item;
      });
    } else {
      progress_ = [...progress];
      progress_.push(term);
    }
    setProgress(progress_);
  };

  const makeApiCall = async (term) => {
    const response = await unsplash.get('/search/photos', {
      params: {
        query: term,
        per_page: 1000
      }
    });
    const apiResults = response.data.results;
    // pick 5 random pictures
    let generatedIndexes = [];
    for (let i = 0; i < 5; i++) {
      let index = Math.floor(Math.random() * apiResults.length);
      while (generatedIndexes.some(item => item === index)) {
        index = Math.floor(Math.random() * apiResults.length);
      }
      generatedIndexes.push(index);
    }
    let images_ = [];
    for (let i = 0; i < 5; i++) {
      let item = apiResults[generatedIndexes[i]];
      item.term = term;
      images_.push(item);
    }
    /*
    response.data.results.map(image => {
      image.term = term;
      images_.push(image);
    })
    */
    setImages(images => images.concat(images_));
  };

  const handleStart = () => {
    setIsPlaying(true);
    setImages([]);
    setTermsToSearch([]);
    setProgress([]);
    let termsToSearch_ = [];
    for (let i = 0; i < 3; i++) {
      let index = Math.floor(Math.random() * terms.length);
      while (termsToSearch_.some(item => item === index)) {
        index = Math.floor(Math.random() * terms.length);
      }
      termsToSearch_.push(index);
    }
    setTermsToSearch(termsToSearch_);
    for (let i = 0; i < 3; i++) {
      makeApiCall(terms[termsToSearch_[i]]);
    }
  };

  const shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  const removeImage = (id) => {
    const images_ = images.filter(image => image.id !== id);
    if (images_.length === 0) {
      setShowEndModal(true);
    }
    setImages(images_);
  };

  const handleCloseEndModal = () => {
    setShowEndModal(false);
    setIsPlaying(false);
  };

  let imagesToRender;
  let binsToRender = [];
  if (images.length > 0) {
    shuffle(images);
    imagesToRender = images.map((image, index) => {
      return <ImageCard
        key={index}
        image={image}
      />
    });
    for (let i = 0; i < 3; i++) {
      binsToRender.push(
        <SortedBin
          key={i}
          term={terms[termsToSearch[i]]}
          removeImage={removeImage}
          updateProgress={updateProgress}
        />
      );
    }
  }

  let progressToRender = [];
  if (progress.length > 0) {
    progress.map((item, index) => {
      let stars = [];
      if (item.stars) {
        for (let i = 0; i < item.stars; i++) {
          stars.push(
            <img key={i} src={star} alt="star" className="star" />
          )
        }
      }
      progressToRender.push(
        <div key={index} style={{ display: "flex", flexDirection: "column" }}>
          <img src={icons[item.name]} alt={item.name} style={{ width: "auto", height: "128px" }} />
          <div className="bounce-in-top">
            {stars}
          </div>
        </div>
      )
      return undefined;
    })
  };

  return (
    <>
      {!isPlaying &&
        <Col>
          <Row style={{ padding: "20px", alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column" }}>
            <img src={rule1} alt="star" className="rule1" />
            <Button onClick={() => handleStart()}>Start sorting!</Button>
          </Row>
        </Col>
      }
      <div style={{ display: "flex" }}>
        <div className="image-list">
          {imagesToRender}
        </div>
        <div className="sorted-area">
          {binsToRender}
        </div>
      </div>
      <Modal show={showEndModal} onHide={handleCloseEndModal} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Congratulations</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: "flex", justifyContent: "space-between" }}>
          <img src={baloon} alt="party" style={{ width: "auto", height: "128px" }} />
          {progressToRender}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleCloseEndModal()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div style={{ position: "fixed", bottom: "0px" }}>Icons made by <a href="https://smashicons.com/" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </>
  )
}

export default SortApp