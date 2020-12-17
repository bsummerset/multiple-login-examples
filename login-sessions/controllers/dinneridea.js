const { layout } = require('../utils')
const { DinnerIdea } = require('../models');

const showForm = (req, res) => {
    res.render('dinneridea/form', {
        locals: {
            title: 'Add Dinner Idea'
        },
        ...layout
    });
};

const processForm = async (req, res) => {
    const { title } = req.body;
    const { id } = req.session.user;
    
    if (title && id) {
        const dinneridea = await DinnerIdea.create({
            title,
            isComplete: false,
            userId: id
        });
        console.log(DinnerIdea);
        res.redirect(`${req.baseUrl}/`)
    } else {
        res.redirect(req.url);
    }
    
};

const list = async (req, res) => {
    const { id } = req.session.user;
    if (id) {
        // Show this user's Todos
        const dinneridea = await DinnerIdea.findAll({
            where: {
                userId: dinner_id // match the logged in user
            }
        });
        res.render('dinneridea/list', {
            locals: {
                dinneridea
            },
            ...layout
        })
    } else {
        // redirect
        res.redirect('/');
    }
};

module.exports = {
    showForm,
    processForm,
    list
};