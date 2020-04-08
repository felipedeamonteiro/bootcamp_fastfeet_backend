import * as Yup from 'yup';
import Recipient from '../models/Recipients';

// I began here the store method to recipients. I need
// to finish it.

class RecipientController {
  async store(req, res) {
    // const schema = Yup.object().shape({
    //   name: Yup.string().required(),
    //   street: Yup.string().required(),
    //   number: Yup.number().required(),
    //   complement: Yup.string(),
    //   state: Yup.string()
    //     .uppercase()
    //     .required(),
    //   city: Yup.string().required(),
    //   zip_code: Yup.string()
    //     .required()
    //     .matches(/\d{5}-\d{3}/),
    // });

    return res.json('Resposta ok');
  }
  // preciso do token pra isso rodar
}

export default new RecipientController();
