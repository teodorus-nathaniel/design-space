import { Post } from './../../@types/post.interfaces';
import { User } from '../../@types/user.interfaces';
import {
  UserActionType,
  LOAD_USER,
  LOGIN,
  LOAD_USER_POSTS,
  UNFOLLOW_USER,
  FOLLOW_USER,
  USER_CHECKED,
  LOGOUT,
  LOAD_SELF
} from './user.actions';
import { getCookie } from '../utils/cookie';
import {
  CHANGE_LIKES_OR_DISLIKES,
  CHANGE_SAVED
} from '../global-post-actions/global-post-actions';
import {
  changePostLikesOrDislikes,
  changePostSaved
} from '../global-post-actions/global-post-reducer-helper';

interface IState {
  self: {
    data: User | null;
    posts: { data: Post[]; page: number };
  };
  user: {
    data: User | null;
    posts: { data: Post[]; page: number };
  };
  token: string;
  isChecked: boolean;
}

const INITIAL_STATE: IState = {
  self: { data: null, posts: { data: [], page: 0 } },
  user: { data: null, posts: { data: [], page: 0 } },
  token: getCookie('token'),
  isChecked: false
};

export default function userReducer (
  state: IState = INITIAL_STATE,
  action: UserActionType
): IState{
  function updateUser (updateCb: (user: User) => void, attrib: string){
    let target: 'user' | 'self' = 'user';
    if (attrib === 'self') target = 'self';

    if (
      (target === 'self' && !state.self.data) ||
      (target === 'user' && (!state.user.data || attrib !== state.user.data.id))
    ) {
      return state[target];
    }

    let newUser: User | null = null;
    if (state[target] && state[target].data) {
      const user = state[target].data;
      if (user) {
        newUser = { ...user };
        updateCb(newUser);
      }
    }

    return {
      ...state[target],
      data: newUser
    };
  }

  function updateUserAndSelfPosts (cb: (el: Post) => Post){
    const newUserPosts = state.user.posts.data.map(cb);
    const newSelfPosts = state.self.posts.data.map(cb);

    return {
      ...state,
      self: {
        ...state.self,
        posts: {
          ...state.self.posts,
          data: newSelfPosts
        }
      },
      user: {
        ...state.user,
        posts: {
          ...state.user.posts,
          data: newUserPosts
        }
      }
    };
  }

  switch (action.type) {
    case LOAD_USER_POSTS:
      const modify = action.payload.self ? 'self' : 'user';
      const newPosts =
        action.payload.page === 1
          ? action.payload.posts
          : [ ...state[modify].posts.data, ...action.payload.posts ];

      return {
        ...state,
        [modify]: {
          ...state[modify],
          posts: {
            ...state[modify].posts,
            data: newPosts,
            page: action.payload.page
          }
        }
      };

    case USER_CHECKED:
      return {
        ...state,
        isChecked: true
      };

    case LOAD_USER:
      return {
        ...state,
        user: {
          ...state.user,
          data: action.payload
        }
      };

    case LOAD_SELF:
      return {
        ...state,
        self: {
          ...state.user,
          data: action.payload
        }
      };

    case CHANGE_LIKES_OR_DISLIKES:
      return updateUserAndSelfPosts((el) =>
        changePostLikesOrDislikes(el, action.payload)
      );

    case CHANGE_SAVED:
      return updateUserAndSelfPosts((el) =>
        changePostSaved(el, action.payload)
      );

    case LOGIN:
      return {
        ...state,
        token: action.payload.token,
        self: {
          ...state.self,
          data: action.payload.user
        }
      };

    case LOGOUT:
      return {
        ...state,
        token: '',
        self: {
          data: null,
          posts: { data: [], page: 0 }
        }
      };

    case UNFOLLOW_USER:
      const newUnfollowSelf = updateUser((user) => {
        user.followingCount -= 1;
      }, 'self');

      const newUnfollowUser = updateUser((user) => {
        user.followersCount -= 1;
        user.followed = false;
      }, action.payload);

      return {
        ...state,
        user: newUnfollowUser,
        self: newUnfollowSelf
      };

    case FOLLOW_USER:
      const newFollowSelf = updateUser((user) => {
        user.followingCount += 1;
      }, 'self');

      const newFollowUser = updateUser((user) => {
        user.followersCount += 1;
        user.followed = true;
      }, action.payload);

      return {
        ...state,
        user: newFollowUser,
        self: newFollowSelf
      };

    default:
      return state;
  }
}
