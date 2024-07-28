const GOOGLE_API_KEY = 'AIzaSyAEzk6bZbwo6HZH5R47j32rXaNRL_SS7w0';

export function getMapPreview({ lat, lng }) {
  const imagePreview = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;

  return imagePreview;
}
