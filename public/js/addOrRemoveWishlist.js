// Remember to have axios CDN installed

const addOrRemoveWishlist = (id) => {
    // console.log(id);
    axios.post('/addOrRemoveWishlist', {
        id: id,
        beTheOnlyOne: 'Beatles',
    });
};

const hi = (id) => {
    axios.post();
};

// addOrRemoveWishlist();