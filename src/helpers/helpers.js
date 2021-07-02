export const filterArr = (arr) => {
    return [
        ...arr
            .reduce((a, c) => {
                a.set(c.id.videoId ? c.id.videoId : c.id, c);
                return a;
            }, new Map())
            .values(),
    ];
};

export const filterVideos = (arr) => {
    return [
        ...arr
            .reduce((a, c) => {
                a.set(c.etag, c);
                return a;
            }, new Map())
            .values(),
    ];
};
