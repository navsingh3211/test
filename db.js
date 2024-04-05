import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'nodejs-technical-test.cm30rlobuoic.ap-southeast-1.rds.amazonaws.com',
  user: 'admin',
  password: 'NoTeDeSt^C10.6?SxwY882}',
  database: 'conqtvms_dev'
});

const dbConnection =connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database as id ' + connection.threadId);

  // Perform database operations here
});

export const getProductDetails = async (req,res)=>{
  try{
    const currentPage = parseInt(req.query.currentPage) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const orderBy = req.query.orderBy;
    const orderDir = req.query.orderDir || 'desc';

    const offset = (currentPage -1 )*pageSize;
    let totalcount;
    // console.log(currentPage);

    let totalData = connection.query(`SELECT count(*) as total_count FROM ProductV2 as prd 
    LEFT OUTER JOIN Categories as ct ON ct.categoryId=prd.categoryId`,(error,totalCountres)=>{
      totalcount= totalCountres[0].total_count;
    });
    // console.log(totalCount,'totalCount');
    // process.exit(0)
    let query = 
    `
    SELECT * FROM ProductV2 as prd 
    LEFT OUTER JOIN Categories as ct ON ct.categoryId=prd.categoryId
    LIMIT ${pageSize} OFFSET ${offset}
    `;
    
    connection.query(query,(error,result)=>{
      if(error){
        console.log(error);
      }else{
        console.log(result);
        let data = {
          'currentPage':currentPage,
          'pageSize':pageSize,
          'totalcount':totalcount,
          'result':result
        }
        res.status(200).json({
          message:"data found",
          data:data
        });
      }
    });
    connection.end()
  }catch(error){
    console.log(error);
  }
}


export default dbConnection ;