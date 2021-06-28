import app from './app';

const server = app.listen(app.get('port'), () => {
  console.log(`listening on Port ${app.get('port')}`);
});

export default server;
