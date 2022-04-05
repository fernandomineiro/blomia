import {
  SET_CLIENT,
  SET_ADDRESS_CLIENT,
  UPTDATE_CLIENT,
} from '../actions/actionTypes';

const initialState = {
  id: null,
  phone_number: '',
  full_name: '',
  email: '',
  score_quantity: 0,
  score_rating: 0,
  photo_url: '',
  number_of_companies: 0,
  address: null,
  company: null,
};

const getClient = (state = initialState, action) => {
  switch (action.type) {
    case SET_CLIENT: {
      const client = action.payload;
      const company = client.company
        ? {
            id: client.company.id,
            cnpj: client.company.cnpj,
            name: client.company.company_name,
            photo_url: client.company.photo_url,
            score_quantity: client.company.company_score_quantity,
            score_rating: client.company.company_score_rating,
            address: client.company.address
              ? {
                  id: client.company.address.id,
                  zip_code: client.company.address.zip_code,
                  street: client.company.address.street,
                  number: client.company.address.number,
                  complement: client.company.address.complement,
                  neighborhood: client.company.address.neighborhood,
                  city: client.company.address.city,
                  state: client.company.address.state,
                  country: client.company.address.country,
                  latitude: client.company.address.latitude,
                  longitude: client.company.address.longitude,
                }
              : null,
          }
        : null;

      return {
        ...state,
        id: client.id,
        phone_number: client.phone_number,
        name: client.full_name,
        email: client.email,
        cpf: client.cpf,
        dateBirth: client.birth_date,
        score_quantity: client.user_score_quantity,
        score_rating: client.user_score_rating,
        photo_url: client.photo_url,
        first_access: client.first_access,
        number_of_companies: client.number_of_companies,
        company,
      };
    }
    case SET_ADDRESS_CLIENT: {
      const addressClient = action.payload;

      return {
        ...state,
        address: addressClient,
      };
    }
    case UPTDATE_CLIENT: {
      const clientUpdated = action.payload;

      return {
        ...state,
        ...clientUpdated,
      };
    }
    default:
      return state;
  }
};

export default getClient;
