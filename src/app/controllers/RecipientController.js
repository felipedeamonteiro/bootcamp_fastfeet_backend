import * as Yup from 'yup';
import Recipient from '../models/Recipients';
import User from '../models/User';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string()
        .uppercase()
        .required(),
      city: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    /**
     * zipcode Validation in front: .matches(/\d{5}-\d{3}/),
     */
    /**
     * Check if user is admin
     */
    const currentUser = await User.findByPk(req.userId);

    if (!currentUser.admin) {
      return res.status(401).json({
        error:
          'You do not have the rights to do this. Contact the administrator.',
      });
    }

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const {
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    } = await Recipient.create(req.body);

    return res.json({
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.number(),
      complement: Yup.string(),
      state: Yup.string().uppercase(),
      city: Yup.string(),
      zip_code: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed.' });
    }

    const {
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    } = await Recipient.create(req.body);

    const destiny = await Recipient.findByPk();
  }
}

export default new RecipientController();
