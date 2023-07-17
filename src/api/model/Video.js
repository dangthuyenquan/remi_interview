const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    videoYoutubeId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    shareBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('Video', videoSchema);