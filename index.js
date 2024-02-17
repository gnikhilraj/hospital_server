const express = require("express");

const app = express();

var users = [{
    name : "john" , 
    kidneys : [{
      healthy : true  
    },
{
    healthy : false
}]
}]

app.use(express.json());

app.get("/",function(req,res){

    const johnKidneys = users[0].kidneys;
    const numberofKidneys = johnKidneys.length;
    let numberOfHealthyKidneys = 0;

    for(let i=0; i < numberofKidneys ; i++){
        if(johnKidneys[i].healthy){
            numberOfHealthyKidneys += 1;
        }
    }

    const numberOfUnhealthyKidneys = numberofKidneys - numberOfHealthyKidneys ;
    
    res.json({
        numberofKidneys , 
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })

})

app.post("/",function(req,res){
    const isHealthy = req.body.isHealthy;

    users[0].kidneys.push({
        healthy: isHealthy
    })

    res.json({
        msg:"Done!"
    })
})


app.put("/",function(req,res){
    for(let i = 0 ; i < users[0].kidneys.length ; i++){
        users[0].kidneys[i].healthy = true;
    }
    res.json({});
})


function doWeHaveUnhealthyKidneys(){
    for(let i = 0 ; i < users[0].kidneys.length ; i++){
        if(users[0].kidneys[i].healthy){
        }else{
            return true;
        }
    }
    
}


app.delete("/",function(req,res){
    if(doWeHaveUnhealthyKidneys()){
        const newKidneys = [] ; 
        for(let i = 0 ; i < users[0].kidneys.length ; i++){
            if(users[0].kidneys[i].healthy){
                newKidneys.push({
                    healthy : true
                })
            }
            users[0].kidneys = newKidneys ;
            res.json({
                msg :"Deleted unhealthy kidneys"
            });
        }
    }
    else{
        res.status(411).json({
            msg : "You dont have any bad kidneys"
        })
    }

})



app.listen(3000);