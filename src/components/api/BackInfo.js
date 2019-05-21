export function getBackUrl() {
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'production') {
    console.log('hola');
    return 'https://boiling-brushlands-27343.herokuapp.com';
  } else {
    console.log('hola2');
    return 'http://localhost:3001';
  }
}