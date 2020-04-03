import { checkDate } from "./Utils";
import { League, LeagueArray, SoccerInformation } from "./Models";
import request from "request-promise";

class SoccerHistory {
  constructor(api: any) {
    if (api) this.callAPI = api;
  }
  public async getHistory(leagueType: League, date: Date) {
    try {
      if (!leagueType || !LeagueArray.includes(leagueType))
        throw new Error("리그 타입이 적절하지 않습니다");
      if(!date) throw new Error("특정 날짜를 Date 객체로 전달해야 합니다")
      if (!this.checkYearValid(date))
        throw new Error("2010년 이전 정보는 조회할 수 없습니다");
      let inDate: string = this.getDateStringFromDate(date);
      let rawData: any[] = await this.callAPI(leagueType, inDate);
      return this.parseData(rawData);
    } catch (error) {
      throw error;
    }
  }

  private getDateStringFromDate(date: Date): string {
    if (date instanceof Date) {
      let dateString = date
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "");
      if (checkDate(dateString)) {
        return dateString;
      }
    }
    throw new Error("유효하지 않은 날짜 형식");
  }

  private checkYearValid(date: Date) {
    if (date.getFullYear() < 2010) {
      return false;
    }
    return true;
  }

  private parseData(rawData: any[]) {
    let soccerData: SoccerInformation[] = [];
    rawData.map((data: any) => {
      soccerData.push({
        homeTeamName: data.homeTeamName,
        awayTeamName: data.awayTeamName,
        homeTeamScore: data.homeTeamScore,
        awayTeamScore: data.awayTeamScore,
        gameDate: data.gameStartDate,
        state: data.state
      });
    });
    return soccerData;
  }

  private async callAPI(league: League, date: string) {
    let options = {
      method: "GET",
      url: `https://sports.news.naver.com/wfootball/schedule/scoreboard.nhn?date=${date}&year=2015&month=02&category=${league}`,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36"
      }
    };
    try {
      let data: object[] | null = null;
      await request(options, (err: any, response: any) => {
        data = JSON.parse(response.body).scoreboardList;
      });
      return data || [];
    } catch (error) {
      throw error;
    }
  }

  // private mergeDate(
  //   year: string | number,
  //   month: string | number,
  //   day: string | number
  // ): string {
  //   let inYear: number, inMonth: number, inDay: number;
  //   inYear = this.stringToNumber(year);
  //   inMonth = this.stringToNumber(month);
  //   inDay = this.stringToNumber(day);

  //   return new Date(inYear, inMonth - 1, inDay)
  //     .toISOString()
  //     .slice(0, 10)
  //     .replace(/-/g, "");
  // }
  // private stringToNumber(input: string | number) {
  //   if (typeof input === "string") return parseInt(input);
  //   return input;
  // }
}

// new SoccerHistory().getHistory("epl", "20200309");

export default SoccerHistory;
