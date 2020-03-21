import { Comment } from './../@types/comment.interfaces';
import { Post, PostDetail } from '../@types/post.interfaces';
import PostImage from './../assets/images/page.jpg';
import page from './../assets/images/Capture.png';
import AvatarImage from './../assets/images/avatar.png';

export const dummyPost: Post = {
  id: '1',
  title: 'Figma UI',
  images: [ PostImage, page ],
  owner: {
    id: '2',
    username: 'Teodorus'
  },
  likeCount: 12,
  dislikeCount: 10,
  liked: true,
  commentsCount: 120,
  timestamp: new Date(),
  saved: true
};

export const dummyArrayPost: Post[] = Array.from({
  length: 25
}).map((_, idx) => {
  const data = { ...dummyPost };
  data.id = idx + '';
  const rand = Math.floor(Math.random() * 3);
  data.liked = rand === 1;
  data.disliked = rand === 2;
  data.saved = Boolean(Math.floor(Math.random() * 2));
  return data;
});

export const dummyPostDetail: PostDetail = {
  id: '1',
  title: 'Figma UI',
  images: [ PostImage, page, PostImage ],
  owner: {
    id: '2',
    username: 'Teodorus',
    profilePic: AvatarImage
  },
  likeCount: 0,
  dislikeCount: 0,
  likes: [],
  dislikes: [],
  saved: true,
  liked: true,
  commentsCount: 120,
  timestamp: new Date(),
  description: 'baki kabur menyelamatkan kota',
  link: 'google.com'
};

export const dummyComment: Comment = {
  id: '1',
  content:
    'lorem ipsum baki kabur bos menyelamatkan kota baktown dengan baju dari bakstore',
  dislikeCount: 20,
  likeCount: 1,
  owner: {
    id: 'isadjf',
    username: 'Teodorus'
  },
  repliesCount: 5,
  timestamp: new Date()
};

export const dummyArrayComments: Comment[] = Array.from({
  length: 5
}).map((_, idx) => {
  const rand = Math.floor(Math.random() * 3);
  const comment = { ...dummyComment };

  if (Math.random() > 0.5) comment.repliesCount = 0;
  comment.id = idx + '';
  comment.liked = rand === 1;
  comment.disliked = rand === 2;

  return comment;
});
