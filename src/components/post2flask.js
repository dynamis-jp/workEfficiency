import { getChannels } from './setting.js';
import { generalChannelId, getGeneralMessageTs, reportEmitter } from './generalReport.js';
import { getFormattedDate } from './utils.js';
import request from 'request';

export async function handlePost2flask(client, { user, view }) {
  try {
    console.log('Received view:', JSON.stringify(view, null, 2));

    const values = view.state.values;
    const report = values.report_block.report_input.value;
    const userId = user.id;
    const userChannels = await getChannels(userId);
    const userInfo = await client.users.info({ user: userId });
    const userName = userInfo.user.profile.display_name || userInfo.user.name;   
    console.log("val", values)
    console.log("report", report)
    console.log("userName", userName)


    //オプションを定義
    var options = {
    url: 'http://127.0.0.1:5000/post',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    json: true,
    body: {
        "userName":userName,
        "val":report
    }
    }

    //リクエスト送信
    request(options, (error, response, body) => {
        if (error) {
            console.error('Error:', error);
        } else {
            console.log('Response:', body);
        }
    });


  } catch (error) {
    console.error('Error in post2flask:', error);
    if (error.data) {
      console.error('Error details:', JSON.stringify(error.data, null, 2));
    }
  }
}
