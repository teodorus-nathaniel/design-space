import React from 'react';
import Page from './../../assets/images/Capture.png';
// import Page from './../../assets/images/page.jpg';

import './post-preview.styles.scss';
import CommentIcon from '../icons/comment/comment.component';
import BookmarkAddIcon from '../icons/bookmark-add/bookmark-add.component';
import LikeDislike from '../like-dislike/like-dislike.component';
import { Link } from 'react-router-dom';

import { useInView } from 'react-intersection-observer';
import useAnimation from '../../effects/useAnimation.effect';

export default function PostPreview (){
  const [ ref, , entry ] = useInView({
    triggerOnce: true,
    threshold: 0.5
  });

  useAnimation(entry!, { opacity: 1 }, 0.5);

  return (
    <div className='post-preview not-visible' ref={ref}>
      <div className='post-preview__content-container'>
        <Link to='/detail' className='image-container'>
          <div className='img-hover-hitbox' />
          <img src={Page} alt='page' />
        </Link>
        <div className='post-preview__content'>
          <div className='post-preview__info'>
            <span className='post-preview__title'>Figma UI</span>
            <span className='post-preview__detail'>
              by{' '}
              <Link to='/author' className='post-preview__author'>
                Teodorus
              </Link>
            </span>
          </div>
          <LikeDislike />
        </div>
      </div>
      <div className='post-preview__additional'>
        <div className='post-preview__comments'>
          <CommentIcon size={1.2} />
          <span>12 comments</span>
        </div>
        <BookmarkAddIcon size={1.2} />
      </div>
    </div>
  );
}
