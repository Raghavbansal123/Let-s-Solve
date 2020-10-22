const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const app=express();

const q_kadane="Given an array arr of N integers. Find the contiguous sub-array with maximum sum.";
const q_equilibriumPoint="Given an array A of N positive numbers. The task is to find the position where equilibrium first occurs in the array.Equilibrium position in an array is a position such that the sum of elements before it is equal to the sum of elements after it.";
const q_maxProfit="The cost of stock on each day is given in an array A[] of size N. Find all the days on which you buy and sell the stock so that in between those days your profit is maximum.";
const q_kthSmall="Given an array arr[] and a number K where K is smaller than size of array, the task is to find the Kth smallest element in the given array.It is given that all array elements are distinct.";
 const q_rainMax="Given an array arr[] of N non-negative integers representing height of blocks at index i as Ai where the width of each block is 1. Compute how much water can be trapped in between blocks after raining.";
const q_findMajority="Given an array A of N elements.Find the majority element in the array.A majority element in an array A of size N is an element that appears more than N/2 times in the array.";
let output;
 function kadane(n,arr) {
      var ans = 0;
      var sum = 0;
      for (var i = 0; i < n; i++) {
        ans = Math.max(0, ans + arr[i]);
        sum = Math.max(sum, ans)
      }
      return sum;
    }

    function equilibriumPoint(size,arr) {
      let sum=0;
      let sum1=0;
     for(let i=0;i<size;i++)
     {
       sum+=arr[i];
     }
     for(i=0;i<size;i++)
     {
       sum-=arr[i];
       if(sum1===sum)
       return i;
       sum1+=arr[i];
     }
     return -1;
   }

 function maxProfit(n,prices) {
   let sum=0;
   for(let i=0;i<n-1;i++){
     if(prices[i]<prices[i+1])
     {
       sum+=prices[i+1]-prices[i];
     }
   }
   return sum;
}

function kthSmall(n,arr,k){
  arr.sort(function(a,b){
    if(a<b) return -1;
    if(a>b) return 1;
    return 0;
  });
  return arr[k-1];
}

function rainMax(n,arr){
  let lmax= new Array(n);
  let rmax=new Array(n);
  lmax[0]=arr[0];
  rmax[n-1]=arr[n-1];
  for(let i=1;i<n;i++)
  {
    lmax[i]=Math.max(lmax[i-1],arr[i]);
  }
  for(let i=n-2;i>=0;i--)
  {
    rmax[i]=Math.max(rmax[i+1],arr[i]);
  }
  let sum=0;
  for(let i=0;i<n;i++)
  {
    if((Math.min(lmax[i],rmax[i])-arr[i])>=0)
    {sum+=Math.min(lmax[i],rmax[i])-arr[i];}
  }
  return sum;
}

function findMajority(n,arr){
  let maxCount=0;
  let index=-1;
  for(let i=0;i<n;i++)
  {
    let count=0;
    for(let j=0;j<n;j++){
      if(arr[i]===arr[j])
    {  count++;}
    }
    if(count>maxCount)
    {
      maxCount=count;
      index=i;
    }
  }
  if(maxCount>n/2)
  return arr[index];
  else {
    return -1;
  }}


  app.set('view engine', 'ejs');
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(express.static("public"));
//home route
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/home.html");
});

app.get("/kadane", function(req, res) {
  res.render("ques", {
    question: q_kadane,
    title: "Kadane's Algorithm",
      torender: "kadane"
  });
});

app.get("/equilibrium", function(req, res) {
  res.render("ques", {
    question: q_equilibriumPoint,
    title: "Equilibrium Point",
      torender: "equilibrium"
  });
});

app.get("/stockBuy", function(req, res) {
  res.render("ques", {
    question: q_maxProfit ,
    title: "Stock Buy And Sell",
    torender: "stockBuy"
  });
});

app.get("/kthSmall", function(req, res) {
  res.render("ques", {
    question: q_kthSmall,
    title: "Kth Smallest Element",
      torender: "kthSmall"
  });
});

app.get("/trapping", function(req, res) {
  res.render("ques", {
    question: q_rainMax,
    title: "Trapping Rain Water",
      torender: "trapping"
  });
});

app.get("/majority", function(req, res) {
  res.render("ques", {
    question: q_findMajority,
    title: "Majority Element",
      torender: "majority"
  });
});

//get requests of outputkthSmall
app.get("/outputkadane",function(req,res){
  res.render("output",{
    out:out1,
    title: "Kadane's Algorithm"
  });
})
app.get("/outputequilibrium",function(req,res){
  res.render("output",{
    out:out1,
    title: "Equilibrium Point"
  });
})
app.get("/outputstockBuy",function(req,res){
  res.render("output",{
    out:out1,
    title: "Stock Buy And Sell"
  });
})
app.get("/outputkthSmall",function(req,res){
  res.render("output",{
    out:out1,
    title: "Kth Smallest Element"
  });
})
app.get("/outputtrapping",function(req,res){
  res.render("output",{
    out:out1,
    title: "Trapping Rain Water"
  });
})
app.get("/outputmajority",function(req,res){
  res.render("output",{
    out:out1,
    title: "Majority Element"
  });
})

app.get("/error",function(req,res){
  res.render("error",{
    error: errormessage
  });
});
//post request of all functions
app.post("/kadane",function(req,res){
  let size=req.body.size;
  let text=req.body.values;
  let array=[];
  let j=0;
  let cnt=0;
  while(j<text.length){
    let ten =1;
    let suming=0;
    let c=0;
    while(text[j]!==" "&&j!==text.length){
      if(text[j]==='-')
      {
        j++;
        c=1;
      }
      if (parseInt(text[j]) < 0 || parseInt(text[j]) > 9) {
        errormessage = "kadane";
        res.redirect("/error");
    }
    suming=suming*ten+parseInt(text[j]);
    ten=ten*10;
    j++;
  }
  if(c===1){
  array.push((-1)*suming);}
  else{
  array.push(suming);}
  cnt++;
  if(j<text.length){
    j++;
  }
  else {
    break;
  }}
  if (cnt === parseInt(size)) {
    out1 = kadane(size, array);
    res.redirect("/outputkadane");
  } else {
    errormessage = "kadane";
    res.redirect("/error");
  }

});

app.post("/equilibrium",function(req,res){
  let size=req.body.size;
  let text=req.body.values;
  let array=[];
  let j=0;
  let cnt=0;
  var c=0;
  while(j<text.length){
    let ten =1;
    let suming=0;
    while(text[j]!==" "&&j!==text.length){
      if(text[j]==='-')
      {
        j++;
        c=1;
      }
      if (parseInt(text[j]) < 0 || parseInt(text[j]) > 9) {
        errormessage = "equilibrium";
        res.redirect("/error");
    }
    suming=suming*ten+parseInt(text[j]);
    ten=ten*10;
    j++;
  }
  if(c===1){
  array.push((-1)*suming);}
  else{
  array.push(suming);}
  cnt++;
  if(j<text.length){
    j++;
  }
  else {
    break;
  }}
  if (cnt === parseInt(size)) {
    out1= equilibriumPoint(size,array);
    res.redirect("/outputequilibrium");
  } else {
    errormessage = "equilibrium";
    res.redirect("/error");
  }

});
app.post("/stockBuy",function(req,res){
  let size=req.body.size;
  let text=req.body.values;
  let array=[];
  let j=0;
  let cnt=0;
  while(j<text.length){
    let ten =1;
    let suming=0;
    while(text[j]!==" "&&j!==text.length){
      if (parseInt(text[j]) < 0 || parseInt(text[j]) > 9) {
        errormessage = "stockBuy";
        res.redirect("/error");
    }
    suming=suming*ten+parseInt(text[j]);
    ten=ten*10;
    j++;
  }
  array.push(suming);
  cnt++;
  if(j<text.length){
    j++;
  }
  else {
    break;
  }}
  if (cnt === parseInt(size)) {
    out1 = maxProfit(size, array);
    res.redirect("/outputkthSmall");
  } else {
    errormessage = "stockBuy";
    res.redirect("/error");
  }

});
app.post("/trapping",function(req,res){
  let size=req.body.size;
  let text=req.body.values;
  let array=[];
  let j=0;
  let cnt=0;
  while(j<text.length){
    let ten =1;
    let suming=0;
    while(text[j]!==" "&&j!==text.length){
      if(text[j]==='-')
      {
        errormessage = "trapping";
        res.redirect("/error");
      }
      if (parseInt(text[j]) < 0 || parseInt(text[j]) > 9) {
        errormessage = "trapping";
        res.redirect("/error");
    }
    suming=suming*ten+parseInt(text[j]);
    ten=ten*10;
    j++;
  }
  array.push(suming);
  cnt++;
  if(j<text.length){
    j++;
  }
  else {
    break;
  }}
  if (cnt === parseInt(size)) {
    out1 = rainMax(size, array);
    res.redirect("/outputtrapping");
  } else {
    errormessage = "trapping";
    res.redirect("/error");
  }

});
app.post("/majority",function(req,res){
  let size=req.body.size;
  let text=req.body.values;
  let array=[];
  let j=0;
  let cnt=0;
  let c=0;
  while(j<text.length){
    let ten =1;
    let suming=0;
    while(text[j]!==" "&&j!==text.length){
      if(text[j]==='-')
      {
        j++;
        c=1;
      }
      if (parseInt(text[j]) < 0 || parseInt(text[j]) > 9) {
        errormessage = "majority";
        res.redirect("/error");
    }
    suming=suming*ten+parseInt(text[j]);
    ten=ten*10;
    j++;
  }
  if(c===1){
  array.push((-1)*suming);}
  else{
  array.push(suming);}
  cnt++;
  if(j<text.length){
    j++;
  }
  else {
    break;
  }}
  if (cnt === parseInt(size)) {
    out1 = findMajority(size,array);
    res.redirect("/outputmajority");
  } else {
    errormessage = "majority";
    res.redirect("/error");
  }

});
app.post("/kthSmall",function(req,res){
  let size=req.body.size;
  let text=req.body.values;
  let k_value=req.body.k;
  let array=[];
  let j=0;
  let cnt=0
  let c=0;
  while(j<text.length){
    let ten =1;
    let suming=0;
    while(text[j]!==" "&&j!==text.length){
      if(text[j]==='-')
      {
        c=1;
        j++;
      }
      if (parseInt(text[j]) < 0 || parseInt(text[j]) > 9) {
        errormessage = "kthSmall";
        res.redirect("/error");
    }
    suming=suming*ten+parseInt(text[j]);
    ten=ten*10;
    j++;
  }
  if(c===1){
  array.push((-1)*suming);}
  else{
  array.push(suming);}
  cnt++;
  if(j<text.length){
    j++;
  }
  else {
    break;
  }}
  if (cnt === parseInt(req.body.size)) {
    out1 = kthSmall(size, array,k_value);
    res.redirect("/outputkthSmall");
  } else {
    errormessage = "kthSmall";
    res.redirect("/error");
  }

});


app.listen(3000,function(){
  console.log("Server is working at port 3000");
});
