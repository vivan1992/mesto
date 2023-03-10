const token = 'a74fa796-219d-49f6-bd95-845d7cb5bd76';
const id = 'cohort-61';

export const initialCardsByApi = {
  baseUrl: `https://mesto.nomoreparties.co/v1/${id}/cards`,
  options: {
    headers: {
      authorization: token
    }
  }
};
