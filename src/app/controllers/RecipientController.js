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

    const recipientName = Recipient.findOne({ where: { name: req.body.name } });

    if (recipientName) {
      return res
        .status(401)
        .json({ error: 'There is already a Recipient with this name.' });
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

    /**
     * Check if recipient called exists
     */

    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient does not exist.' });
    }

    const {
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    } = await recipient.update(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    });
  }
}

export default new RecipientController();
