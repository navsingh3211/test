import express from 'express';
import router from './route.js';

const app = express();
app.use(router);




app.listen(8085,()=>{
  console.log(`Server started on 8085 port`);
})