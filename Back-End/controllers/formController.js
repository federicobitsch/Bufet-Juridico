const { Form } = require('../models');

const formController = {
    submitForm: async (req, res) => {
        try {
            // Aquí puedes acceder a los datos del formulario desde req.body
            const { nombre, correo, mensaje } = req.body;

            // Aquí puedes validar los datos del formulario

            // Aquí puedes guardar los datos del formulario en la base de datos
            const newForm = new Form({
                nombre,
                correo,
                mensaje
            });
            await newForm.save();

            res.status(200).json({ message: 'Formulario enviado correctamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al procesar el formulario' });
        }
    }
};

module.exports = formController;
