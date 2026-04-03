# claude-digi-buddy

Claude Code 사용량에 따라 성장하고 진화하는 디지몬 가상 펫 status line 플러그인입니다.

```
──────────────────────────────────────
🔥 WarGreymon ◕‿◕           ♥85 🍖45
⠀⢠⡀⠀⠠⣀⣀⣀⡀⠀⠀⣀⠴⠀⠀  EXP [████████░░] 89% ⬆ Mega
⠀⠀⠋⣶⢶⣫⣻⣿⡧⢔⣤⡞⠁⠀⠀
⢀⠀⢸⣀⣶⢿⣟⠻⣷⣤⢯⢮⡠⡀⠀
⢘⡎⢫⢎⣷⣻⣯⣿⣯⣦⠾⢟⡁⣇⠀
⠘⡰⣵⡿⡿⠿⣿⡿⣮⢷⢀⡇⣿⣿⠋
⠀⢣⣧⡟⠰⣶⡿⡑⡄⢧⢐⠵⢪⠇⠀
⠀⢸⡟⣶⢠⡿⠁⠤⢛⣆⢼⣽⡏⠀⠀
⠀⠀⢃⣭⡾⣤⡄⡦⢔⣯⣿⠟⠀⠀⠀
⠀⠀⠀⠻⣶⣿⠏⠙⣷⣿⡇⠀⠀⠀⠀
⠀⠀⠀⢤⣿⢿⠇⠀⠳⠿⠓⣀⠀⠀⠀
⠀⡚⠩⣓⡞⠫⠄⠀⠙⣚⠝⣸⢢⡀⠀
```

## 소개

claude-digi-buddy는 Claude Code 터미널에 디지몬 파트너를 추가합니다. 디지몬은 알에서 시작해 코딩 활동에 따라 7단계(알 → Baby → In-Training → Rookie → Champion → Ultimate → Mega)로 진화합니다.

- **토큰 사용량**이 진화 기준이 됩니다
- **도구 호출** 성공/실패에 따라 HP와 EXP가 변동됩니다
- **다양한 도구 사용**은 보너스 EXP를 줍니다
- **연속 성공 스트릭**이 디지몬의 체력을 올려줍니다
- **5% 확률**로 레어 변종(★)이 등장합니다

### 디지몬 라인

| 라인 | 아이콘 | 진화 경로 |
|------|--------|-----------|
| Agumon | 🔥 | Botamon → Koromon → Agumon → Greymon → MetalGreymon → WarGreymon |
| Tentomon | ⚡ | Pabumon → Motimon → Tentomon → Kabuterimon → MegaKabuterimon → HerculesKabuterimon |
| Patamon | ✨ | Poyomon → Tokomon → Patamon → Angemon → MagnaAngemon → Seraphimon |
| Palmon | 🌿 | Yuramon → Tanemon → Palmon → Togemon → Lillymon → Rosemon |
| Gomamon | 🌊 | Pichimon → Bukamon → Gomamon → Ikkakumon → Zudomon → Vikemon |
| Hagurumon | ⚙ | Choromon → Kapurimon → Hagurumon → Guardromon → Andromon → HiAndromon |

## 빠른 시작

### 사전 요구사항

- Node.js >= 20
- Claude Code CLI

### 설치

```bash
git clone https://github.com/your-username/claude-digi-buddy.git
cd claude-digi-buddy
npm install        # 자동으로 빌드됩니다
npm run setup      # Claude Code 연동을 자동 설정합니다
```

끝입니다! 새 Claude Code 세션을 시작하면 디지몬이 나타납니다.

### 제거

```bash
npm run uninstall                # settings.json에서 설정을 제거합니다
npm run uninstall -- --purge     # 펫 데이터도 함께 삭제합니다
```

## 수동 설정

자동 설정 대신 직접 구성하려면 `~/.claude/settings.json`에 다음을 추가하세요:

```json
{
  "statusLine": {
    "type": "command",
    "command": "node /absolute/path/to/claude-digi-buddy/dist/index.js"
  },
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "node /absolute/path/to/claude-digi-buddy/dist/hooks/session-start.js"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": ".*",
        "hooks": [
          {
            "type": "command",
            "command": "node /absolute/path/to/claude-digi-buddy/dist/hooks/post-tool-use.js"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "node /absolute/path/to/claude-digi-buddy/dist/hooks/session-end.js"
          }
        ]
      }
    ]
  }
}
```

`/absolute/path/to/claude-digi-buddy`를 실제 프로젝트 경로로 바꿔주세요.

## 작동 원리

### Status Line

메인 스크립트(`dist/index.js`)는 Claude Code가 stdin으로 전달하는 세션 메트릭(토큰, 비용, 소요 시간)을 읽고, 디지몬의 ASCII 아트, HP 바, 허기, EXP 진행률을 렌더링합니다.

### Hooks

- **SessionStart**: 새 디지몬 알을 배정합니다 (최근에 보지 못한 라인이 가중치를 받습니다)
- **PostToolUse**: 각 도구 호출을 추적합니다 — 성공은 HP 상승, 실패는 HP 하락, 스트릭과 다양성 보너스가 있습니다
- **Stop (세션 종료)**: 세션 히스토리를 저장하고 요약 카드를 출력합니다

### 진화 조건

다음 기준 중 **하나라도** 충족하면 진화합니다:

| 단계 | 토큰 | 비용 (USD) | 도구 호출 수 |
|------|------|-----------|-------------|
| Baby | 5,000 | $0.01 | 3 |
| In-Training | 25,000 | $0.05 | 15 |
| Rookie | 100,000 | $0.20 | 50 |
| Champion | 500,000 | $1.00 | 150 |
| Ultimate | 2,000,000 | $5.00 | 500 |
| Mega | 10,000,000 | $20.00 | 2,000 |

### 데이터 저장 위치

모든 펫 데이터는 `~/.claude/digi-buddy/`에 저장됩니다:
- `current-session.json` — 현재 세션 상태
- `history.json` — 모든 과거 세션 기록

## 대시보드 연동

[claude-dashboard](https://github.com/uppinote20/claude-dashboard) 플러그인과 함께 사용하려면 환경 변수를 설정하세요:

```bash
export DIGI_BUDDY_DASHBOARD_CMD="node /path/to/claude-dashboard/dist/index.js"
```

설정하면 대시보드 출력이 디지몬 위에 함께 표시됩니다.

## 라이센스

MIT
