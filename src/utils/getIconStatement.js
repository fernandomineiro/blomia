import CarteiraImg from '../assets/images/itens-extratos/carteira.png';
import CofreImg from '../assets/images/itens-extratos/cofre.png';
import MoneyTransferImg from '../assets/images/itens-extratos/money-transfer.png';
import onlineBankingImg from '../assets/images/itens-extratos/online-banking.png';

export default function getIconStatement(settingId) {
  switch (settingId) {
    case 1:
      return CarteiraImg;
    case 2:
      return CofreImg;
    case 3:
      return CofreImg;
    case 4:
      return CofreImg;
    case 6:
      return MoneyTransferImg;
    case 5:
      return onlineBankingImg;
    case 9:
      return onlineBankingImg;
    default:
      return CofreImg;
  }
}
