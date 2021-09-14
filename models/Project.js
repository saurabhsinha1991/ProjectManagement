const moongoose = require('mongoose');

const ProjectSchema = moongoose.Schema({
    user: {
        type: moongoose.Schema.Types.ObjectId,
        refs: 'user'
    },
    projectName: {
        type: String,
        required: true,
    },
    managerName: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    columns: [
        {
            type: String
        }
    ]
});

module.exports = Project = moongoose.model('project', ProjectSchema);
