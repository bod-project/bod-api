# bod-api

[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)

# Interfaces
## User
```ts
interface User {
  name: string;
}
```

## Primary
```ts
interface Exercise {
  id?: number;
  name: string; // tuck planche hold
  push?: boolean; // true
  pull?: boolean; // false
  intensities: string[];
  leftRight?: boolean;
}

```

```
interface SessionItem {
  id?: number;
  exerciseId: number;
  sessionId: number;
  reps: number; // 8
  AMRAP: boolean; // true
  leftRight?: boolean; // false
  sets: number; // 3
  weight: number; // '10 kilos', '25 lbs'
  weightUnit: string;
  intensity: string; // 'tuck to straddle'
  tempo: string; // '5s eccentric, 2s hold at bottom'
}
```


```ts
interface Session {
  id?: number;
  weekId: number;
  name: string; // 'PULL A'
  order: number; // 1 (refers to placement with in a Week)
}
```

```ts
interface Week {
  id?: number;
  programId: number;
  number: number; // 6
}

```

```ts
interface Program {
  id?: number;
  name: string; // 'Program 1'
}
```

```ts
interface PlaylistFeedback {
  playlist: Playlist;
  notes: string; // 'awesome job, your first HSPU and it was strong!'
}
```


## Statistics
```ts
interface SessionItemStatistic {
  id?: number;
  sessionItemId?: number; // SessionItem
  setStatistics?: number[], // SetStatistic[]
  rpe: number; // 8
  notes: string; // 'not at my full strength'
}
```

```ts
interface SetStatistic {
  id?: number;
  set: number; // 1
  reps: number; // 8
  weight: number; // 35
  sessionItemStatisticId?: number;
}
```

```ts
interface SessionStatistic {
  id?: number;
  session: number; // Session
  sessionItemStatistics?: number[]; // SessionItemStatistic[]
}
```

```ts
interface WeekStatistic {
  id?: number;
  week: number; // Week
  sessionStatistics: number[]; // SessionStatistic[]
}
```

```ts
interface ProgramStatistic {
  id?: number;
  program: number; // Program
  weekStatistics: number[]; // WeekStatistic[]
}
```

```ts
interface Playlist {
  id?: number;
  url: string; // https://www.youtube.com/playlist?list=PLu0SKb668nMfYcyc_Mpv1tcywXh2AJapj
  week: number; // Week
}
```

```
interface MaxAttemptItem {
  id?: number;
  exercise: number;
  reps: number;
  bestAttempt: boolean; // Percieved potential for better try
  leftRight?: boolean;
  weight: number;
  intensity: string;
}
```
