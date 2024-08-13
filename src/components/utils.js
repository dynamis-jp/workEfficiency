import { DateTime } from "luxon";

export function getFormattedDate() {
  const now = DateTime.now().setZone('Asia/Tokyo');
  const days = ['月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日', '日曜日'];
  const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

  const day = days[now.weekday - 1];
  const date = now.day;
  const month = months[now.month - 1];

  return `${month} ${date}日 ${day}`;
}

export async function getMessagesForUser(client, userId, channelId) {
  try {
    const today = new Date();
    const timezoneOffset = today.getTimezoneOffset() * 60; // タイムゾーンオフセットを考慮
    const startOfDay = Math.floor(today.setHours(0, 0, 0, 0) / 1000) - timezoneOffset;

    const result = await client.conversations.history({
      channel: channelId,
      oldest: startOfDay,
    });

    const allMessages = result.messages;
    const userMessages = allMessages.filter(msg => msg.user === userId);

    const userThreadMessages = [];

    for (const msg of userMessages) {
      if (msg.thread_ts) {
        const threadResult = await client.conversations.replies({
          channel: channelId,
          ts: msg.thread_ts,
        });

        const threadMessages = threadResult.messages.filter(tmsg => tmsg.user === userId);
        userThreadMessages.push(...threadMessages);
        // console.log(`User's thread messages: ${JSON.stringify(threadMessages, null, 2)}`); // JSON.stringifyを使って詳細表示
      }
    }

    // console.log(`User's messages: ${JSON.stringify(userMessages, null, 2)}`); // JSON.stringifyを使って詳細表示

    // メッセージとスレッドメッセージを返す
    return {
      userMessages,
      userThreadMessages
    };

  } catch (error) {
    console.error('Error fetching user messages:', error);
  }
}
