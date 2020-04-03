import SoccerHistory from "../index";
import requestPromise from "request-promise";
let sc: SoccerHistory;

let testData = [
  {
    homeTeamName: "맨유",
    awayTeamName: "맨시티",
    homeTeamScore: "2",
    awayTeamScore: "0",
    gameStartDate: "2020-03-09",
    state: "종료",
  },
  {
    homeTeamName: "A",
    awayTeamName: "B",
    homeTeamScore: "2",
    awayTeamScore: "0",
    gameStartDate: "2020-03-12",
    state: "종료",
  },
];
let api: jest.Mock<any, any>;
beforeEach(() => {
  api = jest.fn().mockResolvedValue(testData);
  sc = new SoccerHistory(api);
});

describe("SoccerHistory 클래스는", () => {
  describe("getHistory 함수는", () => {
    it("잘못된 입력이 주어지면 에러를 반환한다", async () => {
      let errorArrayData = [
        [],
        ["epl"],
        ["epl", null],
        ["epl", undefined],
        ["epls", new Date()],
      ];
      errorArrayData.map(async (wrongData) => {
        await expect(
          sc.getHistory(wrongData[0] as any, wrongData[1] as any)
        ).rejects.toBeTruthy();
      });
    });
    it("2011년 이전 요청시 에러 발생한다", async () => {
      await expect(
        sc.getHistory("epl", new Date(2000, 5, 3))
      ).rejects.toBeTruthy();
    });
    it("존재하지 않는 리그 요청시 에러 발생한다", async () => {});
    it("제대로 된 입력이 주어지면 제대로 된 대답을 배열 속 객체 형태로 반환한다", async () => {
      let resultData = [
        {
          homeTeamName: "맨유",
          awayTeamName: "맨시티",
          homeTeamScore: "2",
          awayTeamScore: "0",
          gameDate: "2020-03-09",
          state: "종료",
        },
        {
          homeTeamName: "A",
          awayTeamName: "B",
          homeTeamScore: "2",
          awayTeamScore: "0",
          gameDate: "2020-03-12",
          state: "종료",
        },
      ];
      await expect(sc.getHistory("epl", new Date())).resolves.toEqual(
        resultData
      );
    });
  });
});
