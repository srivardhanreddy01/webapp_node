require('dotenv').config()  
const express=require('express')
const app=express()
const Sequelize = require('sequelize');
 
const PORT=process.env.PORT

const  sequelize = new Sequelize(
   process.env.DB_NAME,
   process.env.DB_USERNAME,
   process.env.DB_PASSWORD,
	{
	  host: process.env.DB_HOST,
	  dialect: 'mysql'
	}
  );

  const s="1121"

app.use(express.json())
 

app.get('/healthz',async(req,res)=>{
   try {
	   await sequelize.authenticate();
	    res.set('Cache-Control','no-cache')
	   res.status(200).json()
	   
	   console.log("Connected to database")
	    
	   
   } catch (error) {
	  
	   res.status(503).json()
     console.log("Disconnected")

	   
   }
   
}) 

 
app.all('*', (req, res) => {
  res.set('Cache-Control','no-cache')
   res.status(405).json();
 });

 
app.listen(PORT,()=>{
		   console.log(`Node api app is running on ${PORT}`)
		})
