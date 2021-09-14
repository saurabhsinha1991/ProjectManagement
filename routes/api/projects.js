const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Project = require('../../models/Project');
const User = require('../../models/User');

const ERROR_MSG = Object.assign({
    PROJECT_NAME: 'Project Name is required',
    MANAGER_NAME: 'Manager Name is required',
    START_DATE: 'Start Date is required',
    END_DATE: 'End Date is required', 
    COLUMNS: 'Enter columns',
    ALREADY_REGISTERED: 'Project already exists'
});

// @route    GET api/project
// @desc     Get User projects
// @access   Private
router.get('/', auth, async (req, res) => {
    try {        
        const projects = await Project.find({ user: req.user.id });
        return res.status(200).json(projects);
    } catch(err) {
        return res.status(500).send('Server Error');
    }
});

// @route    GET api/project
// @desc     Get Single project
// @access   Private
router.get('/:id', auth, async (req, res) => {
    try {
        console.log('id>>', req.params.id);
        const project = await Project.findById(req.params.id);
        return res.status(200).json(project);
    } catch(err) {
        return res.status(500).send('Server Error');
    }
});

// @route    POST api/project
// @desc     Add project
// @access   Private
router.post('/add', [auth, [
    check('projectName', ERROR_MSG.PROJECT_NAME).not().isEmpty(),
    check('managerName', ERROR_MSG.MANAGER_NAME).not().isEmpty(),
    check('startDate', ERROR_MSG.START_DATE).not().isEmpty(),
    check('endDate', ERROR_MSG.END_DATE).not().isEmpty(),
    check('columns', ERROR_MSG.COLUMNS).not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    const { projectName, managerName, startDate, endDate, columns } = req.body;

    try {
        let project = await Project.findOne({ projectName, user: req.user.id });

        if (project) {
            return res.status(400).json({ error: [{ msg: ERROR_MSG.ALREADY_REGISTERED }]});
        }

        // const user = await User.findById(req.user.id).select('-password');

        project = new Project({
            user: req.user.id,
            projectName,
            managerName,
            startDate,
            endDate,
            columns,
        });
        
        const newProject = await project.save();

        return res.status(200).json(newProject);
    } catch(err) {
        return res.status(500).send('Server Error');
    }
});

router.post('/delete', [auth, [
    check('id', 'Id not present').not().isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }

    const { id } = req.body;

    await Project.remove({ _id: id });

    const projects = await Project.find({ user: req.user.id });
    return res.status(200).json(projects);
});

module.exports = router;
