let datas;

module.exports = {
    set : data => {
         datas = {
             data:data
        }
        return datas;
    },

    get : () => {
        if(!datas) {
            throw new Error('data not Set');
        }
        return datas;
    } 
}