const Video = require('../model/Video');
const axios = require('axios');
const socket = require('../socket');
const getVideoYoutubeDetail = require('../services/videoService');

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

        const videoDetail = await getVideoYoutubeDetail(req.body.videoYoutubeId);

        if (videoDetail) {
            const result = await Video.create({
                shareBy: req.user_id,
                description: videoDetail.snippet.description,
                title: videoDetail.snippet.title,
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

            return res.status(201).json({
                'success': { 'message': 'Video shared successfully.' }, data: {
                    ...result._doc,
                    shareBy: {
                        _id: req.user_id,
                        email: req.user,
                    }
                }
            });
        } else {
            return res.status(400).json({ 'error': { 'message': 'Youtube video not found' } });
        }
    } catch (err) {
        console.error(err);
    }

    return res.status(500).json({ 'error': { 'message': 'Server Error' } });
}

module.exports = {
    getAllVideos,
    createNewVideo,
}