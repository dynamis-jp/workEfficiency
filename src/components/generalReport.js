import schedule from 'node-schedule';
import { getFormattedDate } from './utils.js';
import { EventEmitter } from 'events';
import dotenv from 'dotenv';

dotenv.config();

const generalChannelId = process.env.REPORT_CHANNEL_ID?.trim().replace(/^['"]|['"]$/g, '');
let generalMessageTs;

const reportEmitter = new EventEmitter();

function scheduleReport(app) {
  const rule = new schedule.RecurrenceRule();
  rule.tz = process.env.TIME_ZONE;
  rule.hour = process.env.REPORT_HOUR;
  rule.minute = process.env.REPORT_MINUTE;

  schedule.scheduleJob(rule, async function() {
    const formattedDate = getFormattedDate();
    const messageText = `おはようございます🌞\n${formattedDate}の全体報告スレッドです📝\n今日も一日よろしくお願いします✨`;

    try {
      const result = await app.client.chat.postMessage({
        channel: generalChannelId,
        text: messageText
      });
      generalMessageTs = result.ts;
      console.log('全体報告を開始しました✨:', result.ts);
      reportEmitter.emit('reportScheduled', generalMessageTs);
    } catch (error) {
      console.error('Error message:', error);
    }
  });
};

function getGeneralMessageTs() {
  return generalMessageTs;
}

export default scheduleReport;
export { generalChannelId, getGeneralMessageTs, reportEmitter };
