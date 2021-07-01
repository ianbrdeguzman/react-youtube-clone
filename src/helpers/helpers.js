export const filterArr = (arr) => {
    console.log(arr);
    return [
        ...arr
            .reduce((a, c) => {
                a.set(c.id.videoId ? c.id.videoId : c.id, c);
                return a;
            }, new Map())
            .values(),
    ];
};
