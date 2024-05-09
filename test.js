//console.log("Hello world")

//     let x = 10
// x += 20

// let num = 10

// if (num < 10) {
    
// }
// console.log(x)


// let x = 10
// let y = 20
// let max = Math.max(x,y);
// let min = Math.min(x,y);
// if (x != y) {
//     console.log(max + " is max number.")
//     console.log(min + " is min number.")
// }
// else {
//     console.log("number is equal")
// }


// let x = 10
// let y = 20
// let max = Math.max(x,y);
// let min = Math.min(x,y);
// if (x > y) {
//     max = "x"
//     min = "y"
//     console.log(max + " is max number.")
//     console.log(min + " is min number.")
// }
// else if (x < y) {
//     max = "y"
//     min = "x"
//     console.log(max + " is max number.")
//     console.log(min + " is min number.")
// }
// else {
//     console.log("number is equal")
// }


// let x = 20
// let y = 30

// if (x < y) {
//     console.log("y is max number.\nx is max number.")
// }
// else if (x > y) {
//     console.log("x is max number.\ny is max number.")
// }
// else {
//     console.log("number is equal")
// }


// // <IMPORT & EXPORT>
// const { fullname } = (fname, sname) => {
//     return 'นางสาว' + fname + '' + sname
// }

// module.exports = {
//     fullname
// }

// let time1 = () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(console.log('time1'))
//         }, 1000);
//     })
// }

// let time2 = () => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             reject(console.log('time2'))
//         }, 2000);
//     })
// }


// let show = async () => {
//     try {
//         await time2()
//         await time1()
//     } catch (error) {
//         console.log(error)
//     }
// }

// show()