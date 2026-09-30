import EventEmmiter from "node:events";
const myEmmiter = new EventEmmiter();
myEmmiter.on("greet", (teacher)=>{
    console.log(`class started by ${teacher}`);
});
myEmmiter.on("GameOn", (Gamer)=>{
    console.log(`Game initiated by gamer ${Gamer}`);
});
myEmmiter.on("exit", (teacher)=>{
    console.log(`class finished by ${teacher}`);
});

myEmmiter.emit("greet", "Aman")
myEmmiter.emit("GameOn", "Aman")
myEmmiter.emit("exit", "Aman kumar")
