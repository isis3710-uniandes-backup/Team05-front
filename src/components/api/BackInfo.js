export function getBackUrl() {
  if (process.env.NODE_ENV === 'production') {
    return 'https://boiling-brushlands-27343.herokuapp.com';
  } else {
    return 'http://localhost:3001';
  }
}