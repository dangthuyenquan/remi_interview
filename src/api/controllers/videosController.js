const Video = require('../model/Video');
const axios = require('axios');
const socket = require('../socket');

const getAllVideos = async (req, res) => {

    const pageSize = parseInt(req?.query?.pageSize ?? 5); // Number of documents per page
    const currentPage = parseInt(req?.query?.currentPage ?? 1); // Current page number

    // Calculate the number of documents to skip
    const skipCount = (currentPage - 1) * pageSize;

    // Query the database using skip() and limit() methods
    Video.countDocuments({}, (err, totalCount) => {
        if (err) {
            console.error(err);
            // Handle error
        } else {
            // Calculate the total number of pages
            const totalPages = Math.ceil(totalCount / pageSize);
            console.log(`total page ${totalPages}`)
            // Query the paginated documents using skip() and limit() methods
            Video.find()
                .skip(skipCount)
                .populate('shareBy', '_id email')
                .limit(pageSize)
                .sort({ 'createdAt': -1 })
                .exec((err, documents) => {
                    if (err) {
                        console.error(err);
                        // Handle error
                    } else {
                        // Process the paginated documents and total pages

                        if (!documents) return res.status(204).json({ 'error': { 'message': 'No video found.' } });
                        res.json({
                            pageSize: pageSize,
                            currentPage: currentPage,
                            totalPages: totalPages,
                            data: documents,
                        });

                        // Continue with your logic
                    }
                });
        }
    });
}

const createNewVideo = async (req, res) => {
    if (!req?.body?.videoYoutubeId) {
        return res.status(400).json({ 'error': { 'message': 'Video Youtube Id are required' } });
    }

    try {

        const url = `https://www.googleapis.com/youtube/v3/videos?id=${req.body.videoYoutubeId}&key=AIzaSyBqg1hsHOtAcQTORDyxhvKrHaViJc9cFIw&part=snippet,contentDetails`;
        const response = await axios.get(url);
        if (response.data.items[0]) {
            const result = await Video.create({
                shareBy: req.user_id,
                description: response.data.items[0].snippet.description,
                title: response.data.items[0].snippet.title,
                videoYoutubeId: req.body.videoYoutubeId,
                createdAt: Date.now(),
            });

            const io = socket.getIO();

            // Emit an event to all connected clients
            io.emit('share-video-channel', {
                video: {
                    ...result._doc,
                    shareBy: {
                        _id: req.user_id,
                        email: req.user,
                    }
                },

            });

            res.status(201).json({
                'success': { 'message': 'Video shared successfully.' }, data: {
                    ...result,
                    shareBy: {
                        _id: req.user_id,
                        email: req.user,
                    }
                }
            });
        } else {
            res.status(400).json({ 'error': { 'message': 'Youtube video not found' } });
        }
    } catch (err) {
        console.error(err);
    }

}

const updateVideo = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'error': { 'message': 'ID parameter is required.' } });
    }

    const video = await Video.findOne({ _id: req.body.id }).exec();
    if (!video) {
        return res.status(204).json({ 'error': { "message": `No video matches ID ${req.body.id}.` } });
    }
    if (req.body?.firstname) video.firstname = req.body.firstname;
    if (req.body?.lastname) video.lastname = req.body.lastname;
    const result = await video.save();
    res.json(result);
}

const deleteVideo = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'error': { 'message': 'Video ID required.' } });

    const video = await Video.findOne({ _id: req.body.id }).exec();
    if (!video) {
        return res.status(204).json({ 'error': { "message": `No video matches ID ${req.body.id}.` } });
    }
    const result = await video.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

const getVideo = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'error': { 'message': 'Video ID required.' } });

    const video = await Video.findOne({ _id: req.params.id }).exec();
    if (!video) {
        return res.status(204).json({ 'error': { "message": `No video matches ID ${req.params.id}.` } });
    }
    res.json(video);
}

module.exports = {
    getAllVideos,
    createNewVideo,
    updateVideo,
    deleteVideo,
    getVideo
}