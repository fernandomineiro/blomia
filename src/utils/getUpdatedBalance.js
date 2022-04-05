import api from '../config/api';

const updateBalance = async client => {
  const response = await api.get(
    `/simple_balance${
      client.company ? `?company_id=${client.company.id}` : ''
    }`,
  );

  return response.data.balance;
};

export default updateBalance;
