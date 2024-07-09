
export const getExample = async (req, res, next) => {
    try {
        res.json();
    } catch (error) {
        next(error);
    }
};