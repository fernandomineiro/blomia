import api from '../config/api';

const updateClient = async () => {
  const response = await api.get(`/users/registrations/show`);
  const client = response.data;

  return {
    id: client.id,
    phone_number: client.phone_number,
    name: client.full_name,
    email: client.email,
    cpf: client.cpf,
    dateBirth: client.birth_date,
    // score_quantity: client.user_score_quantity,
    // score_rating: client.user_score_rating,
    photo_url: client.photo_url,
    first_access: client.first_access,
    number_of_companies: client.number_of_companies,
  };
};

export default updateClient;
