import SoccerHistory from "soccer-history";

let sc = new SoccerHistory();
sc.getHistory("epl", new Date("2020/1/11")).then((data) => console.log(data));
sc.getHistory("champs", new Date("2020/1/10")).then((data) => console.log(data));
