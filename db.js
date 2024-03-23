const Pool =require("pg").Pool;
const pool=new Pool({
    user:"postgres",
    password: "Uwala@99310",
    port: 5432,
    host: "localhost",
    database: "pertodo"

});
module.exports=pool;