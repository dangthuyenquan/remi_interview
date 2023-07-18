const { default: axios } = require("axios");

async function getVideoYoutubeDetail(videoId) {

    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.GOOGLE_APP_KEY}&part=snippet,contentDetails`;
    const response = await axios.get(url);

    if (response.data.items[0]) {
        return response.data.items[0];
    }

    return null;
}

module.exports = getVideoYoutubeDetail;