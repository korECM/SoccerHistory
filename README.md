# SoccerHistory
> 해외 축구 경기 결과를 불러와주는 라이브러리입니다.

[![npm version](https://badge.fury.io/js/soccer-history.svg)](https://badge.fury.io/js/soccer-history)
[![Build Status](https://travis-ci.com/korECM/SoccerHistory.svg?branch=master)](https://travis-ci.com/korECM/SoccerHistory)
[![GitHub license](https://img.shields.io/github/license/korECM/SoccerHistory)](https://github.com/korECM/SoccerHistory/blob/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/korECM/SoccerHistory)](https://github.com/korECM/SoccerHistory/stargazers)
[![HitCount](http://hits.dwyl.com/korECM/SoccerHistory.svg)](http://hits.dwyl.com/korECM/SoccerHistory)

여러 해외 축구 리그 경기 결과를 조회할 수 있는 라이브러리입니다!
지원하는 리그는 다음과 같습니다.
* 프리미어리그
* 라리가
* 분데스
* 세리에 A
* 리그 1
* 챔피언스리그
* 유로파리그
* FA컵
* EFL컵
* 코파델레이
> 2010년~의 경기 결과만 지원합니다

## 사용 예제

```javascript
import SoccerHistory from "soccer-history";

let sc = new SoccerHistory();
sc.getHistory("epl", new Date("2020/1/11")).then((data) => console.log(data));
/*
[ { homeTeamName: '셰필드',
    awayTeamName: '웨스트햄',
    homeTeamScore: '1',
    awayTeamScore: '0',
    gameDate: '2020-01-11',
    state: '종료' },
  { homeTeamName: '크리스탈 팰리스',
    awayTeamName: '아스널',
    homeTeamScore: '1',
    awayTeamScore: '1',
    gameDate: '2020-01-11',
    state: '종료' } ]
*/

sc.getHistory("champs", new Date("2020/1/10")).then((data) => console.log(data));
/* [] */

```

## 개발 환경 설정

```sh
npm install soccer-history
```
```sh
or
yarn add soccer-history
```

## Test
```sh
npm run test
```
or
```sh
yarn test
```

## 사용 방법

### `class SoccerHistory`

#### `getHistory(leagueType: League, date: Date)`
리그와 날짜를 넘겨주면 해당 경기 결과를 불러옵니다.
> 2010~현재까지의 경기를 불러올 수 있습니다

Ex)
```sh
[{ homeTeamName: '크리스탈 팰리스',
    awayTeamName: '아스널',
    homeTeamScore: '1',
    awayTeamScore: '1',
    gameDate: '2020-01-11',
    state: '종료' }]
```
만약 해당 날에 경기가 없다면 `빈 배열([])`을 반환합니다
### League
|리그 이름|League|
|:---:|:---:|
|프리미어리그|epl|
|라리가|primera|
|분데스|bundesliga|
|세리에 A|seria|
|리그 1|ligue1|
|챔피언스리그|champs|
|유로파리그|europa|
|FA컵|facup|
|EFL컵|carlingcup|
|코파델레이|copadelrey|

## 업데이트 내역
* 1.1.4
  예제 추가
* 1.1.3
  test 폴더 이동
* 1.1.2
  @types 추가
* 1.1.1
  의존성 잘못 설정된 부분 수정
* 1.0.0
  초기 버전 배포(이전 버전에서 모듈 export 제대로 안되던 문제 수정)

## 정보

MIT 라이센스를 준수하며 ``LICENSE``에서 자세한 정보를 확인할 수 있습니다.
