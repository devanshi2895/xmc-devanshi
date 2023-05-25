import { SendEmail } from 'lib/mail-smtp';
import type { NextApiRequest, NextApiResponse } from 'next';

const webHookReqRes = async (
  _req: NextApiRequest,
  _res: NextApiResponse
): Promise<NextApiResponse | void> => {
  console.log('devanshi');
  console.log('Workflow Web hook response = ' + JSON.stringify(_req.body));
  const jsonData = JSON.parse(JSON.stringify(_req.body));
  // console.log(jsonData);
  console.log(jsonData?.DataItem?.Name);

  const comment = jsonData?.Comments[0]?.Value;
  const eventItemName = jsonData?.DataItem?.Name;
  _res.status(200).send('');

  await SendEmail({
    to: 'dkakade@horizontal.com',
    subject: eventItemName + 'Event item was created',
    html:
      '<p><b>Comments to review : </b>&nbsp; ' +
      comment +
      '</p><p>Go and check out the new event item <b>' +
      eventItemName +
      '</b> </p>',
  });
};
export default webHookReqRes;
