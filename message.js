/*
    상담도우미 메시지 관리 파일
    --------------------------------
    index.html은 화면 구조만 담당합니다.
    이 파일(message.js)이 날씨, 일정, 공지, 상담 알림 중
    어떤 메시지를 보여줄지 결정합니다.

    수정 위치:
    1) MESSAGE_RULES 안의 text를 바꾸면 표시 문구가 바뀝니다.
    2) priority 숫자가 작을수록 먼저 표시됩니다.
    3) 나중에 Google Calendar, Google Sheets, 날씨 API를 연결할 때도
       이 파일의 getTodayMessage() 함수만 확장하면 됩니다.
*/

const MESSAGE_RULES = [
    {
        type: 'schedule',
        priority: 1,
        icon: '📅',
        text: '오늘 상담 일정과 날씨정보를 이 영역에 표시합니다.',
        enabled: true
    },
    {
        type: 'notice',
        priority: 2,
        icon: '💬',
        text: '상담도우미 알림 메시지입니다.',
        enabled: true
    }
];

function getTodayMessage() {
    const activeMessages = MESSAGE_RULES
        .filter((item) => item.enabled)
        .sort((a, b) => a.priority - b.priority);

    return activeMessages[0] || {
        icon: '💬',
        text: '표시할 메시지가 없습니다.'
    };
}

function renderMessage(targetId) {
    const target = document.getElementById(targetId);

    if (!target) {
        return;
    }

    const message = getTodayMessage();

    target.innerHTML = `
        <div class="messageIcon">${message.icon}</div>
        <div class="messageText">${message.text}</div>
    `;
}
