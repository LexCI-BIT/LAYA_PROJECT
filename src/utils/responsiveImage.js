// Big photos have a phone-sized copy next to them (name-sm.webp, 1000px wide). Spread this onto an <img>
// and phones download the small file while large screens keep the full one.
// Pair it with a sizes attribute that says how wide the image is shown, e.g. sizes="100vw".
const smallCopy = (src) => src.replace(/\.(jpe?g|png|webp)(\?.*)?$/i, '-sm.webp');

export const responsiveImage = (src) => ({
  src,
  // Spaces would split the list apart, so the addresses are encoded
  srcSet: `${encodeURI(smallCopy(src))} 1000w, ${encodeURI(src)} 1920w`,
});
