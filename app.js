
/*jshint browser:true */

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
var items=[];
var workItems=[];
let flag=0;
// bn-
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){     
 let toDay= new Date;

 let options = {
     weekday: 'long',
     year: 'numeric',
     month: 'long', 
     day: 'numeric'
    };
    
 let day = toDay.toLocaleDateString('bn-IN',options);

    res.render("lists" ,{
        listTitel:day,
        listItems:items,
        flag:flag
    });
});

app.post("/",function(req,res){

    let item = req.body.listitem;
    if(req.body.list=== "Work")
    {
        workItems.push(item);
        res.redirect("/work");
    }
    else{
    items.push(item);
    res.redirect("/");
    }    

});

app.get("/work" , function(req,res){
    let titel="Work";
    res.render( "lists",{
        listTitel:titel,
        listItems:workItems,
    });
});

app.post("/complete",function(req,res){
    let comitem= req.body.cpltItem;
    let inxItem = items.indexOf(comitem);
    items[inxItem]=comitem+"(done)";
    res.redirect("/");
});

app.post("/deleteindi",function(req,res){

    let deletitem= req.body.delItem;
    console.log(deletitem);
    let indexItem=items.indexOf(deletitem);
    console.log(indexItem);
    for( var i = 0; i < items.length; i++){ 
                                   
        if ( items[i] === deletitem) { 
            items.splice(i, 1); 
            i--; 
        }
    }

    res.redirect("/");
});


app.post("/delete",function(req,res){
    
   flag=1;
    while(items.length > 0) {
        items.pop();
    }
    res.redirect("/");
});

app.listen(3500,function(){
    console.log("your server is running on port 3500");
});