export const LOGIN = "/token";
export const REGISTER = "/users/";
export const GET_USER_BY_USERNAME = "/users/{username}";
export const POST_ADD = "/users/{user_id}/posts";
export const GET_USER_INFO = "/users/me/";
export const UPDATE_USER = "/users/{user_id}";
export const GET_ALL_POST = "/posts/";
export const GET_USER_BY_ID = "/user/{user_id}";
export const GET_USERS_POSTS = "/users/posts/";
export const UPLOAD_PROFILE_PICTURE = "/users/upload_profile_picture/";
export const GET_USERS = "/users/";
//create the conversation by passing the id of the talent and the client
export const CREATE_CONVERSATION = "/conversations";
export const SEND_MESSAGE = "/send_messages/";
export const GET_ALL_CONVERSATIONS = "/conversations/extended/{user_id}/all";
export const GET_MESSAGES_BY_CONVERSATION_ID =
  "/get_messages/{conversation_id}";
export const UPLOAD_USER_PICTURE = "/users/pictures/upload_pictures/";
export const GET_USER_PICUTRES = "/users/pictures/get_pictures/";
export const BCKND_API_IP = 'http://20.76.254.92:80'
