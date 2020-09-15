# bod-api

[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)

## Interfaces
# Interfaces
## User
```ts
interface User {
  name: string;
}
```

```ts
interface Athlete extends User {
  weightUnit: string; // 'lbs'
}
```

## Trainer
```ts
interface Exercise {
  name: string; // tuck planche hold
  push: boolean; // true
  pull: boolean; // false
  intensities: string[]; // ['straddle', 'full']
}
```

```ts
interface SessionItem {
  exercise: Exercise;
  reps: number; // 8
  AMRAP: boolean; // true
  sets: number; // 3
  weight: number; // 10
  weightUnit: string; // 'lbs'
  intensity: string; // 'tuck to straddle'
  tempo: string; // '5s eccentric, 2s hold at bottom'
  weightUnit: string; // 'lbs'
  leftRight: boolean; // false
}
```

```ts
interface Session {
  name: string; // 'PULL A'
  items: SessionItem[]; 
  order: number; // 1 (refers to placement with in a Week)
}
```

```ts
interface Week {
  number: number; // 6
  sessions: Session[];
}
```

```ts
interface Program {
  name: string; // 'Program 1'
  weeks: Week[];
}
```

```ts
interface PlaylistFeedback {
  playlist: Playlist;
  notes: string; // 'awesome job, your first HSPU and it was strong!'
}
```


## Athlete
```ts
interface SessionItemStatistic {
  sessionItem: number; // SessionItem
  setStatistics: number[], // SetStatistic[]
  rpe: number; // 8
  notes: string; // 'not at my full strength'
}
```

```ts
interface SetStatistic {
  set: number; // 1
  reps: number; // 8
  weight: number; // 35
  weightUnit: string; // lbs
}
```

```ts
interface SessionStatistic {
  session: number; // Session
  sessionItemStatistics: number[]; // SessionItemStatistic[]
}
```

```ts
interface WeekStatistic {
  week: number; // Week
  sessionStatistics: number[]; // SessionStatistic[]
}
```

```ts
interface ProgramStatistic {
  program: number; // Program
  weekStatistics: number[]; // WeekStatistic[]
}
```

```ts
interface Playlist {
  url: string; // https://www.youtube.com/playlist?list=PLu0SKb668nMfYcyc_Mpv1tcywXh2AJapj
  week: number; // Week
}
```
