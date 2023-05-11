export const ALERT_SHOW_TIME = 5000;

export const SERVER_URL = 'http://localhost:5000';
export const DATABASE_ITEMS_URL = `${SERVER_URL}/items`;
export const DATABASE_CAMPAIGNSTATUS_URL = `${SERVER_URL}/items/campaignstatus`;
export const DATABASE_GETCAMPAIGNSTATUS_URL = `${SERVER_URL}/items/get/campaignstatus`;

export enum AppRoute {
  Login = '/login',
  //Property = '/line/:id',
  Root = '/'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum NameSpace {
  DataOffers = 'OFFERS',
  DataOffer = 'OFFER',
  App = 'APP',
  User = 'USER',
}

export enum APIRoute {
  OffersList = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Offer = '/hotels/:hotelId',
  Comments = '/comments/:hotelId',
  NearBy = '/hotels/:hotelId/nearby',
}