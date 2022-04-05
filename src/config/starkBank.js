import axios from 'axios';

import { URL_STARK_BANK } from '../../blomia.config';

const starkBank = axios.create({
  baseURL: URL_STARK_BANK,
});

export default starkBank;
