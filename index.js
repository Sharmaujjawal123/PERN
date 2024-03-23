const express =require("express");
const pool=require("./db");
const cors=require("cors");
const app = express();
app.use(cors());
app.use(express.json());
// INSER DATA
app.post("/todos",async(req,res)=>{
    // console.log(req.body);
    const {description}=req.body;
    const newtodo=await pool.query('INSERT INTO todo (description) VALUES($1)',[description]);
    res.json(newtodo.rows[0]);
});
//get all todos
app.get("/todos",async (req,res)=>{
    try{
        const t = await pool.query("SELECT * FROM todo");
        res.json(t.rows);
    }
    catch(e){
        console.log(e);
    }
    
})
// FETCH DATA
app.get("/todos/:id",async(req,res)=>{
const {id} = req.params;
try{
  let data=await pool.query("SELECT * FROM todo WHERE todo_id=$1", [(id)]);
   res.json(data.rows)
}
catch(err){

}
})

//UPDATE OPERATION
app.put("/todos/:id", async(req,res)=>{
    try{
        const { id }=req.params;
        const {description}=req.body;
        const updatet=await pool.query("UPDATE todo SET description=$1 where todo_id=$2",[description,id]);
        res.json("updated");
    }
    catch(err){
        console.log(err);
    }
})

// DELETE OPERATION

app.delete('/todos/:id', async (req,res)=>{
    const {id}=req.params;
    try{
        const deleter=await pool.query("DELETE FROM todo WHERE todo_id=$1",[1]);
        res.json("deleted succses");
    }
    catch(err){
        console.log(err);
    }
})

app.listen(5000,()=>{
    console.log("Server is running at http://localhost:5000/");
});
