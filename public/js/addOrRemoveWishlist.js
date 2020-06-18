// Remember to have axios CDN installed

const addOrRemoveWishlist = (id) => {
    console.log(id);
    axios.post('/addOrRemoveWishlist', {
        beTheOnlyOne: 'Beatles',
    });
};

// addOrRemoveWishlist();