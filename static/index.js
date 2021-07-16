          
let figure = document.getElementById("figure")
let div = figure.children[0]
// console.log(div)
let imagesLength = (div.children.length)-1
// console.log(imagesLength)


// updated loop  0,1,2,3,4,5,4,3,2,1,0,1,2...
function loop(){
    let x=0
    let isRising = true
setInterval(() => {
    if(x< imagesLength && isRising==true){
        x++     
    }
    else{
        isRising=false
        x--
        if(x==0){
            isRising=true
        }        
    }
    let imageWidth = -20.625
    imageWidth= imageWidth*x
    div.style.transform=`translateX(${imageWidth}rem)`
    // console.log(x)

}, 4000);
}

loop()



// normal loop  0,1,2,3,4,5,0,1,2,3,4,5,0,1...

// let x= -1;
// setInterval(() => {
//     if(x>4){
//         x=0
//     }
//     else{
//         ++x
//     }           
//     // console.log(x)
//     let i = -20.625
//     i= i*x
//     div.style.transform=`translateX(${i}rem)`
// }, 2000);

console.log("Thank You for Visiting the Website")



