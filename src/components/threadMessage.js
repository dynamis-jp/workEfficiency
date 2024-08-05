import fs from 'fs/promises';
import path from 'path';
import { join } from 'path';

export async function processThreadMessage(client, { channelId, threadTs }, __dirname) {
  try {
    // スレッドの返信を取得
    const threadResult = await client.conversations.replies({
      channel: channelId,
      ts: threadTs
    });

    if (threadResult.messages && threadResult.messages.length > 0) {
      const mainMessage = threadResult.messages[0];
      const threadMessages = threadResult.messages.slice(1); // メインメッセージ以降がスレッドの返信

      console.log('メインメッセージ:', mainMessage);
      console.log('スレッドメッセージ:', threadMessages);

      const htmlContent = `<pre>${generateHtmlContent(mainMessage, threadMessages)}</pre>`;

      // ファイル名を生成
      const date = new Date();
      const shortDate = date.toISOString().split('T')[0].replace(/-/g, '');
      const shortUserId = mainMessage.user.substring(0, 8);
      const fileName = `t_${shortDate}_${shortUserId}.html`;

      const filePath = join(__dirname, 'threads', fileName);
      // HTMLファイルを保存
      await fs.writeFile(filePath, htmlContent);

      console.log(`スレッドが ${fileName} に保存されました`);
    } else {
      console.log('スレッドメッセージが見つかりません');
    }
  } catch (error) {
    console.error('スレッドメッセージの取得中にエラーが発生しました:', error);
  }
}

function generateHtmlContent(mainMessage, threadMessages) {
  let content = '';

  // メインメッセージを追加
  content += `メインメッセージ：${new Date(parseFloat(mainMessage.ts) * 1000).toLocaleString()}\n`;
  content += `ーーー\n`;
  content += `${mainMessage.text}\n`;
  content += `ーーー\n\n`;
  content += `<br>\n`;

  // スレッドメッセージを追加
  threadMessages.forEach((reply, index) => {
    content += `スレッド${index + 1}：${new Date(parseFloat(reply.ts) * 1000).toLocaleString()}\n`;
    content += `ーーー\n`;
    content += `${reply.text}\n`;
    content += `ーーー\n\n`;
  });

  return content;
}
