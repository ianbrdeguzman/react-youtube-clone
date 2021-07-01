export const filterArr = (arr) => {
    return [
        ...arr
            .reduce((a, c) => {
                a.set(c.id, c);
                return a;
            }, new Map())
            .values(),
    ];
};
