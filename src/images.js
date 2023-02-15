const importAll = (r) => r.keys().map(r);
const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));
export default images;

// const imageContext = require.context('./images', false, /\.(jpe?g|png|gif)$/);
// const imagePaths = imageContext.keys();
// const imagePromises = imagePaths.map(path => {
//     return Promise.all([
//         import(`./images/${path}`),
//         import(`image-size-loader!./images/${path}`),
//     ]).then(([image, imageSize]) => {
//         return {
//         path,
//         image,
//         imageSize,
//         };
//     });
// });

// export default imagePromises;
  
