import { checkDate } from "./Utils";
import { League, SoccerInformation } from "./Models";
import request from "request-promise";

class SoccerHistory {
  constructor() {}
  public async getHistory(
    leagueType: League,
    date: string | number,
    month?: string | number,
    day?: string | number
  ) {
    let league: League = leagueType;
    let inDate: string;

    if (date && month && day) {
      inDate = this.mergeDate(date, month, day);
    } else if (typeof date === "string") {
      if (checkDate(date)) {
        inDate = date;
        if (parseInt(inDate.substr(0, 4)) < 2010) {
          throw new Error("2010년 이전 정보는 조회할 수 없습니다");
        }
      } else {
        throw new Error("유효하지 않은 날짜 형식");
      }
    }
    await this.callAPI(league, inDate!);
  }

  private async callAPI(league: League, date: string) {
    let url = `https://sports.news.naver.com/wfootball/schedule/scoreboard.nhn?date=${date}&year=2015&month=02&category=${league}`;
    let options = {
      method: "GET",
      url: url,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36"
      }
    };
    try {
      await request(options, (err, response) => {
        let rawData: any[] = JSON.parse(response.body).scoreboardList;
        let soccerData: SoccerInformation[] = [];
        rawData.map(data => {
          soccerData.push({
            homeTeamName: data.homeTeamName,
            awayTeamName: data.awayTeamName,
            homeTeamScore: data.homeTeamScore,
            awayTeamScore: data.awayTeamScore,
            gameDate: data.gameStartDate,
            state: data.state
          });
        });
        console.log(soccerData);
      });
    } catch (error) {
      console.error(error);
    }
  }

  private mergeDate(
    year: string | number,
    month: string | number,
    day: string | number
  ): string {
    let inYear: number, inMonth: number, inDay: number;
    if (typeof year === "string") inYear = parseInt(year);
    else inYear = year;
    if (inYear < 2010) {
      throw new Error("2010년 이전 정보는 조회할 수 없습니다");
    }
    if (typeof month === "string") inMonth = parseInt(month);
    else inMonth = month;
    if (typeof day === "string") inDay = parseInt(day);
    else inDay = day;
    return new Date(inYear, inMonth - 1, inDay)
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "");
  }
}

let test = new SoccerHistory();
test.getHistory("epl", "20200502");

export default SoccerHistory;
